import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { selectGlobal } from '../../features/global/globalSlice';

interface IContainerProps {
    startAnimation: boolean;
}

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0
    }
` 

const Container = styled.div<IContainerProps>`
    z-index: 999999999999;
    position: absolute;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    background: #000;
    opacity: 1;

    ${({startAnimation}) => startAnimation && css`
            animation: ${fadeOut} 5s ease-in-out;
        `
    }
`

const BlackScreen = () => {
    const globalSelector = useSelector(selectGlobal);

    if (globalSelector.blackScreen !== 'hidden') {
        return (
            <Container startAnimation={globalSelector.blackScreen === 'fadeOut' ? true : false} />
        );
    } else {
        return null;
    }
};

export default BlackScreen;