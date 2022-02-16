/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from "react";
import { Patient } from "../types";
import { useParams } from "react-router-dom";
import { Container, Icon, SemanticICONS } from "semantic-ui-react";
import { useStateValue, fetchPatient } from "../state";
import axios from "axios";
import { apiBaseUrl } from "../constants";

const PatientData = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patientData }, dispatch] = useStateValue();
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
                        <div key={obj.id}>
                            <p><b>{obj.date}:</b>{" " + obj.description}</p>
                            <ul>
                                {
                                    obj.diagnosisCodes?.map(code => 
                                    <li key={code}>
                                        {code}
                                    </li>)
                                }
                            </ul>
                        </div>    
                    )
                }
            </Container>
        </div>
    );
};

export default PatientData;