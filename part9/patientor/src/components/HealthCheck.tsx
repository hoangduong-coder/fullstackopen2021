import React from "react";
import { Icon, Rating, Segment } from "semantic-ui-react";
import { HealthCheckEntry } from "../types";

const HealthCheck: React.FC<{ data: HealthCheckEntry }> = ({ data }) => {
    return(
        <Segment>
            <h3>
                {data.date}
                <Icon name="user md" fitted size="large" />
            </h3>
            <p>{data.description}</p>
            <p><b>Health-check rating:</b></p>
            <Rating icon="heart" disabled rating={3 - data.healthCheckRating} maxRating={3} />
        </Segment>
    );
};

export default HealthCheck;