import patientList from '../data/patients'
import { Patient, NonSsnPatient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): Array<Patient> => {
    return patientList;
};

const getNonSsnEntries = (): NonSsnPatient[] => {
    return patientList.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = ( entry: NewPatientEntry ) : Patient => {
    const newId = uuid()
    const newPatient = {
        id: newId,
        ...entry
    };
    patientList.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    addPatient,
    getNonSsnEntries
};