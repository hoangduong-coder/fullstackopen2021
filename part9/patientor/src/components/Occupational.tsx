import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import { Diagnosis, OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";

const Occupational: React.FC<{data: OccupationalHealthcareEntry}> = ({data}) => {
    const [{ diagnosis },] = useStateValue();
    const diagnosisList = (arr: Array<Diagnosis['code']>): Diagnosis[] => {
        return diagnosis.filter(obj => arr.includes(obj.code));
    };
    return(
        <Segment>
            <h3>
                {data.date}
                <Icon name="stethoscope" fitted size="large" />
                {data.employerName}
            </h3>
            <p>
                {data.description}
            </p>    
            <ul>
                {
                    data.diagnosisCodes &&
                    diagnosisList(data.diagnosisCodes).map(diagnose =>
                        <li key={diagnose.code}>
                            <b>{diagnose.code}:</b>{" " + diagnose.name}
                        </li>
                    )
                }
            </ul>
        </Segment>
    );
};

export default Occupational;