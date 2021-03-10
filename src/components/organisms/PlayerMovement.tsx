import { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPlayer, setPlayerPosition } from '../../features/player/playerSlice';
import { selectMap } from '../../features/map/mapSlice';
import { selectMonster } from '../../features/monster/monsterSlice';
import { selectCanvas, setViewportPositionX, setViewportPositionY } from '../../features/canvas/canvasSlice';
import { selectTriggers, triggerActions } from '../../features/triggers/triggersSlice';

const PlayerMovement = () => {
    const dispatch = useDispatch();
    const playerSelector = useSelector(selectPlayer);
    const mapSelector = useSelector(selectMap);
    const canvasSelector = useSelector(selectCanvas);
    const monsterSelector = useSelector(selectMonster);
    const triggersSelector = useSelector(selectTriggers);
    const [keyDown, setKeyDown] = useState(false);

    const handleUserKeyDown = useCallback((event) => {
        if (!keyDown && event.srcElement.nodeName !== 'INPUT' && playerSelector.canMove && mapSelector.canMove) {       
            const { key } = event;

            let nextPlayerX, nextPlayerY, nextPlayerIndex, direction;
    
            setKeyDown(true);
    
            switch(key) {
                case "w":
                    nextPlayerX = playerSelector.x / canvasSelector.tileSize;
                    nextPlayerY = (playerSelector.y - canvasSelector.tileSize) / canvasSelector.tileSize;
                    direction = "up";
                    break;
                case "a":
                    nextPlayerX = (playerSelector.x - canvasSelector.tileSize) / canvasSelector.tileSize;
                    nextPlayerY = playerSelector.y / canvasSelector.tileSize;
                    direction = "left";
                    break;
                case "s":
                    nextPlayerX = playerSelector.x / canvasSelector.tileSize;
                    nextPlayerY = (playerSelector.y + canvasSelector.tileSize) / canvasSelector.tileSize;
                    direction = "down";
                    break;
                case "d":
                    nextPlayerX = (playerSelector.x + canvasSelector.tileSize) / canvasSelector.tileSize;
                    nextPlayerY = playerSelector.y / canvasSelector.tileSize;
                    direction = "right";
                    break;
                default: return null;
            }
        
            nextPlayerIndex = nextPlayerY * mapSelector.rows + nextPlayerX;

            if ((mapSelector.layers.blockTiles.tiles[nextPlayerY][nextPlayerX] === 115 || mapSelector.layers.blockTiles.tiles[nextPlayerY][nextPlayerX] === 58) && !monsterSelector.blockedIndexesMonsters.includes(nextPlayerIndex) && !mapSelector.blockedIndexesMap.includes(nextPlayerIndex)) {
                if (direction === "right") {
                    if (nextPlayerX * canvasSelector.tileSize >= 384 && nextPlayerX * canvasSelector.tileSize <= canvasSelector.width - 384) {
                        dispatch(setViewportPositionX(canvasSelector.viewport.x + canvasSelector.tileSize));
                    }
                } else if (direction === "left") {
                    if (nextPlayerX * canvasSelector.tileSize >= 336 && nextPlayerX * canvasSelector.tileSize <= canvasSelector.width - 432) {
                        dispatch(setViewportPositionX(canvasSelector.viewport.x - canvasSelector.tileSize));
                    }
                } else if (direction === "down") {
                    if (nextPlayerY * canvasSelector.tileSize >= 384 && nextPlayerY * canvasSelector.tileSize <= canvasSelector.height - 384) {
                        dispatch(setViewportPositionY(canvasSelector.viewport.y + canvasSelector.tileSize));
                    }
                } else if (direction === "up") {
                    if (nextPlayerY * canvasSelector.tileSize >= 336 && nextPlayerY * canvasSelector.tileSize <= canvasSelector.height - 432) {
                        dispatch(setViewportPositionY(canvasSelector.viewport.y - canvasSelector.tileSize));
                    }
                }
    
                console.log(nextPlayerX * 48, nextPlayerY * 48, nextPlayerIndex);

                dispatch(setPlayerPosition({
                    x: nextPlayerX * canvasSelector.tileSize,
                    y: nextPlayerY * canvasSelector.tileSize,
                    currentIndex: nextPlayerIndex,
                    direction: direction
                }));

                if (triggersSelector.triggers && triggersSelector.triggers[nextPlayerIndex] && triggersSelector.triggers[nextPlayerIndex].map === mapSelector.name) {
                    dispatch(triggerActions(nextPlayerIndex));
                }
            }
        }
    }, [dispatch, mapSelector.rows, playerSelector.x, playerSelector.y, canvasSelector.tileSize, canvasSelector.viewport.x, canvasSelector.viewport.y, monsterSelector.blockedIndexesMonsters, mapSelector.layers.blockTiles, keyDown, mapSelector.blockedIndexesMap, mapSelector.name, triggersSelector.triggers, canvasSelector.height, canvasSelector.width, playerSelector.canMove, mapSelector.canMove]);

    const handleUserKeyUp = useCallback(() => {
        setKeyDown(false);
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleUserKeyDown);
        document.addEventListener('keyup', handleUserKeyUp);

        return () => {
            document.removeEventListener('keydown', handleUserKeyDown);
            document.removeEventListener('keyup', handleUserKeyUp);
        }
    }, [handleUserKeyDown, handleUserKeyUp]);

    return null;
};

export default PlayerMovement;