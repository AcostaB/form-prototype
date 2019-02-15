import React, { FunctionComponent } from "react";
import { required, maxLength } from "../Validators/Validators";
import Form from "../UI-Toolkit/Form";
import { map } from "lodash";
import { denormalize } from "normalizr";
import { building as buildingSchema } from "../Schemas/Demo";
import { keys } from "lodash";
import styled from "styled-components/macro";
import { Building } from "../Models/Building";
import { DemoFormEntities, DemoFormErrors } from "../Definitions/DemoForm";

interface Props {
  // TODO: Make a type alias for this.
  // TODO: this new value can be types. Could possibly type the whole function.
  entities: DemoFormEntities,
  errors: DemoFormErrors,
  // TODO fix these anys
  onFieldChange: (entity: keyof DemoFormEntities) => (field: string) => (id: number) => (newValue: any) => void,
  onValidationChange: (entity: keyof DemoFormEntities) => (field: string, id: number) => (newValue: any) => void,
  // TODO: fix this any
  validateAllHandler: (newErrors: any) => void;
  clearFormHandler: () => void;
}

const DemoForm: FunctionComponent<Props> = props => {
  const data: { buildings: Building[] } = denormalize(
    { buildings: keys(props.entities.buildings) },
    { buildings: [buildingSchema] },
    props.entities
  );

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
        {({ ValidatedInput, SubmitButton, ClearButton }) => (
          <FormContents>
            {map(data.buildings, building => (
              <BuildingRow key={`building_${building.buildingID}`}>
                <BuildingRow>
                  <Header>Building</Header>
                  <ValidatedInput
                    fieldName="name"
                    entity="buildings"
                    id={building.buildingID}
                    validators={[required, maxLength(20)]}
                  />
                  <ValidatedInput
                    fieldName="construction"
                    entity="buildings"
                    id={building.buildingID}
                    validators={[required, maxLength(20)]}
                  />
                  <ValidatedInput
                    fieldName="website"
                    entity="buildings"
                    id={building.buildingID}
                    validators={[required, maxLength(20)]}
                  />
                </BuildingRow>
                <ApartmentRows>
                  {map(building.apartments, apartment => (
                    <div key={apartment.apartmentID}>
                      <Header>Apartment</Header>
                      <ValidatedInput
                        fieldName="apartmentNumber"
                        label="Apt #"
                        entity="apartments"
                        id={apartment.apartmentID}
                        validators={[required, maxLength(20)]}
                      />
                      <Header>Tenants</Header>
                      {map(apartment.tenants, tenant => (
                        <div key={tenant.personID}>
                          <ValidatedInput
                            fieldName="name"
                            entity="people"
                            id={tenant.personID}
                            validators={[required, maxLength(20)]}
                          />
                          <ValidatedInput
                            fieldName="age"
                            entity="people"
                            id={tenant.personID}
                            validators={[required, maxLength(20)]}
                          />
                          <ValidatedInput
                            fieldName="dateOfBirth"
                            label="Date of Birth"
                            entity="people"
                            id={tenant.personID}
                            validators={[required, maxLength(20)]}
                          />
                          <ValidatedInput
                            fieldName="email"
                            entity="people"
                            id={tenant.personID}
                            validators={[required, maxLength(20)]}
                          />
                          <ValidatedInput
                            fieldName="gender"
                            entity="people"
                            id={tenant.personID}
                            validators={[required, maxLength(20)]}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </ApartmentRows>
              </BuildingRow>
            ))}
            <SubmitButton />
            <ClearButton />
          </FormContents>
        )}
      </Form>
    </div>
  );
};

export default DemoForm;

const FormContents = styled.div``;

const BuildingRow = styled.div`
  vertical-align: top;
`;

const ApartmentRows = styled.div`
  vertical-align: top;
`;

const Header = styled.div`
  font-size: 14px;
  color: grey;
`;
