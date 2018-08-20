import React, {
  SFC
} from 'react';

import { createStyles, withStyles, Theme } from "@material-ui/core";
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ErrorDisplay from "../UI-Toolkit/ErrorDisplay";

interface IProps {
  // TODO: Make a type alias for this.
  fieldName: string;
  value: string | number;
  label: string;
  onFieldChange: (name: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
  // TODO: fix this any
  classes: any,
  errors?: string[]
}

const ValidatedInput: SFC<IProps> = (props) => {

  return (
    <div>
      <InputLabel>{props.label}</InputLabel>
      <FormControl>
        <Input
          value={props.value}
          onChange={props.onFieldChange(props.fieldName)}
          error={props.errors != null && props.errors.length > 0}
        />
        {<ErrorDisplay
          fieldName="name"
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