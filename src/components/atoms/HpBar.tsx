import React from 'react';
import styled from 'styled-components';

interface IHpBarProps {
    hp: number;
    maxHP: number;
}

interface IHealthProps {
    width: number;
}

const Container = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`

const Health = styled.div<IHealthProps>`
    width: ${({width}) => width}%;
    height: 16px;
    background-color: red;
`

const HealthInfo = styled.p`
    color: ${({theme}) => theme.fontColor};
    font-family: ${({theme}) => theme.roboto};
`

const HpBar = ({hp, maxHP}: IHpBarProps) => {
    return (
        <Container>
            <Health width={(100 * hp) / maxHP} />
            <HealthInfo>{`${hp}/${maxHP}`}</HealthInfo>
        </Container>
    );
};

export default HpBar;