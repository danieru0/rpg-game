import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectMonster } from '../../features/monster/monsterSlice';

import EntityIcon from '../atoms/EntityIcon';
import HpBar from '../atoms/HpBar';

const Container = styled.div`
    width: 100%;
    height: 135px;
    background-color: ${({theme}) => theme.secondary};
    border-bottom: 5px solid ${({theme}) => theme.border};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    user-select: none;
`

const Level = styled.p`
    color: ${({theme}) => theme.fontColor};
    font-family: ${({theme}) => theme.roboto};
    margin-top: 2px;
`

const EnemyInfo = () => {
    const monsterSelector = useSelector(selectMonster);

    return (
        <>
            {
                monsterSelector.monstersCloseToPlayer.map((item, key) => {
                    const monster = monsterSelector.monsters[item];
                    const monsterImg = document.querySelector(monster.entityImage) as HTMLImageElement
                    
                    return (
                        <Container key={key}>
                            <EntityIcon autoWidth={true} img={monsterImg.src} />
                            <Level>lvl: {monster.lvl}</Level>
                            <HpBar hp={monster.hp} maxHP={monster.maxHP} />
                        </Container>
                    )
                })
            }
        </>
    );
};

export default EnemyInfo;