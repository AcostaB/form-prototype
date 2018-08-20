import React, {
  SFC
} from 'react';
import styled from "styled-components";

import { createStyles, withStyles, Theme } from "@material-ui/core";
import ValidatedInput from "../UI-Toolkit/ValidatedInput";

interface IProps extends IPerson {
  // TODO: Make a type alias for this.
  onFieldChange: (name: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
  // TODO: fix this any
  classes: any
}

const Form1: SFC<IProps> = (props) => {
  return (
    <Form1Container>
      <ValidatedInput
        value={props.name}
        fieldName="name"
        label="Name: "
        onFieldChange={props.onFieldChange}
        errors={['TEST - Required - very looooong looooong looooong looooong', 'test2']}
      />
    </Form1Container>
  );
}

const Form1Container = styled.form`
    margin: 10px 10px;
  `;

const styles = ({ spacing }: Theme) => createStyles({
  textField: {
    marginLeft: spacing.unit,
    marginRight: spacing.unit,
    width: 200,
  }
})

export default withStyles(styles)(Form1);