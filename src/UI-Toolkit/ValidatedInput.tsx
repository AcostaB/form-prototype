import React from 'react';

import { createStyles, withStyles, Theme } from "@material-ui/core";
// import Input from '@material-ui/core/Input';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import ErrorDisplay from "../UI-Toolkit/ErrorDisplay";
// import { map, filter } from "lodash";
import styled from "styled-components";

export interface IProps {
  key?: string,
  // TODO: fix this any
  classes: any,
  errors?: string[] | null | undefined,
  // TODO: Make a type alias for this. Use generic at the highest level and have that be used for this field?
  label: string,
  // TODO: Same thing here. I should be able to make it into a generic that can infer this.
  onFieldChange: (newValue: any) => void,
  onValidationChange: (newErrors: string[]) => void,
  validators: Validator[],
  value: string | number;
}

class ValidatedInput extends React.Component<any>{

  public changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = event.target.value;

    this.props.onFieldChange(newValue);
  }

  // const onBlurHandler = () => {
  //   console.log("on blur fired");
  //   const errors: string[] = filter(map(props.validators, validator => validator(props.value)), error => error !== null && error !== undefined) as string[];

  //   props.onValidationChange(errors);
  // }

  public render = () => (
    <InputContainer>
      <LabelContainer>
        <FormLabel className={this.props.classes.inputLabel}><Label>{`${this.props.label}: `}</Label></FormLabel>
      </LabelContainer>
      <FormControlContainer>
        <FormControl fullWidth={true}>
          {/* <Input
            key={props.key}
            classes={{ input: props.classes.input }}
            error={props.errors != null && props.errors.length > 0}
            fullWidth={true}
            onBlur={onBlurHandler}
            onChange={changeHandler}
            value={props.value}
          /> */}
          <input
            key={this.props.key}
            value={this.props.value}
            onChange={this.changeHandler}
          />
          {<ErrorDisplay
            errors={this.props.errors} />
          }
        </FormControl>
      </FormControlContainer>
    </InputContainer >
  );
}

const styles = ({ spacing }: Theme) => createStyles({
  input: {
    fontSize: 14,
    padding: 0,
    paddingBottom: 2,

  },
  inputLabel: {
    fontSize: 12,
    marginLeft: spacing.unit,
    marginRight: 10,
  }
})

const InputContainer = styled.div`
  margin-top: 5px;
  display: flex;
`;

const LabelContainer = styled.div`
  display: inline-block;
  width: 100px;
  text-align: right;
`;

const FormControlContainer = styled.div`
  flex-grow: 1
`;

const Label = styled.span`
  &::first-letter {
    text-transform: uppercase;
  }
`;

export default withStyles(styles)(ValidatedInput);