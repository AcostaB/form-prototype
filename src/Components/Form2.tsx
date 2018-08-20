import React, {
  SFC
} from 'react';
import styled from "styled-components";

import { createStyles, TextField, withStyles, Theme } from "@material-ui/core";

interface IProps extends IDog {
  // TODO: Make a type alias for this.
  onFieldChange: (name: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
  // TODO: fix this any
  classes: any
}

const Form2: SFC<IProps> = (props) => {
  return (
    <Form2Container>
      <TextField
        label="Name: "
        value={props.name}
        onChange={props.onFieldChange('dogName')}
        className={props.classes.textField}
      />
      <TextField
        label="Breed: "
        value={props.breed}
        onChange={props.onFieldChange('breed')}
        className={props.classes.textField}
      />
      <TextField
        label="Age: "
        value={props.age}
        onChange={props.onFieldChange('dogAge')} // TODO: this could cause exception with invalid number.
        className={props.classes.textField}
      />
      <TextField
        label="Size: "
        value={props.size}
        onChange={props.onFieldChange('dogSize')}
        className={props.classes.textField}
      />
    </Form2Container>
  );
}

const Form2Container = styled.form`
  margin: 10px 10px;
`;

const styles = ({ spacing }: Theme) => createStyles({
  textField: {
    marginLeft: spacing.unit,
    marginRight: spacing.unit,
    width: 200,
  }
})

export default withStyles(styles)(Form2);