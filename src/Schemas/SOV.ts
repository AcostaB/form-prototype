import { schema } from 'normalizr';

// The first parameter will be the key for the normalized output. i.e. entities.people

export const address = new schema.Entity("addresses");

export const building = new schema.Entity("buildings", {
  address
})

export const location = new schema.Entity("locations", {
  address,
  buildings: [building]
});
