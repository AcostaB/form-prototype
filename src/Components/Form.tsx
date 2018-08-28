import React, { ReactNode } from 'react';
import { default as VI } from "../UI-Toolkit/ValidatedInput";
import { mapValidatorsToErrors, mapEntitiesToValidators } from "../Utils/Utils";
// import { filter, map, mapValues } from "lodash";

// TODO: Work on making this generic.
// interface IProps {
// TODO: Make a type alias for this.
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

class Form extends React.Component<IProps, {}> {
  public fieldValidators = mapEntitiesToValidators(this.props.entities);

  public SubmitButton = () => <button onClick={this.runAllValidators}>Submit</button>;

  public ClearButton = () => <button onClick={this.props.clearForm}>Clear</button>;

  public ValidatedInput = (cProps: IValidatedInputProps) => {
    this.fieldValidators = { ...this.fieldValidators, [cProps.fieldName]: cProps.validators };
    const { onFieldChange, onValidationChange, entities } = this.props;
    const { errors, entity, fieldName, id, validators } = cProps;

    // Insert the validators 
    this.fieldValidators[entity][id][fieldName] = validators;

    return (
      <VI
        {...cProps}
        value={entities[entity][id][fieldName]}
        label={cProps.label !== undefined ? cProps.label : cProps.fieldName}
        onFieldChange={onFieldChange(entity)(fieldName, id)}
        onValidationChange={onValidationChange(entity)(fieldName, id)}
        errors={errors}
        validators={cProps.validators}
      />);
  }

  // TODO drastically need to improve on this.
  public runAllValidators = () => {
    // const newErrors = mapValues(this.fieldValidators, (validators, index) => filter(map(validators, validator => validator(this.props.model[index])), value => value !== null));
    // console.log(newErrors);
    // this.props.onValidationChange(newErrors);

    const newErrors = mapValidatorsToErrors(this.fieldValidators, this.props.entities);

    this.props.validateAll(newErrors);
  }

  public render = () => (
    <div>
      {this.props.children({
        ValidatedInput: this.ValidatedInput,
        SubmitButton: this.SubmitButton,
        ClearButton: this.ClearButton
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
  // TODO: Make a type alias for this. Use generic at the highest level and have that be used for this field?
  label?: string,
  // TODO: Same thing here. I should be able to make it into a generic that can infer this.
  validators: Validator[],
  value: string | number,
}