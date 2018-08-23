import React, {
  SFC
} from 'react';
import styled from "styled-components";
import ValidatedInput from "../UI-Toolkit/ValidatedInput";
import { required, maxLength, email } from "../Validators/Validators";

interface IProps extends IPerson {
  // TODO: Make a type alias for this.
  // TODO: this new value can be types. Could possibly type the whole function. 
  onFieldChange: (name: Key<IPerson>) => (newValue: any) => void,
  onValidationChange: (name: Key<IPerson>) => (newErrors: string[]) => void,
  // TODO: fix this any
  errors: KeyedErrors<IPerson>
}

const Form1: SFC<IProps> = (props) => {
  return (
    <Form1Container>
      <ValidatedInput
        value={props.name}
        fieldName="name"
        label="Name: "
        onFieldChange={props.onFieldChange("name")}
        onValidationChange={props.onValidationChange("name")}
        errors={props.errors.name}
        validators={[required, maxLength(20)]}
      />
      <ValidatedInput
        value={props.email}
        fieldName="email"
        label="Email: "
        onFieldChange={props.onFieldChange("email")}
        onValidationChange={props.onValidationChange("email")}
        errors={props.errors.email}
        validators={[required, maxLength(20), email]}
      />
      <ValidatedInput
        value={props.age}
        fieldName="age"
        label="Age: "
        onFieldChange={props.onFieldChange("age")}
        onValidationChange={props.onValidationChange("age")}
        errors={props.errors.age}
        validators={[required, maxLength(20)]}
      />
      <ValidatedInput
        value={props.dateOfBirth}
        fieldName="dateOfBirth"
        label="Date of Birth: "
        onFieldChange={props.onFieldChange("dateOfBirth")}
        onValidationChange={props.onValidationChange("dateOfBirth")}
        errors={props.errors.dateOfBirth}
        validators={[required, maxLength(20)]}
      />
      <ValidatedInput
        value={props.gender}
        fieldName="gender"
        label="Gender: "
        onFieldChange={props.onFieldChange("gender")}
        onValidationChange={props.onValidationChange("gender")}
        errors={props.errors.gender}
        validators={[required, maxLength(20)]}
      />
    </Form1Container>
  );
}

const Form1Container = styled.form`
    margin: 10px 10px;
    width: 400px
  `;

export default Form1;