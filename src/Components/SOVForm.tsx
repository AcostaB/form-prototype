import React, {
  SFC
} from 'react';
import { required, maxLength } from "../Validators/Validators";
import Form from "./Form";
import { map } from "lodash";
import { denormalize } from "normalizr";
import { building as buildingSchema } from "../Schemas/Buildings";
import { keys } from "lodash";
import styled from "styled-components";


interface IProps {
  // TODO: Make a type alias for this.
  // TODO: this new value can be types. Could possibly type the whole function.
  entities: ISOVFormEntities,
  errors: ISOVFormErrors,
  onFieldChange: (entity: ("apartments" | "buildings" | "people")) => (field: string, id: number) => (newValue: any) => void,
  onValidationChange: (entity: ("apartments" | "buildings" | "people")) => (field: string, id: number) => (newValue: any) => void,
  // TODO: fix this any
  validateAllHandler: (newErrors: any) => void
  clearFormHandler: () => void
}

const SOVForm: SFC<IProps> = (props) => {

  const data: { buildings: IBuilding[] } = denormalize(
    { buildings: keys(props.entities.buildings) },
    { buildings: [buildingSchema] },
    props.entities
  )

  return (
    <div>
      {/* TODO: Generic type for the form. */}
      <Form
        entities={props.entities}
        validateAll={props.validateAllHandler}
        clearForm={props.clearFormHandler}
        onFieldChange={props.onFieldChange}
        onValidationChange={props.onValidationChange}
      >
        {({ ValidatedInput, SubmitButton, ClearButton }) =>
          <FormContents>
            {map(data.buildings, building =>
              <BuildingRow key={`building_${building.buildingID}`}>
                <BuildingColumn>
                  <Header>Building</Header>
                  <ValidatedInput
                    fieldName="name"
                    entity="buildings"
                    id={building.buildingID}
                    errors={props.errors.buildings[building.buildingID].name}
                    validators={[required, maxLength(20)]}
                  />
                  {/* <ValidatedInput
                    value={building.construction}
                    fieldName="construction"
                    onFieldChange={props.onFieldChange("buildings")("construction", building.buildingID)}
                    onValidationChange={props.onValidationChange("buildings")("construction", building.buildingID)}
                    errors={props.errors.buildings[building.buildingID].construction}
                    validators={[required, maxLength(20)]}
                  />
                  <ValidatedInput
                    value={building.website}
                    fieldName="website"
                    onFieldChange={props.onFieldChange("buildings")("website", building.buildingID)}
                    onValidationChange={props.onValidationChange("buildings")("website", building.buildingID)}
                    errors={props.errors.buildings[building.buildingID].website}
                    validators={[required, maxLength(20)]}
                  /> */}
                </BuildingColumn>
                {/* <ApartmentColumn>
                  {map(building.apartments, apartment => (
                    <div key={apartment.apartmentID}>
                      <Header>Apartment</Header>
                      <ValidatedInput
                        value={apartment.apartmentNumber}
                        fieldName="apartmentNumber"
                        label="Apt #: "
                        onFieldChange={props.onFieldChange("apartments")("apartmentNumber", apartment.apartmentID)}
                        onValidationChange={props.onValidationChange("apartments")("apartmentNumber", apartment.apartmentID)}
                        errors={props.errors.apartments[apartment.apartmentID].apartmentNumber}
                        validators={[required, maxLength(20)]}
                      />
                      {map(apartment.tenants, tenant => (
                        <div key={tenant.personID}>
                          <Header>Tenant</Header>
                          <ValidatedInput
                            value={tenant.name}
                            fieldName="name"
                            onFieldChange={props.onFieldChange("people")("name", tenant.personID)}
                            onValidationChange={props.onValidationChange("people")("name", tenant.personID)}
                            errors={props.errors.people[tenant.personID].name}
                            validators={[required, maxLength(20)]}
                          />
                          <ValidatedInput
                            value={tenant.age}
                            fieldName="age"
                            onFieldChange={props.onFieldChange("people")("age", tenant.personID)}
                            onValidationChange={props.onValidationChange("people")("age", tenant.personID)}
                            errors={props.errors.people[tenant.personID].age}
                            validators={[required, maxLength(20)]}
                          />
                          <ValidatedInput
                            value={tenant.dateOfBirth}
                            fieldName="dateOfBirth"
                            label="Date of Birth"
                            onFieldChange={props.onFieldChange("people")("dateOfBirth", tenant.personID)}
                            onValidationChange={props.onValidationChange("people")("dateOfBirth", tenant.personID)}
                            errors={props.errors.people[tenant.personID].dateOfBirth}
                            validators={[required, maxLength(20)]}
                          />
                          <ValidatedInput
                            value={tenant.email}
                            fieldName="email"
                            onFieldChange={props.onFieldChange("people")("email", tenant.personID)}
                            onValidationChange={props.onValidationChange("people")("email", tenant.personID)}
                            errors={props.errors.people[tenant.personID].email}
                            validators={[required, maxLength(20)]}
                          />
                          <ValidatedInput
                            value={tenant.gender}
                            fieldName="gender"
                            onFieldChange={props.onFieldChange("people")("gender", tenant.personID)}
                            onValidationChange={props.onValidationChange("people")("gender", tenant.personID)}
                            errors={props.errors.people[tenant.personID].gender}
                            validators={[required, maxLength(20)]}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </ApartmentColumn> */}
              </BuildingRow>
            )}
            <SubmitButton />
            <ClearButton />
          </FormContents>
        }
      </Form>
    </div>
  );
}

export default SOVForm;

const FormContents = styled.div`
  
`;

const BuildingRow = styled.div`
  display: block
`;

const BuildingColumn = styled.div`
  display: inline-block;
  width: 300px;
  vertical-align: top;
`;

// const ApartmentColumn = styled.div`
//   display: inline-block;
//   width: 300px;
//   vertical-align: top;
// `;

const Header = styled.div`
  font-size: 14px;
  color: grey;
`;

export interface ISOVFormEntities {
  people: Keyed<IPersonNormalized>,
  buildings: Keyed<IBuildingNormalized>,
  apartments: Keyed<IApartmentNormalized>
}

export interface ISOVFormErrors {
  people: Keyed<Errors<IPerson>>,
  buildings: Keyed<Errors<IBuilding>>,
  apartments: Keyed<Errors<IApartment>>
}
