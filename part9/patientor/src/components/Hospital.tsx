import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import { HospitalEntry } from "../types";

const Hospital: React.FC<{data: HospitalEntry}> = ({ data }) => {
    return (
        <Segment>
            <h3>
                {data.date}
                <Icon name="hospital" fitted size="large"/>
            </h3>
            <p>
                {data.description}
            </p>
        </Segment>
    );
};

export default Hospital;