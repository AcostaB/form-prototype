import React, { ReactNode, SFC } from 'react';
import { default as VI } from "../UI-Toolkit/ValidatedInput";
import { mapValidatorsToErrors, mapEntitiesToValidators } from "../Utils/Utils";
// import { filter, map, mapValues } from "lodash";

// TODO: Work on making this generic.
// interface IProps {
// TODO: Make a type alias for 
// TODO: this new value can be types. Could possibly type the whole function. 
// TODO: If I normalize the data, I should be able to create a type that limits to the property names of 
//   normalized objects.
// onValidationChange: (fields: { [name: string]: string[] }) => void;
// }

// TODO: make it possible to add form level validations, e.g. if multiple text fields, addition cannot be over 100;

interface IProps {
  // TODO: fix this any
  entities: any,
  // TODO fix this any
  validateAll: (newErrors: any) => void,
  onFieldChange: (entity: ("apartments" | "buildings" | "people")) => (field: string, id: number) => (newValue: any) => void,
  onValidationChange: (entity: ("apartments" | "buildings" | "people")) => (field: string, id: number) => (newValue: any) => void,
  clearForm: () => void,
  children: ({ ValidatedInput, SubmitButton, ClearButton }) => ReactNode
}

export const Form: SFC<IProps> = (props) => {
  const formValidators = mapEntitiesToValidators(props.entities);

  const SubmitButton = () => <button onClick={runAllValidators}>Submit</button>;

  const ClearButton = () => <button onClick={props.clearForm}>Clear</button>;

  const ValidatedInput = (cProps: IValidatedInputProps) => {
    // fieldValidators = { ...fieldValidators, [cProps.fieldName]: cProps.validators };

    const { onFieldChange, onValidationChange, entities } = props;
    const { errors, entity, fieldName, id, validators } = cProps;

    // Insert the validators 
    formValidators[entity][id][fieldName] = validators;

    return (
      <VI
        key={`${entity}_${id}_${fieldName}`}
        {...cProps}
        value={entities[entity][id][fieldName]}
        label={cProps.label !== undefined ? cProps.label : cProps.fieldName}
        onFieldChange={onFieldChange(entity)(fieldName, id)}
        onValidationChange={onValidationChange(entity)(fieldName, id)}
        errors={errors}
        validators={cProps.validators}
      />);
  }

  // TODO drastically need to improve on 
  const runAllValidators = () => {
    // const newErrors = mapValues(fieldValidators, (validators, index) => filter(map(validators, validator => validator(props.model[index])), value => value !== null));
    // console.log(newErrors);
    // props.onValidationChange(newErrors);

    const newErrors = mapValidatorsToErrors(formValidators, props.entities);

    props.validateAll(newErrors);
  }

  return (
    <div>
      {props.children({
        ValidatedInput,
        SubmitButton,
        ClearButton
      })}
    </div>
  );
}

export default Form;

interface IValidatedInputProps {
  // TODO: fix this any
  classes: any,
  // TODO: this type could be better
  entity: ("apartments" | "buildings" | "people"),
  errors?: string[] | null | undefined,
  fieldName: string,
  id: number,
  // TODO: Make a type alias for  Use generic at the highest level and have that be used for this field?
  label?: string,
  // TODO: Same thing here. I should be able to make it into a generic that can infer 
  validators: Validator[],
  value: string | number,
}