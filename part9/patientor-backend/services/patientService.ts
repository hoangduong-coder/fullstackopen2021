import patientList from '../data/patients';
import { Patient, NonSsnPatient, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): Array<Patient> => {
    return patientList;
};

const getNonSsnEntries = (): NonSsnPatient[] => {
    return patientList.map(({id, name, dateOfBirth, entries, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        entries,
        occupation,
    }));
};

const findById = (id: string): Patient | undefined => {
    const patientData = patientList.find(obj => obj.id === id);
    return patientData;
};

const addPatient = ( entry: NewPatientEntry ) : Patient => {
    const newId = uuid();
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
    getNonSsnEntries,
    findById
};