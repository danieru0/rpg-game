import React from 'react';
import styled from 'styled-components';

interface IBarProps {
    value: number;
    maxValue: number;
    color: string;
    text: string;
}

interface IBarComponentProps {
    width: number;
    color: string;
}

const Container = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`

const BarComponent = styled.div<IBarComponentProps>`
    width: ${({width}) => width}%;
    height: 16px;
    background-color: ${({color}) => color};
`

const Info = styled.p`
    color: ${({theme}) => theme.fontColor};
    font-family: ${({theme}) => theme.roboto};
`

const Bar = ({value, maxValue, color, text}: IBarProps) => {
    return (
        <Container>
            <BarComponent color={color} width={(100 * value) / maxValue} />
            <Info>{`${text} ${value}/${maxValue}`}</Info>
        </Container>
    );
};

export default Bar;