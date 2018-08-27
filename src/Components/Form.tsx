import React from 'react';
import { default as VI } from "../UI-Toolkit/ValidatedInput";
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

class Form extends React.Component<{}, {}> {
  public fieldValidators: { [name: string]: Function[] } = {};

  public Button = () => <button onClick={this.runAllValidators}>Button</button>;

  public ValidatedInput = (cProps: IValidatedInputProps) => {
    this.fieldValidators = { ...this.fieldValidators, [cProps.fieldName]: cProps.validators };
    return <VI {...cProps} label={cProps.label !== undefined ? cProps.label : cProps.fieldName} />
  }

  // TODO drastically need to improve on this.
  public runAllValidators = () => {
    // const newErrors = mapValues(this.fieldValidators, (validators, index) => filter(map(validators, validator => validator(this.props.model[index])), value => value !== null));
    // console.log(newErrors);
    // this.props.onValidationChange(newErrors);
  }

  public render = () => (
    <div>
      {(this.props.children as any)({ ValidatedInput: this.ValidatedInput, Button: this.Button })}
    </div>
  );
}

export default Form;

interface IValidatedInputProps {
  // TODO: fix this any
  classes: any,
  errors?: string[] | null | undefined,
  fieldName: string
  // TODO: Make a type alias for this. Use generic at the highest level and have that be used for this field?
  label?: string,
  // TODO: Same thing here. I should be able to make it into a generic that can infer this.
  onFieldChange: (newValue: any) => void,
  onValidationChange: (newErrors: string[]) => void,
  validators: Validator[],
  value: string | number,
}