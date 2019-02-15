import React, { FunctionComponent } from "react";
import { required, maxLength } from "../Validators/Validators";
import Form from "../UI-Toolkit/Form";
import { map } from "lodash";
import { denormalize } from "normalizr";
import { location as locationSchema } from "../Schemas/Demo";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { ExpandMore as ExpandMoreIcon, Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import { keys } from "lodash";
import styled from "styled-components/macro";
import { LocationFormEntities, LocationFormErrors } from "../Definitions/LocationForm";
import { Location } from '../Models/Location';
import { Building } from "../Models/Building";
import { Address } from "../Models/Address";
import Button from "@material-ui/core/Button";

interface Props {
  // TODO: Make a type alias for this.
  // TODO: this new value can be types. Could possibly type the whole function.
  entities: LocationFormEntities,
  errors: LocationFormErrors,
  // TODO fix these anys
  onFieldChange: (entity: keyof LocationFormEntities) => (field: string) => (id: number) => (newValue: any) => void,
  // onValidationChange: (entity: keyof LocationFormEntities) => (field: string, id: number) => (newValue: any) => void,
  // TODO: fix this any
  // validateAllHandler: (newErrors: any) => void;
  addLocationHandler: () => void,
  deleteLocationHandler: (id: number) => void,
  addBuildingToLocationHandler: (locationID: number) => void,
  removeBuildingFromLocationHandler: (locationID: number, buildingID: number) => void,
  clearFormHandler: () => void
}

export const LocationForm: FunctionComponent<Props> = props => {
  const data: { locations: Location[] } = denormalize(
    { locations: keys(props.entities.locations) },
    { locations: [locationSchema] },
    props.entities
  );

  const formattedAddress = (building: Building) => {
    if (!!building && !!building.address) {
      return `${building.buildingID} - ${building.name} - ${building.address.line1} ${building.address.city}, ${building.address.state} ${building.address.zip} `
    }
    return ''
  }

  return (
    <div>
      {/* TODO: Generic type for the form. */}
      <Form
        entities={props.entities}
        errors={props.errors}
        // validateAll={props.validateAllHandler}
        clearForm={props.clearFormHandler}
        onFieldChange={props.onFieldChange}
      // onValidationChange={props.onValidationChange}
      >
        {({ ValidatedInput, SubmitButton, ClearButton, ButtonRow }) => (
          <FormContents>
            {map(data.locations, (location: Location) => (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <ExpansionPanelSummaryWrapper>
                    <span>
                      {`${location.locationNum} - ${location.locationName} ${location.address!.city}, ${location.address!.state} ${location.address!.zip} `}
                    </span>
                    <StyledAddIcon onClick={(e: any) => {
                      e.preventDefault();
                      e.stopPropagation();
                      props.addBuildingToLocationHandler(location.id);
                    }} />
                    <StyledDeleteIcon onClick={() => props.deleteLocationHandler(location.id)} />
                  </ExpansionPanelSummaryWrapper>
                </ExpansionPanelSummary>
                <LocationRow key={`location_${location.id}`}>
                  <ValidatedInput<Location>
                    fieldName="locationNum"
                    label="Location #"
                    entity="locations"
                    id={location.id}
                    validators={[required, maxLength(20)]}
                  />
                  <ValidatedInput<Location>
                    fieldName="locationName"
                    label="Location Name"
                    entity="locations"
                    id={location.id}
                    validators={[required, maxLength(20)]}
                  />
                  <br />
                  <ValidatedInput<Address>
                    fieldName="line1"
                    label="Line 1"
                    entity="addresses"
                    id={location.address!.addressID}
                    validators={[required, maxLength(20)]}
                  />
                  <ValidatedInput<Address>
                    fieldName="city"
                    entity="addresses"
                    id={location.address!.addressID}
                    validators={[required, maxLength(20)]}
                  />
                  <ValidatedInput<Address>
                    fieldName="state"
                    entity="addresses"
                    id={location.address!.addressID}
                    validators={[required, maxLength(20)]}
                  />
                  <ValidatedInput<Address>
                    fieldName="zip"
                    entity="addresses"
                    id={location.address!.addressID}
                    validators={[required, maxLength(20)]}
                  />
                </LocationRow>
                <BuildingRow>
                  {map(location.buildings, building => (
                    <div key={building.buildingID}>
                      <ExpansionPanel>
                        <ExpansionPanelSummary>
                          <ExpansionPanelSummaryWrapper>
                            <span>
                              {formattedAddress(building)}
                            </span>
                            <StyledDeleteIcon onClick={() => props.removeBuildingFromLocationHandler(location.id, building.buildingID)} />
                          </ExpansionPanelSummaryWrapper>
                        </ExpansionPanelSummary>
                        <ValidatedInput<Building>
                          fieldName="buildingID"
                          label="Building ID"
                          entity="buildings"
                          id={building.buildingID}
                          validators={[required, maxLength(20)]}
                        />
                        <ValidatedInput<Building>
                          fieldName="name"
                          label="Building Name"
                          entity="buildings"
                          id={building.buildingID}
                          validators={[required, maxLength(20)]}
                        />
                        <br />
                      </ExpansionPanel>
                    </div>
                  ))}
                </BuildingRow>
              </ExpansionPanel>
            ))}
            <ButtonRow>
              <SubmitButton />
              <ClearButton onClick={props.clearFormHandler} />
              <Button variant="contained" onClick={props.addLocationHandler}> Add Location </Button>
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

const ExpansionPanelSummaryWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAddIcon = styled<any>(AddIcon)`
  padding-left: 10px;
`;

const StyledDeleteIcon = styled<any>(DeleteIcon)`
  padding-left: 10px;
` as typeof DeleteIcon;

// const formStyles = (theme: Theme) => createStyles({

// })

// const summaryStyles = (theme: Theme) => createStyles({
//   root: {
//     backgroundColor: "#3f51b5",
//     color: "white",
//     // height: "48px",
//     minHeight: "48px !important"
//   },
//   expanded: {
//     margin: "0 !important",
//     // minHeight: "48px !important"
//     // height: "48px"
//   }
// })

// const nestedSummaryStyles = (theme: Theme) => createStyles({
//   root: {
//     backgroundColor: "#7885CB",
//     color: "white",
//     // height: "48px",
//     minHeight: "48px !important"
//   },
//   expanded: {
//     margin: "0 !important",
//     // minHeight: "48px !important"
//     // height: "48px"
//   }
// });