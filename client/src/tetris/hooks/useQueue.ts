import { useState, useCallback } from 'react';

function useQueue<T>(): [T[], (item: T) => void, () => T | null, () => void] {
    const [queue, setQueue] = useState<T[]>([]);
    
    const pushQueue = useCallback((item: T) => {
        setQueue(queue => queue.concat([item]));
    }, []);

    const popQueue = useCallback((): T | null => {
        if (!queue) return null;

        const item = queue[0];
        setQueue(queue => queue.slice(1));

        return item;
    }, [queue]);

    const resetQueue = () => {
        setQueue([]);
    };

    return [queue, pushQueue, popQueue, resetQueue];
}

export default useQueue;