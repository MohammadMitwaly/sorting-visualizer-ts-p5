
// Help from: https://stackoverflow.com/questions/5836833/create-an-array-with-random-values
export const generateRandomArray = (len: number, lowerBound = 5, upperbound = 1000) => {
    return Array.from({length: len}, () => Math.floor(Math.random() * (upperbound - lowerBound) + lowerBound));
}