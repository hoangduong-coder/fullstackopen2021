import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { HealthCheckEntry } from "../types";
import { DiagnosisSelection, NumberField, TextField } from "../AddPatientModal/FormField";

export type EntryFormValues = Omit<HealthCheckEntry, "id">;

interface EntryProps {
    onSubmit: (entry: EntryFormValues) => void;
    onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: EntryProps) => {
    const [{ diagnosis }] = useStateValue();
    return (
        <Formik
            initialValues={{
                description: "",
                date: "",
                specialist: "",
                type: "HealthCheck",
                healthCheckRating: 0
            }}
            onSubmit={onSubmit}
            validate={entry => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!entry.description) {
                    errors.name = requiredError;
                }
                if (!entry.date) {
                    errors.ssn = requiredError;
                }
                if (!entry.specialist) {
                    errors.dateOfBirth = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Description"
                            placeholder="Describe patient's symptoms"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="HealthCheck Rating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosis)}
                        />
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" onClick={onCancel} color="red">
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid> 
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;