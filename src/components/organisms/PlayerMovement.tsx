import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPlayer, setPlayerPosition } from '../../features/player/playerSlice';
import { selectMap } from '../../features/map/mapSlice';
import { selectCanvas, setViewportPositionX, setViewportPositionY } from '../../features/canvas/canvasSlice';

const PlayerMovement = () => {
    const dispatch = useDispatch();
    const playerSelector = useSelector(selectPlayer);
    const mapSelector = useSelector(selectMap);
    const canvasSelector = useSelector(selectCanvas);

    const handleUserKeyDown = useCallback((event) => {
        const { key } = event;
        let nextPlayerX, nextPlayerY, nextPlayerIndex, direction;

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

        if (mapSelector.layers.floor[nextPlayerIndex] === 115) {
            if (direction === "right") {
                if (nextPlayerX * canvasSelector.tileSize >= 384) {
                    dispatch(setViewportPositionX(canvasSelector.viewport.x + 48));
                }
            } else if (direction === "left") {
                if (nextPlayerX * canvasSelector.tileSize >= 336) {
                    dispatch(setViewportPositionX(canvasSelector.viewport.x - 48));
                }
            } else if (direction === "down") {
                if (nextPlayerY * canvasSelector.tileSize >= 384) {
                    dispatch(setViewportPositionY(canvasSelector.viewport.y + 48));
                }
            } else if (direction === "up") {
                if (nextPlayerY * canvasSelector.tileSize >= 336) {
                    dispatch(setViewportPositionY(canvasSelector.viewport.y - 48));
                }
            }

            dispatch(setPlayerPosition({
                x: nextPlayerX * canvasSelector.tileSize,
                y: nextPlayerY * canvasSelector.tileSize
            }));
        }
    }, [dispatch, mapSelector.rows, playerSelector.x, playerSelector.y, mapSelector.layers.floor, canvasSelector.tileSize, canvasSelector.viewport.x, canvasSelector.viewport.y]);

    useEffect(() => {
        document.addEventListener('keydown', handleUserKeyDown);

        return () => document.removeEventListener('keydown', handleUserKeyDown);
    }, [handleUserKeyDown]);

    return null;
};

export default PlayerMovement;