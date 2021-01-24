import React, { useEffect, useRef, useState } from 'react';
import ReactInterval from 'react-interval';
import { useSelector, useDispatch } from 'react-redux';
import { selectPlayer, hitPlayer, setPlayerHp, resetPlayerPosition } from '../../features/player/playerSlice';
import { selectMap } from '../../features/map/mapSlice';
import { resetViewport } from '../../features/canvas/canvasSlice';
import { selectMonster, setMonsterPosition, setMonsterCloseToPlayer, resetMonstersInDungeon, addMonsterCloseToPlayer, clearMonstersCloseToPlayer } from '../../features/monster/monsterSlice';
import easystarjs from 'easystarjs';

interface monsterObject {
    [key: number]: {
        enable: boolean;
        id: number;
        counter: number;
        path: {
            [key: number]: {
                x: number;
                y: number;
            }
    }
    }
}

const MonsterPlayerDetection = () => {
    const dispatch = useDispatch();
    const playerSelector = useSelector(selectPlayer);
    const mapSelector = useSelector(selectMap);
    const monsterSelector = useSelector(selectMonster);
    const easystarRef = useRef<any>(null);
    const [monstersObject, setMonstersObject] = useState<monsterObject>({});

    useEffect(() => {
        easystarRef.current = new easystarjs.js();
        easystarRef.current.setGrid(mapSelector.layers.blockTiles);
        easystarRef.current.setAcceptableTiles([115]);
        easystarRef.current.enableCornerCutting();
    }, [easystarRef]); //eslint-disable-line

    const calculatePath = () => {
        if (monsterSelector.monstersAreaDetection.x[playerSelector.x] || monsterSelector.monstersAreaDetection.y[playerSelector.y]) {
            const areaFound = monsterSelector.monstersAreaDetection.x[playerSelector.x] ? monsterSelector.monstersAreaDetection.x[playerSelector.x] : monsterSelector.monstersAreaDetection.y[playerSelector.y];
            easystarRef.current.cancelPath();
            if (areaFound.ids.length !== 0) {
                areaFound.ids.forEach((item) => {
                    easystarRef.current.findPath(monsterSelector.monsters[item].x / 48, monsterSelector.monsters[item].y / 48, playerSelector.x / 48, playerSelector.y / 48, (path: any) => {
                        setMonstersObject(prev => ({...prev, [item]: {
                            path: path,
                            enable: true,
                            id: item,
                            counter: 0
                        }}))
                    })
    
                    easystarRef.current.calculate();
                });
            }
        }
    }

    useEffect(() => {
        setMonstersObject({});
        calculatePath();
        dispatch(setMonsterCloseToPlayer({value: false}));
        dispatch(clearMonstersCloseToPlayer(null));
    }, [playerSelector.x, playerSelector.y]); //eslint-disable-line

    return (
        <>
            {
                Object.entries(monstersObject).map(([key, value]) => {
                    return (
                        <ReactInterval 
                        enabled={value.enable}
                        timeout={500}
                        key={key}
                        callback={() => {
                            const { id, path, counter } = value;
                            const monsterIndex = path[counter].y * mapSelector.rows + path[counter].x;
                            const playerIndex = (playerSelector.y / 48) * mapSelector.rows + (playerSelector.x / 48);
                            if (counter < Object.keys(path).length - 1 && (monsterIndex !== playerIndex)) {
                                dispatch(setMonsterPosition({
                                    x: path[counter].x * 48,
                                    y: path[counter].y * 48,
                                    id: id,
                                    index: monsterIndex
                                }));
                                
                                setMonstersObject({
                                    ...monstersObject,
                                    [id as number]: {
                                        ...monstersObject[id],
                                        counter: monstersObject[id].counter + 1
                                    } 
                                })
                            } else {
                                setTimeout(() => {
                                    setMonstersObject({
                                        ...monstersObject,
                                        [id as number]: {
                                            ...monstersObject[id],
                                            counter: 0,
                                            enable: false
                                        } 
                                    });
                                    
                                    dispatch(setMonsterCloseToPlayer({id: id, value: true}));
                                    dispatch(addMonsterCloseToPlayer(id));
                                }, 50);
                            }
                        }}
                    />
                    )
                })
            }
            {
                Object.entries(monstersObject).map(([key, value]) => {
                    return (
                        <ReactInterval 
                            enabled={value.enable === false ? true : false}
                            timeout={1000}
                            key={key}
                            callback={() => {
                                const { id } = value;
                                const monster = monsterSelector.monsters[id];

                                if (monster) {
                                    const playerHpAfterHit =  monster.attack - playerSelector.def > 0 ? playerSelector.hp - (monster.attack - playerSelector.def) : false;
    
                                    if (playerHpAfterHit > 0) {
                                        dispatch(hitPlayer(monster.attack - playerSelector.def));
                                    } else {
                                        setTimeout(() => {
                                            setMonstersObject({});
                                            dispatch(resetMonstersInDungeon(mapSelector.name));
                                            dispatch(setPlayerHp(null));
                                            dispatch(resetPlayerPosition());
                                            dispatch(resetViewport());
                                        }, 50);
                                    }
                                }

                            }}
                        />
                    )
                })
            }
        </>
    )
};

export default MonsterPlayerDetection;