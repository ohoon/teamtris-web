import { useRef, useEffect } from 'react';

function useInterval(callback: () => void, delay: number | null) {
    const callbackRef = useRef<() => void>(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (delay) {
            const id = setInterval(() => callbackRef.current(), delay);
            
            return () => {
                clearInterval(id);
            };
        }
    }, [delay]);
}

export default useInterval;