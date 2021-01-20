import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPlayer } from '../../features/player/playerSlice';
import { selectMonster } from '../../features/monster/monsterSlice';


const UserClickHandler = () => {
    const dispatch = useDispatch();
    const playerSelector = useSelector(selectPlayer);
    const monsterSelector = useSelector(selectMonster);

    useEffect(() => {
        
    }, [playerSelector.clickedIndex]);

    return null;
};

export default UserClickHandler;