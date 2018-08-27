import { schema } from 'normalizr';

// The first parameter will be the key for the normalized output. i.e. entities.people
export const person = new schema.Entity("people", {}, { idAttribute: "personID" });

export const apartment = new schema.Entity("apartments", {
  tenants: [person]
}, { idAttribute: "apartmentID" });

export const address = new schema.Entity("addresses", {}, { idAttribute: "addressID" });

export const building = new schema.Entity("buildings", {
  address,
  apartments: [apartment]
}, { idAttribute: "buildingID" })

