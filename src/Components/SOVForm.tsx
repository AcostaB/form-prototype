import React, {
  SFC
} from 'react';
import Grid from '@material-ui/core/Grid';
import { required, maxLength } from "../Validators/Validators";
import Form from "./Form";
import { map } from "lodash";

interface IProps {
  // TODO: Make a type alias for this.
  // TODO: this new value can be types. Could possibly type the whole function.
  entities: ISOVFormEntities,
  errors: ISOVFormErrors,

  onFieldChange: (entity: ("apartments" | "buildings" | "people")) => (field: string, id: number) => (newValue: any) => void,
  onValidationChange: (entity: ("apartments" | "buildings" | "people")) => (field: string, id: number) => (newValue: any) => void,
  onSingleValidationChange: (entity: ("apartments" | "buildings" | "people")) => (field: string, id: number) => (newValue: any) => void,
}

const SOVForm: SFC<IProps> = (props) => {
  return (
    <div>
      {/* TODO: Generic type for the form. */}
      <Form>
        {({ ValidatedInput, Button }) =>
          <Grid>
            {map(props.entities.buildings, building =>
              <div className="BUILDING_ROW" key={`building_${building.buildingID}`}>
                <ValidatedInput
                  value={building.name}
                  fieldName="name"
                  label="Name: "
                  onFieldChange={props.onFieldChange("buildings")("name", building.buildingID)}
                  onValidationChange={props.onSingleValidationChange("buildings")("name", building.buildingID)}
                  errors={(props.errors.buildings as any)[building.buildingID].name}
                  validators={[required, maxLength(20)]}
                />
                <ValidatedInput
                  value={building.construction}
                  fieldName="construction"
                  label="Construction: "
                  onFieldChange={props.onFieldChange("buildings")("construction", building.buildingID)}
                  onValidationChange={props.onSingleValidationChange("buildings")("construction", building.buildingID)}
                  errors={(props.errors.buildings as any)[building.buildingID].construction}
                  validators={[required, maxLength(20)]}
                />
                <ValidatedInput
                  value={building.website}
                  fieldName="website"
                  label="Website: "
                  onFieldChange={props.onFieldChange("buildings")("website", building.buildingID)}
                  onValidationChange={props.onSingleValidationChange("buildings")("website", building.buildingID)}
                  errors={(props.errors.buildings as any)[building.buildingID].website}
                  validators={[required, maxLength(20)]}
                />
              </div>
            )}
            <Button />
          </Grid>
        }
      </Form>
    </div>
  );
}

export default SOVForm;

export interface ISOVFormEntities {
  people?: Keyed<IPersonNormalized>,
  buildings?: Keyed<IBuildingNormalized>,
  apartments?: Keyed<IApartmentNormalized>
}

export interface ISOVFormErrors {
  people?: Keyed<Errors<IPerson>>,
  buildings?: Keyed<Errors<IBuilding>>,
  apartments?: Keyed<Errors<IApartment>>
}
