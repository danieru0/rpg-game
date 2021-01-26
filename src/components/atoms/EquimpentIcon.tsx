import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectCanvas } from '../../features/canvas/canvasSlice';

interface IEquipmentIconProps {
    text?: string;
    image: string | null | undefined;
    wrapperWidth: number;
    wrapperHeight: number;
    iconWidth: number;
    onMouseEnter: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onMouseLeave: () => void;
}

interface IWrapperProps {
    width: number;
    height: number;
}

interface IIconProps {
    width: number;
}

const Container = styled.div`
    width: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ItemWrapper = styled.div<IWrapperProps>`
    width: ${({width}) => width}px;
    height: ${({height}) => height}px;
    border: 5px solid ${({theme}) => theme.border};
    background-color: ${({theme}) => theme.primaryDark};
    display: flex;
    justify-content: center;
    align-items: center;
`

const ItemText = styled.p`
    color: ${({theme}) => theme.fontColor};
    font-family: ${({theme}) => theme.roboto};
    font-size: 14px
`

const ItemIcon = styled.img<IIconProps>`
    width: ${({width}) => width}px;
    image-rendering: pixelated;
    user-select: none;
    user-drag: none;
`

const EquimpentIcon = ({text, image, wrapperHeight, wrapperWidth, iconWidth, onMouseEnter, onMouseLeave}: IEquipmentIconProps) => {
    const canvasSelector = useSelector(selectCanvas);
    const iconRef = useRef<HTMLImageElement | null>();
    const [refresh, setRefresh] = useState(0); //eslint-disable-line

    useEffect(() => {
        if (canvasSelector.imagesLoaded === canvasSelector.allImagesToLoad) {
            if (image) {
                iconRef.current = document.querySelector(image) as HTMLImageElement;
                setRefresh(Math.random());
            }
        }
    }, [canvasSelector.imagesLoaded, canvasSelector.allImagesToLoad, image]);


    return (
        <Container>
            <ItemWrapper width={wrapperWidth} height={wrapperHeight}>
                {
                    iconRef && iconRef.current && (
                        <ItemIcon onMouseLeave={onMouseLeave} onMouseEnter={(e) => onMouseEnter(e)} width={iconWidth} src={iconRef.current.src} />
                    )
                }
            </ItemWrapper>
            {
                text && <ItemText>{text}</ItemText>
            }
        </Container>
    );
};

export default EquimpentIcon;