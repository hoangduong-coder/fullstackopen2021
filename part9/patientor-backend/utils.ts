/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Gender, NewPatientEntry, Entry, NewEntry, HealthCheckRating, SickLeave, Discharge } from "./types";
import { v1 as uuid } from 'uuid';

export const assertNever = (value: any): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown): string => {
    if(!str || !isString(str)) {
        throw new Error('Incorrect form or something missing! Received: ' + str);
    }
    return str;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error('Something wrong with this date ' + date);
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender ' + gender);
    }
    return gender;
};

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation} : Fields) : NewPatientEntry => {
    const newPatient: NewPatientEntry = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseString(ssn),
        gender: parseGender(gender),
        occupation: parseString(occupation),
        entries: [],
    };
    return newPatient;
};

const ratingAvailable = (rating: any): rating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(rating);
};
const checkRating = (rating: unknown) : HealthCheckRating => {
    if(!rating || !Number(rating) || !ratingAvailable(rating)) {
        throw new Error('Incorrect or missing rating ' + rating);
    }
    return rating;
};

const checkSickLeave = (start: string, end: string) : SickLeave => {
    if ((start && end) && (!isDate(start) || !isDate(end))) {
        throw new Error(`Something wrong with this date: Start date: ${start}, end date: ${end}`);
    }
    return {
        startDate: start,
        endDate: end
    };
};

const checkDischarge = (date: string, criteria: string): Discharge => {
    if(!date || !criteria || !isDate(date) || !parseString(criteria)) {
        throw new Error(`Something wrong with this date: Date: ${date}, Criteria ${criteria}`);
    }
    return {
        date: date,
        criteria: criteria
    };
};

const returnEntry = (object: any) : Entry => {
    const newId = uuid();
    const entry: NewEntry = {
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist)
    };
    switch (parseString(object.type)) {
        case "HealthCheck": 
            return {
                id: newId,
                ...entry,
                type: "HealthCheck",
                healthCheckRating: checkRating(object.healthCheckRating)
            };
        case "OccupationalHealthcare":
            return {
                id: newId,
                ...entry,
                type: "OccupationalHealthcare",
                employerName: parseString(object.employerName),
                sickLeave: checkSickLeave(object.startDate, object.endDate)
            };
        case "Hospital": 
            return {
                ...entry,
                id: newId,
                type: "Hospital",
                discharge: checkDischarge(object.date, object.criteria)
            };
        default:
            return assertNever(object);
    }
};

export default { toNewPatientEntry, returnEntry };