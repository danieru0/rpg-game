import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPlayer, giveItems, setCanMove } from '../../features/player/playerSlice';
import { selectMonster, hitMonster, destroyMonster, clearMonstersCloseToPlayer } from '../../features/monster/monsterSlice';
import { selectMap, openChest } from '../../features/map/mapSlice';
import { showModal } from '../../features/modal/modalSlice';
import usePrevious from '../../hooks/usePrevious';

interface IAttackedMonsters {
    id: number;
    index: number;
}

const UserClickHandler = () => {
    const dispatch = useDispatch();
    const playerSelector = useSelector(selectPlayer);
    const monsterSelector = useSelector(selectMonster);
    const mapSelector = useSelector(selectMap);
    const [attackedMonsters, setAttackedMonsters] = useState<IAttackedMonsters[]>([]);
    const prevRefresh = usePrevious(playerSelector.clickedIndex.refresh);

    useEffect(() => {
        new Promise((resolve, reject) => {
            if (Object.keys(monsterSelector.monsters).length !== 0) {
                Object.keys(monsterSelector.monsters).forEach((key, index) => {
                    const monster = monsterSelector.monsters[parseInt(key)];
        
                    if (monster.currentIndex === playerSelector.clickedIndex.index) {
                        if (monster.closeToPlayer) {
                            if (!attackedMonsters.find(item => item.id === monster.id)) {
                                setAttackedMonsters([...attackedMonsters, {id: monster.id, index: monster.currentIndex}]);
                            }
                        }
                    }
    
                    if (index === Object.keys(monsterSelector.monsters).length - 1) {
                        resolve(true);
                    }
                });
            } else {
                resolve(true);
            }
        }).then(() => {
            if (attackedMonsters.length === 0) {
                if (mapSelector.chestsAreaDetection[playerSelector.currentIndex]) {
                    if (playerSelector.clickedIndex.index === mapSelector.chestsAreaDetection[playerSelector.currentIndex].chestIndex) {
                        if (mapSelector.chests[mapSelector.chestsAreaDetection[playerSelector.currentIndex].id].open === false) {
                            dispatch(openChest(mapSelector.chestsAreaDetection[playerSelector.currentIndex].id));

                            mapSelector.chests[mapSelector.chestsAreaDetection[playerSelector.currentIndex].id].itemsId.forEach((item) => {
                                dispatch(giveItems({
                                    id: item.id,
                                    type: item.type
                                }))
                            })
                        }
                    }
                } else if (mapSelector.npcAreaDetection[playerSelector.currentIndex]) {
                    if (playerSelector.clickedIndex.index === mapSelector.npcAreaDetection[playerSelector.currentIndex].npcIndex) {
                        dispatch(showModal({
                            type: 'modal-shop',
                            value: ['0']
                        }))
                        dispatch(setCanMove(false));
                    }
                }
            }
        });
    }, [playerSelector.clickedIndex]); //eslint-disable-line

    useEffect(() => {
        setAttackedMonsters([]);
    }, [playerSelector.x, playerSelector.y]);

    const attackMonster = useCallback(() => {
        if (prevRefresh !== playerSelector.clickedIndex.refresh) {
            const monsterAtIndex = attackedMonsters.filter(monster => monster.index === playerSelector.clickedIndex.index);
    
            if (monsterAtIndex) {
                monsterAtIndex.forEach(item => {
                    if (monsterSelector.monsters[item.id]) {
                        const monster = monsterSelector.monsters[item.id];
                        const playerTotalAttack = (playerSelector.base_attack + playerSelector.weapon_attack) - monster.def;
        
                        if (monster.hp - playerTotalAttack > 0) {
                            dispatch(hitMonster({id: monster.id, value: playerTotalAttack}));
                        } else {
                            setAttackedMonsters(attackedMonsters.filter(monster => monster.index !== monster.id));
                            dispatch(clearMonstersCloseToPlayer(monster.id));
                            dispatch(destroyMonster(monster.id));
                        }
                    }
                    
                })
            }
        }
    }, [attackedMonsters, dispatch, playerSelector.clickedIndex.index, playerSelector.clickedIndex.refresh, monsterSelector.monsters, prevRefresh, playerSelector.base_attack, playerSelector.weapon_attack]);

    useEffect(() => {
        if (attackedMonsters.length !== 0) {
            attackMonster();
        }
    }, [playerSelector.clickedIndex.refresh, attackedMonsters.length, attackMonster]);

    return null;
};

export default UserClickHandler;