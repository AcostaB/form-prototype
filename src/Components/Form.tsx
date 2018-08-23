import React from 'react';
import { default as VI } from "../UI-Toolkit/ValidatedInput";
import { filter, map, mapValues } from "lodash";

interface IProps extends IPerson {
  // TODO: Make a type alias for this.
  // TODO: this new value can be types. Could possibly type the whole function. 
  onFieldChange: (name: Key<IPerson>) => (newValue: any) => void;
  onValidationChange: (fields: { [name: string]: string[] }) => void;
  // TODO: fix this any
  errors: KeyedErrors<IPerson>
}

class Form extends React.Component<IProps, {}> {
  public fieldValidators: { [name: string]: Function[] } = {};

  public Button = () => <button onClick={this.runAllValidators}>Button</button>;

  public ValidatedInput = (cProps) => {
    this.fieldValidators = { ...this.fieldValidators, [cProps.fieldName]: cProps.validators };
    return <VI {...cProps} />
  }

  // TODO drastically need to improve on this.
  public runAllValidators = () => {
    const newErrors = mapValues(this.fieldValidators, (validators, index) => filter(map(validators, validator => validator(this.props[index])), value => value !== null));
    console.log(newErrors);
    this.props.onValidationChange(newErrors);
  }

  public render = () => (
    <div>
      {(this.props.children as any)({ ValidatedInput: this.ValidatedInput, Button: this.Button })}
    </div>
  );
}

export default Form;