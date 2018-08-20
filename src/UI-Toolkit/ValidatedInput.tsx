import React, {
  SFC
} from 'react';

import { createStyles, withStyles, Theme } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ErrorDisplay from "../UI-Toolkit/ErrorDisplay";
import { map, filter } from "lodash";

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
    <div>
      <InputLabel>{props.label}</InputLabel>
      <FormControl>
        <Input
          value={props.value}
          onChange={changeHandler}
          onBlur={onBlurHandler}
          error={props.errors != null && props.errors.length > 0}
        />
        {<ErrorDisplay
          fieldName={props.label} // TODO this could be a problem. Address that names might clash.
          errors={props.errors} />
        }
      </FormControl>
    </div>
  );
}

const styles = ({ spacing }: Theme) => createStyles({
  textField: {
    marginLeft: spacing.unit,
    marginRight: spacing.unit,
    width: 200,
  }
})

export default withStyles(styles)(ValidatedInput);