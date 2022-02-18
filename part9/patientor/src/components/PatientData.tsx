/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from "react";
import { Patient, Entry } from "../types";
import { useParams } from "react-router-dom";
import { Button, Container, Icon, SemanticICONS } from "semantic-ui-react";
import { useStateValue, fetchPatient, addEntry } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import Hospital from "./Hospital";
import Occupational from "./Occupational";
import { assertNever } from "assert-never";
import HealthCheck from "./HealthCheck";
import { EntryFormValues } from "./AddEntryForm";
import AddEntryModal from '../AddPatientModal/AddEntryModal';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch(entry.type) {
        case "Hospital":
            return <Hospital data={entry}/>;
        case "OccupationalHealthcare":
            return <Occupational data={entry} />;
        case "HealthCheck":
            return <HealthCheck data={entry} />;
        default:
            return assertNever(entry);
    }
};

const PatientData = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patientData }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
            const { data: thisPatient } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
            );
            dispatch(fetchPatient(thisPatient));
        } catch (e) {
            console.error(e);
        }};
        void fetchPatientData();
    }, [dispatch]);

    const iconName = (arg: string) : SemanticICONS => {
        if(arg === "male") return "mars";
        else if(arg === 'female') return "venus";
        else return "venus mars";
    };

    if(!patientData) {
        return null;
    }

    const submitNewEntry = async (entry: EntryFormValues) => {
        try {
            const { data: newPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${patientData.id}/entries`,
                entry
            );
            dispatch(addEntry(newPatient));
            closeModal();
        } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
        }
    };

    return (
        <div className="App">
            <Container key={patientData.id}>
                <h2>
                    {patientData.name + " "} 
                    <Icon fitted name={iconName(patientData.gender)}/>
                </h2>
                <p>Social-security-number: {patientData.ssn}</p>
                <p>Occupation: {patientData.occupation}</p>
                {
                    patientData.entries.map(obj => 
                        <EntryDetails key={obj.id} entry={obj}/>
                    )
                }
            </Container>
            <AddEntryModal 
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>
                Add new entry
            </Button>
        </div>
    );
};

export default PatientData;