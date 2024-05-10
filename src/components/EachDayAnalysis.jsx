import React, { useEffect, useState } from 'react'
import Bar from '../charts/Bar';

export default function EachDayAnalysis({ exerciseName, data }) {
    const [allWeights, setAllWeights] = useState([]);
    const [allReps, setAllReps] = useState([]);
    useEffect(() => {
        
        let weights = []
        let reps = []
        data.map(each => {
            weights.push(each.weight)
            reps.push(each.reps)
        })
        setAllWeights(weights);
        setAllReps(reps);
        
        
    }, [data])
    return (
        <div className='mt-10 flex flex-col justify-center items-center'>
            <p className='px-10 text-center text-lg'>Your Progress for <span className='font-semibold'>
                {exerciseName}
            </span>  on selectedDate</p>
            <div className='my-5'>

                {(allWeights && allReps) && <Bar allWeights={allWeights} allReps={allReps} />}

            </div>
        </div>
    )
}
