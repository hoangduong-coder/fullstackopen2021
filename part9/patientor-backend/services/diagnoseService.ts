import diagnoseList from '../data/diagnoses';
import { Diagnose } from '../types';

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