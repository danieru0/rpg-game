import React from 'react';
import styled from 'styled-components';

interface IEntityIconProps {
    border?: boolean;
    img: string;
    autoWidth?: boolean;
}

interface IContainerProps {
    border?: boolean;
    autoWidth?: boolean;
}

const Container = styled.div<IContainerProps>`
    ${({autoWidth}) => autoWidth === undefined
        && `
            width: 80px;
            height: 80px;
        `
    }
    display: flex;
    justify-content: center;
    align-items: center;

    ${({border, theme}) => border
        && `
            border-right: 5px solid ${theme.border};
            border-bottom: 5px solid ${theme.border};
        `
    }
`

const PlayerImg = styled.img`
    width: 50px;
    height: 50px;
    image-rendering: pixelated;
`

const EntityIcon = ({border, img, autoWidth}: IEntityIconProps) => {
    return (
        <Container autoWidth={autoWidth} border={border}>
            <PlayerImg src={img} alt="" />
        </Container>
    );
};

export default EntityIcon;