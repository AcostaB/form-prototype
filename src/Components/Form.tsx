import React, { ReactNode, SFC } from "react";
import { default as VI } from "../UI-Toolkit/ValidatedInput";
import { addOrEditEntityField, mapValidatorsToErrors } from "../Utils/Utils";
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

interface IRenderProps {
  ValidatedInput: SFC<IValidatedInputProps>;
  SubmitButton: SFC;
  ClearButton: SFC;
}

interface IProps<T> {
  // TODO: fix this any
  entities: any;
  // TODO fix this any
  errors: any;
  // TODO fix this any
  validateAll: (newErrors: any) => void;
  // TODO fix this any
  onFieldChange: any,
  // TODO fix this any
  onValidationChange: any,
  clearForm: () => void;
  children: (renderProps: IRenderProps) => ReactNode;

}

class Form<T> extends React.Component<IProps<T>, {}> {
  public fieldValidators = {};

  public SubmitButton = () => (
    <button onClick={this.runAllValidators}>Submit</button>
  );

  public ClearButton = () => (
    <button onClick={this.props.clearForm}>Clear</button>
  );

  public ValidatedInput = (cProps: IValidatedInputProps) => {
    this.fieldValidators = {
      ...this.fieldValidators,
      [cProps.fieldName]: cProps.validators
    };
    const { onFieldChange, onValidationChange, entities, errors } = this.props;
    const { entity, fieldName, id, validators } = cProps;

    // Insert the validators. Function handles possible references to undefined objects.
    this.fieldValidators = addOrEditEntityField(
      this.fieldValidators,
      entity,
      id,
      fieldName,
      validators
    );

    return (
      <VI
        {...cProps}
        value={entities[entity][id][fieldName]}
        label={cProps.label !== undefined ? cProps.label : cProps.fieldName}
        onFieldChange={onFieldChange(entity)(fieldName)(id)}
        onValidationChange={onValidationChange(entity)(fieldName, id)}
        errors={errors[entity][id][fieldName]}
        validators={cProps.validators}
      />
    );
  };

  // TODO drastically need to improve on this.
  public runAllValidators = () => {
    const newErrors = mapValidatorsToErrors(
      this.fieldValidators,
      this.props.entities
    );

    this.props.validateAll(newErrors);
  };

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
  // TODO: this type could be better
  entity: "apartments" | "buildings" | "people";
  errors?: string[] | null | undefined;
  fieldName: string;
  id: number;
  // TODO: Make a type alias for this. Use generic at the highest level and have that be used for this field?
  label?: string;
  // TODO: Same thing here. I should be able to make it into a generic that can infer this.
  validators: Validator[];
}
