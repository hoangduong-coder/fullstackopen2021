import diagnoseData from '../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoseList: Array<Diagnose> = diagnoseData;

const getEntries = (): Array<Diagnose> => {
    return diagnoseList;
}

const addEntry = () => {
    return null;
}

export default {
    getEntries,
    addEntry
};