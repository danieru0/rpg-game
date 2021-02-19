import React, { useEffect, useRef, useState } from 'react';
import ReactInterval from 'react-interval';
import { useSelector, useDispatch } from 'react-redux';
import { selectPlayer, hitPlayer, setPlayerHp, setCanMove } from '../../features/player/playerSlice';
import { selectMap } from '../../features/map/mapSlice';
import { showModal } from '../../features/modal/modalSlice';
import { selectCanvas } from '../../features/canvas/canvasSlice';
import { selectMonster, setMonsterPosition, setMonsterCloseToPlayer, addMonsterCloseToPlayer, clearMonstersCloseToPlayer } from '../../features/monster/monsterSlice';
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
    const canvasSelector = useSelector(selectCanvas);
    const easystarRef = useRef<any>(null);
    const [monstersObject, setMonstersObject] = useState<monsterObject>({});

    useEffect(() => {
        easystarRef.current = new easystarjs.js();
        easystarRef.current.setGrid(mapSelector.layers.blockTiles.tiles);
        easystarRef.current.setAcceptableTiles([115]);
        easystarRef.current.enableCornerCutting();
    }, [easystarRef]); //eslint-disable-line

    const calculatePath = () => {
        easystarRef.current.cancelPath();

        Object.keys(monsterSelector.monsters).forEach((item) => {
            const monster = monsterSelector.monsters[item as unknown as number];

            if (monster) {
                const monsterSeeRange = monster.seeRange * canvasSelector.tileSize;
                if (Math.abs(playerSelector.x - monster.x) <= monsterSeeRange && Math.abs(playerSelector.y - monster.y) <= monsterSeeRange) {
                    easystarRef.current.findPath(monster.x / canvasSelector.tileSize, monster.y / canvasSelector.tileSize, playerSelector.x / canvasSelector.tileSize, playerSelector.y / canvasSelector.tileSize, (path: any) => {
                        setMonstersObject(prev => ({...prev, [item]: {
                            path: path,
                            enable: true,
                            id: monster.id,
                            counter: 0
                        }}));
                    })
    
                    easystarRef.current.calculate();
                }
            }

        })
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
                            const playerIndex = (playerSelector.y / canvasSelector.tileSize) * mapSelector.rows + (playerSelector.x / canvasSelector.tileSize);
                            if (counter < Object.keys(path).length - 1 && (monsterIndex !== playerIndex)) {
                                dispatch(setMonsterPosition({
                                    x: path[counter].x * canvasSelector.tileSize,
                                    y: path[counter].y * canvasSelector.tileSize,
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
                                            dispatch(setCanMove(false));
                                            dispatch(setPlayerHp(0));
                                            setMonstersObject({});
                                            dispatch(showModal({
                                                type: 'modal-death',
                                                value: []
                                            }))
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