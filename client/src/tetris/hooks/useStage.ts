import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { createStage, Stage } from '../stage';

function useStage(updateStage: (prev: Stage) => Stage): [Stage, Dispatch<SetStateAction<Stage>>] {
    const [stage, setStage] = useState<Stage>(createStage());

    useEffect(() => {
        setStage((prevStage: Stage) => updateStage(prevStage));
    }, [updateStage]);

    return [stage, setStage];
};

export default useStage;