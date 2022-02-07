import patientData from '../data/patients.json'
import { Patient, NonSsnPatient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getEntries = () => {
    return patients;
};

const getNonSsnEntries = (): NonSsnPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
}

const addEntry = () => {
    return null;
}

export default {
    getEntries,
    addEntry,
    getNonSsnEntries
}