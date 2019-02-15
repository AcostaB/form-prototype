import React, { ReactNode, FunctionComponent } from "react";
import { default as ValidatedInput } from "./ValidatedInput";
import { addOrEditEntityField } from "../Utils/Utils";
import Button from '@material-ui/core/Button';
import styled from "styled-components/macro";
import { Validator, NonFunctionPropertyNames } from "../Definitions/main";
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

interface ClearButtonProps {
  onClick?: () => void
}

interface ValidatedInputProps<T> {
  // TODO: this type could be better
  entity: string;
  errors?: string[] | null | undefined;
  fieldName: NonFunctionPropertyNames<T>;
  id: number;
  // TODO: Make a type alias for this. Use generic at the highest level and have that be used for this field?
  label?: string;
  // TODO: Same thing here. I should be able to make it into a generic that can infer this.
  validators: Validator[];
}

interface RenderProps {
  ValidatedInput: <K>(cProps: ValidatedInputProps<K>) => JSX.Element;
  SubmitButton: FunctionComponent;
  ClearButton: FunctionComponent<ClearButtonProps>;
  ButtonRow: FunctionComponent;
}

interface Props<T> {
  // TODO: fix this any
  entities: any;
  // TODO fix this any
  errors: any;
  // TODO fix this any
  // validateAll: (newErrors: any) => void;
  // TODO fix this any
  onFieldChange: any,
  // TODO fix this any
  // onValidationChange: any,
  clearForm: () => void;
  children: (renderProps: RenderProps) => ReactNode;
}

class Form<T> extends React.Component<Props<T>, {}> {
  public fieldValidators = {};

  public SubmitButton = () => (
    // <Button variant="contained" onClick={this.runAllValidators}>
    <Button variant="contained" color="primary" onClick={() => { }}>
      Submit
    </Button>
  );

  public ClearButton = (cProps: ClearButtonProps) => (
    // <Button variant="contained" onClick={this.runAllValidators}>
    <Button variant="contained" onClick={cProps.onClick}>
      Clear
    </Button>
  );

  public ButtonRow = (cProps: any) => (
    <StyledButtonRow>{cProps.children}</StyledButtonRow>
  )

  public ValidatedInput: <K>(cProps: ValidatedInputProps<K>) => JSX.Element = (cProps) => {
    this.fieldValidators = {
      ...this.fieldValidators,
      [cProps.fieldName]: cProps.validators
    };
    const {
      onFieldChange,
      // onValidationChange,
      entities,
      errors
    } = this.props;
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
      <ValidatedInput
        {...cProps}
        value={entities[entity][id][fieldName]}
        label={cProps.label !== undefined ? cProps.label : cProps.fieldName}
        onFieldChange={onFieldChange(entity)(fieldName)(id)}
        onValidationChange={() => { }}
        errors={errors[entity][id][fieldName]}
        validators={cProps.validators}
      />
    );
  };

  // TODO drastically need to improve on this.
  // public runAllValidators = () => {
  //   const newErrors = mapValidatorsToErrors(
  //     this.fieldValidators,
  //     this.props.entities
  //   );

  //   this.props.validateAll(newErrors);
  // };

  public render = () => (
    <div>
      {this.props.children({
        ValidatedInput: this.ValidatedInput,
        SubmitButton: this.SubmitButton,
        ClearButton: this.ClearButton,
        ButtonRow: this.ButtonRow
      })}
    </div>
  );
}

export default Form;

const StyledButtonRow = styled.div`
  display: flex-inline;
  text-align: right;
  margin-top: 10px;
`;