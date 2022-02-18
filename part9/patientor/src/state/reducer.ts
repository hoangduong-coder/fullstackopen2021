import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "INDIVIDUAL_PATIENT";
      payload: Patient;
    }
  | {
    type: "DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
  type: "ADD_ENTRIES";
  payload: Patient;
};

export const setPatientList = (patients: Patient[]) : Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const addPatient = (newPatient: Patient) : Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const fetchPatient = (thisPatient: Patient): Action => {
  return {
    type: "INDIVIDUAL_PATIENT",
    payload: thisPatient
  };
};

export const setDiagnosisList = (diagnosis : Diagnosis[]): Action => {
  return {
    type: "DIAGNOSIS_LIST",
    payload: diagnosis
  };
};

export const addEntry = (newPatient: Patient): Action => {
  return {
    type: "ADD_ENTRIES",
    payload: newPatient
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "INDIVIDUAL_PATIENT": 
      return {
        ...state,
        patientData: {
          ...action.payload
        }
      };
    case "DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: action.payload
      };
    case "ADD_ENTRIES":
      return {
        ...state,
        patientData: action.payload
      };
    default:
      return state;
  }
};
