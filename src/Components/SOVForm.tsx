import React, { SFC } from "react";
import { required, maxLength } from "../Validators/Validators";
import Form from "./Form";
import { map } from "lodash";
import { denormalize } from "normalizr";
import { location as locationSchema } from "../Schemas/SOV";
import { createStyles, withStyles, Theme } from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { keys } from "lodash";
import styled from "styled-components";

interface IProps {
  classes: any,
  // TODO: Make a type alias for this.
  // TODO: this new value can be types. Could possibly type the whole function.
  entities: ISOVFormEntities,
  errors: ISOVFormErrors,
  // TODO fix these anys
  onFieldChange: (entity: keyof ISOVFormEntities) => (field: string) => (id: number) => (newValue: any) => void,
  onValidationChange: (entity: keyof ISOVFormEntities) => (field: string, id: number) => (newValue: any) => void,
  // TODO: fix this any
  validateAllHandler: (newErrors: any) => void;
  clearFormHandler: () => void;
}

const SOVFormBase: SFC<IProps> = props => {
  const data: { locations: ILocation[] } = denormalize(
    { locations: keys(props.entities.locations) },
    { locations: [locationSchema] },
    props.entities
  );

  return (
    <div>
      {/* TODO: Generic type for the form. */}
      <Form
        entities={props.entities}
        errors={props.errors}
        validateAll={props.validateAllHandler}
        clearForm={props.clearFormHandler}
        onFieldChange={props.onFieldChange}
        onValidationChange={props.onValidationChange}
      >
        {({ ValidatedInput, SubmitButton, ClearButton, ButtonRow }) => (
          <FormContents>
            {map(data.locations, location => (
              <ExpansionPanel>
                <StyledSummary classes={{ root: props.classes.root, expanded: props.classes.expanded }} expandIcon={<ExpandMoreIcon />}>
                  {`${location.locationID} - ${location.locationName} ${location.address.city}, ${location.address.state} ${location.address.zip} `}
                </StyledSummary>
                <LocationRow key={`location_${location.id}`}>
                  <ValidatedInput
                    fieldName="locationNumber"
                    label="Location #"
                    entity="locations"
                    id={location.id}
                    validators={[required, maxLength(20)]}
                  />
                  <ValidatedInput
                    fieldName="locationName"
                    label="Location Name"
                    entity="locations"
                    id={location.id}
                    validators={[required, maxLength(20)]}
                  />
                  <br />
                  <ValidatedInput
                    fieldName="line1"
                    label="Line 1"
                    entity="addresses"
                    id={location.address!.id}
                    validators={[required, maxLength(20)]}
                  />
                  <ValidatedInput
                    fieldName="city"
                    entity="addresses"
                    id={location.address!.id}
                    validators={[required, maxLength(20)]}
                  />
                  <ValidatedInput
                    fieldName="state"
                    entity="addresses"
                    id={location.address!.id}
                    validators={[required, maxLength(20)]}
                  />
                  <ValidatedInput
                    fieldName="zip"
                    entity="addresses"
                    id={location.address!.id}
                    validators={[required, maxLength(20)]}
                  />
                </LocationRow>
                <BuildingRow>
                  {map(location.buildings, building => (
                    <div key={building.id}>
                      <ExpansionPanel>
                        <NestedStyledSummary>
                          {`${building.buildingID} - ${building.buildingName} - ${building!.streetNumber} ${building!.address!.line1} ${building!.address!.city}, ${building!.address!.state} ${building!.address!.zip} `}
                        </NestedStyledSummary>
                        <ValidatedInput
                          fieldName="buildingID"
                          label="Building ID"
                          entity="buildings"
                          id={building.id}
                          validators={[required, maxLength(20)]}
                        />
                        <ValidatedInput
                          fieldName="buildingName"
                          label="Building Name"
                          entity="buildings"
                          id={building.id}
                          validators={[required, maxLength(20)]}
                        />
                        <ValidatedInput
                          fieldName="streetNumber"
                          label="Street Number"
                          entity="buildings"
                          id={building.id}
                          validators={[required, maxLength(20)]}
                        />
                        <br />
                        <ValidatedInput
                          fieldName="isPropertyWithin1000FeetOfWater"
                          label="Is property within 1000 feet of water"
                          entity="buildings"
                          id={building.id}
                          validators={[required, maxLength(20)]}
                        />
                        <ValidatedInput
                          fieldName="numberOfBuildings"
                          label="# of buildings"
                          entity="buildings"
                          id={building.id}
                          validators={[required, maxLength(20)]}
                        />
                        <ValidatedInput
                          fieldName="originallyBuilt"
                          label="Originally built"
                          entity="buildings"
                          id={building.id}
                          validators={[required, maxLength(20)]}
                        />
                        <ValidatedInput
                          fieldName="wiring"
                          entity="buildings"
                          id={building.id}
                          validators={[required, maxLength(20)]}
                        />
                        <ValidatedInput
                          fieldName="plumbing"
                          entity="buildings"
                          id={building.id}
                          validators={[required, maxLength(20)]}
                        />
                        <ValidatedInput
                          fieldName="heating"
                          entity="buildings"
                          id={building.id}
                          validators={[required, maxLength(20)]}
                        />
                        <ValidatedInput
                          fieldName="totalTiv"
                          label="Total TIV"
                          entity="buildings"
                          id={building.id}
                          validators={[required, maxLength(20)]}
                        />
                        <ValidatedInput
                          fieldName="basement"
                          entity="buildings"
                          id={building.id}
                          validators={[required, maxLength(20)]}
                        />
                        <ValidatedInput
                          fieldName="shapeOfRoof"
                          label="Shape of roof"
                          entity="buildings"
                          id={building.id}
                          validators={[required, maxLength(20)]}
                        />
                      </ExpansionPanel>
                    </div>
                  ))}
                </BuildingRow>
              </ExpansionPanel>
            ))}
            <ButtonRow>
              <SubmitButton />
              <ClearButton />
            </ButtonRow>
          </FormContents>
        )}
      </Form>
    </div>
  );
};

const FormContents = styled.div``;

const LocationRow = styled.div`
  vertical-align: top;
`;

const BuildingRow = styled.div`
  vertical-align: top;
`;

// const Header = styled.div`
//   font-size: 14px;
//   color: grey;
// `;

const formStyles = (theme: Theme) => createStyles({

})

const summaryStyles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: "#3f51b5",
    color: "white",
    // height: "48px",
    minHeight: "48px !important"
  },
  expanded: {
    margin: "0 !important",
    // minHeight: "48px !important"
    // height: "48px"
  }
})

const nestedSummaryStyles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: "#7885CB",
    color: "white",
    // height: "48px",
    minHeight: "48px !important"
  },
  expanded: {
    margin: "0 !important",
    // minHeight: "48px !important"
    // height: "48px"
  }
})



const NestedStyledSummary = withStyles(nestedSummaryStyles)(ExpansionPanelSummary);

const StyledSummary = withStyles(summaryStyles)(ExpansionPanelSummary);

export const SOVForm = withStyles(formStyles)(SOVFormBase);