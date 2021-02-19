import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectMap } from '../../features/map/mapSlice';
import { selectPlayer } from '../../features/player/playerSlice';

const AudioHandler = () => {
    const mapSelector = useSelector(selectMap);
    const playerSelector = useSelector(selectPlayer);
    const [backgroundAudio, setBackgroundAudio] = useState('/audio/dungeon.ogg');
    const [stepSound, setStepSound] = useState('/audio/dungeonStep.ogg');
    const [miscSound, setMiscSound] = useState('');
    const backgroundAudioRef = useRef<HTMLAudioElement>(new Audio());
    const stepSoundRef = useRef<HTMLAudioElement>(new Audio());
    const miscSoundRef = useRef<HTMLAudioElement>(new Audio());

    const handleEndBackgroundAudio = useCallback(() => {
        backgroundAudioRef.current.currentTime = 0;
        backgroundAudioRef.current.play();
    }, []);

    useEffect(() => {
        setBackgroundAudio(mapSelector.musicTheme);
        backgroundAudioRef.current.pause();
        backgroundAudioRef.current.load();
        backgroundAudioRef.current.play();
    }, [mapSelector.musicTheme]);

    useEffect(() => {
        setStepSound(mapSelector.stepSound);
        stepSoundRef.current.load();
    }, [mapSelector.stepSound]);

    useEffect(() => {
        backgroundAudioRef.current.volume = 0.5;
        stepSoundRef.current.volume = 0.5;
        miscSoundRef.current.volume = 0.5;
    }, [backgroundAudioRef, stepSoundRef, miscSoundRef]);

    useEffect(() => {
        if (playerSelector.xStart !== playerSelector.x || playerSelector.yStart !== playerSelector.y) {
            stepSoundRef.current.pause();
            stepSoundRef.current.currentTime = 0;
            stepSoundRef.current.play();
        }
    }, [playerSelector.x, playerSelector.y, playerSelector.yStart, playerSelector.xStart]);

    useEffect(() => {
        setMiscSound('/audio/chest.mp3');
        miscSoundRef.current.pause();
        miscSoundRef.current.load();
        miscSoundRef.current.play();
    }, [mapSelector.chests]);

    useEffect(() => {
        const backgroundAudioRefCopy = backgroundAudioRef;

        backgroundAudioRefCopy.current.addEventListener('ended', handleEndBackgroundAudio);

        return () => backgroundAudioRefCopy.current.addEventListener('ended', handleEndBackgroundAudio)
    }, [handleEndBackgroundAudio]);

    return (
        <>
            <audio autoPlay ref={backgroundAudioRef} src={backgroundAudio}></audio>
            <audio ref={stepSoundRef} src={stepSound}></audio>
            <audio ref={miscSoundRef} src={miscSound}></audio>
        </>
    )
};

export default AudioHandler;