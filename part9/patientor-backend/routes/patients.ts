/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSsnEntries());
});

router.get('/:id', (req, res) => {
    const data = patientService.findById(req.params.id);
    if (data) {
        res.send(data);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);
        const newPatient = patientService.addPatient(newPatientEntry);
        res.json(newPatient);
    } catch (error: unknown) {
        let errorMessage = "Something went wrong.";
        if(error instanceof Error) {
            errorMessage += " " + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;

