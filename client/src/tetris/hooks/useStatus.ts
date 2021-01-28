import { useCallback, useEffect, useState } from 'react';

const CLEAR_POINTS = [40, 100, 300, 1200];

function useStatus(lineCleared: number): [number, number, number, () => void] {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(1);

    const calcScore = useCallback(() => {
        if (lineCleared > 0) {
            setScore(prevScore => prevScore + CLEAR_POINTS[lineCleared - 1] * level);
        }
    }, [lineCleared, level]);

    const calcRows = useCallback(() => {
        if (lineCleared > 0) {
            setRows(prevRows => prevRows + lineCleared);
        }
    }, [lineCleared]);

    const calcLevel = useCallback(() => {
        if (rows > level * 10) {
            setLevel(prevLevel => prevLevel + 1);
        }
    }, [rows, level]);

    const resetStatus = () => {
        setScore(0);
        setRows(0);
        setLevel(1);
    };

    useEffect(() => {
        calcScore();
    }, [calcScore]);

    useEffect(() => {
        calcRows();
    }, [calcRows]);

    useEffect(() => {
        calcLevel();
    }, [calcLevel]);

    return [score, rows, level, resetStatus];
}

export default useStatus;