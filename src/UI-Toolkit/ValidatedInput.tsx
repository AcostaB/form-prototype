import React, {
  SFC
} from 'react';

import { createStyles, withStyles, Theme } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import ErrorDisplay from "../UI-Toolkit/ErrorDisplay";
import { map, filter } from "lodash";
import styled from "styled-components";

interface IProps {
  // TODO: Make a type alias for this.
  fieldName: string;
  value: string | number;
  label: string;
  onFieldChange: (newValue: any) => void,
  onValidationChange: (newErrors: string[]) => void,
  // TODO: fix this any
  classes: any,
  errors?: string[] | null | undefined,
  validators: Validator[]
}

const ValidatedInput: SFC<IProps> = (props) => {

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newValue = event.target.value;

    props.onFieldChange(newValue);
  }

  const onBlurHandler = () => {
    const errors: string[] = filter(map(props.validators, validator => validator(props.value)), error => error !== null && error !== undefined) as string[];

    props.onValidationChange(errors);
  }

  return (
    <InputContainer>
      <LabelContainer>
        <FormLabel className={props.classes.inputLabel}>{props.label}</FormLabel>
      </LabelContainer>
      <FormControlContainer>
        <FormControl fullWidth={true}>
          <Input
            value={props.value}
            fullWidth={true}
            onChange={changeHandler}
            onBlur={onBlurHandler}
            error={props.errors != null && props.errors.length > 0}
            classes={{ input: props.classes.input }}
          />
          {<ErrorDisplay
            fieldName={props.label} // TODO this could be a problem. Address that names might clash.
            errors={props.errors} />
          }
        </FormControl>
      </FormControlContainer>
    </InputContainer>
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

export default withStyles(styles)(ValidatedInput);