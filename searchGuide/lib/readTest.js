import test from '../assets/test.json'
import filter from './filter';

export const readTest = () => {
    let testResult = test;
    return filter(testResult);
}