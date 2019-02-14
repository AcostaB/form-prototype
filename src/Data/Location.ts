import { Location } from '../Models/Location'

export const data: Location[] = [
  {
    id: 1,
    locationID: 1,
    locationName: "Sailfish Dr.",
    address: {
      id: 1,
      addressID: 1,
      line1: "Sailfish Dr.",
      line2: "",
      city: "Manteo",
      state: "NC",
      zip: "27954"
    },
    buildings: [
      {
        buildingID: 1,
        name: "Building 1",
        address: {
          id: 2,
          addressID: 2,
          line1: "Sailfish Dr.",
          line2: "",
          city: "Manteo",
          state: "NC",
          zip: "27954"
        },
        construction: 'wood',
        website: 'willywonka.com',
        apartments: []
      },
      {
        buildingID: 2,
        name: "Building 2",
        address: {
          id: 3,
          addressID: 3,
          line1: "Sailfish Dr.",
          line2: "",
          city: "Manteo",
          state: "NC",
          zip: "27954"
        },
        construction: 'wood',
        website: 'willywonka.com',
        apartments: []
      }
    ]
  },
  {
    id: 3,
    locationID: 3,
    locationName: "Awesome Avenue",
    address: {
      id: 4,
      addressID: 4,
      line1: "Sailfish Dr.",
      line2: "",
      city: "Manteo",
      state: "NC",
      zip: "27954"
    },
    buildings: [
      {
        buildingID: 1,
        name: "Building 1",
        address: {
          id: 5,
          addressID: 5,
          line1: "Awesome Avenue",
          line2: "",
          city: "Manteo",
          state: "NC",
          zip: "27955"
        },
        construction: 'wood',
        website: 'willywonka.com',
        apartments: []
      }
    ]
  }
];