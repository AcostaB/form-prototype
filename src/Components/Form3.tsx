import React, {
  SFC
} from 'react';
import { required, maxLength } from "../Validators/Validators";
import Form from "./Form";

interface IProps extends IPerson {
  // TODO: Make a type alias for this.
  // TODO: this new value can be types. Could possibly type the whole function. 
  onFieldChange: (name: Key<IPerson>) => (newValue: any) => void,
  onValidationChange: (fields: { [name: string]: string[] }) => void,
  onSingleValidationChange: (name: Key<IPerson>) => (newErrors: string[]) => void,
  // TODO: fix this any
  errors: KeyedErrors<IPerson>
}

const Form3: SFC<IProps> = (props) => {
  return (
    <div>
      <Form {...props}>
        {({ ValidatedInput, Button }) =>
          <div>
            <ValidatedInput
              value={props.name}
              fieldName="name"
              label="Name: "
              onFieldChange={props.onFieldChange("name")}
              onValidationChange={props.onSingleValidationChange("name")}
              errors={props.errors.name}
              validators={[required, maxLength(20)]} />
            <ValidatedInput
              value={props.age}
              fieldName="age"
              label="Age: "
              onFieldChange={props.onFieldChange("age")}
              onValidationChange={props.onSingleValidationChange("age")}
              errors={props.errors.age}
              validators={[required, maxLength(20)]}
            />
            <ValidatedInput
              value={props.dateOfBirth}
              fieldName="dateOfBirth"
              label="Date of Birth: "
              onFieldChange={props.onFieldChange("dateOfBirth")}
              onValidationChange={props.onSingleValidationChange("dateOfBirth")}
              errors={props.errors.dateOfBirth}
              validators={[required, maxLength(20)]}
            />
            <ValidatedInput
              value={props.gender}
              fieldName="gender"
              label="Gender: "
              onFieldChange={props.onFieldChange("gender")}
              onValidationChange={props.onSingleValidationChange("gender")}
              errors={props.errors.gender}
              validators={[required, maxLength(20)]}
            />
            <Button />

          </div>
        }
      </Form>
    </div>
  );
}

export default Form3;