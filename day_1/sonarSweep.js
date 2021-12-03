import fs from 'fs';
import Promise from 'bluebird';

const fsAsync= Promise.promisifyAll(fs);

let sonarData = await fsAsync.readFileAsync('./data.txt', 'utf8')
.then(data => {
    data = data.split('\n').map(num => parseInt(num));
    return data;
});

const findDepthMeasurementIncreases = measurements => {
    let timesIncreased = 0;
    for(let i = 1; i < measurements.length; i++) {
        if(measurements[i] > measurements[i - 1]) timesIncreased++;
    }
    return timesIncreased;
}

const findSlidingWindowDepthMeasurementIncreases = measurements => {
    let timesIncreased = 0;
    for(let i = 3; i < measurements.length; i++) {
        const previousSum = measurements[i - 1] + measurements[i - 2] + measurements[i - 3];
        const currentSum = measurements[i] + measurements[i - 1] + measurements[i - 2];
        if(currentSum > previousSum) timesIncreased++;
    }
    return timesIncreased;
}

//const increases = findDepthMeasurementIncreases(sonarData);
//const slidingWindowIncreases = findSlidingWindowDepthMeasurementIncreases(sonarData);
