import React, {
  SFC
} from 'react';

import { createStyles, withStyles } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import { map } from "lodash";
import styled from "styled-components";

interface IProps {
  errors?: string[] | null | undefined;
  fieldName: string;
  classes: any; // TODO fix this any
}

const ErrorDisplay: SFC<IProps> = ({ errors, fieldName, classes }) => {
  const displayError: boolean = errors !== null && errors !== undefined && errors.length > 0;
  const displayTooltip: boolean = errors !== null && errors !== undefined && errors.length > 1;
  // TODO fix this any.
  const tooltipContent: any = displayTooltip ? map(errors, (error, index) => <div>{index + 1}. {error}</div>) : '';

  return (
    <ErrorRow>
      {displayError
        && <ErrorText>
          {(errors as any)[0]}
        </ErrorText>}
      <ErrorIcon>
        {displayTooltip
          && <Tooltip
            title={tooltipContent}
            placement="right"
            classes={{ tooltip: classes.tooltip }}
          >
            <Icon color="error" style={{ fontSize: 14 }}>add_circle</Icon>
          </Tooltip>}
      </ErrorIcon>
    </ErrorRow>
  );
}

const ErrorRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
`;

const ErrorText = styled.div`
  flex: 1;
  color: red;
  font-size: 12px;
`;

const ErrorIcon = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 10px;
`;

const styles = () => createStyles({
  tooltip: {
    background: "red",
    color: "white",
    fontSize: 13
  }
});

export default withStyles(styles)(ErrorDisplay);