import { Location } from '../Models/Location'

export const data: Location[] = [
  {
    id: 1,
    locationNum: 1,
    locationName: "Sailfish Dr.",
    address: {
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
    locationNum: 3,
    locationName: "Awesome Avenue",
    address: {
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