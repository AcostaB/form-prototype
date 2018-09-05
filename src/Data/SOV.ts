export const data = [
  {
    id: 1,
    locationID: 1,
    locationName: "Sailfish Dr.",
    address: {
      id: 1,
      line1: "Sailfish Dr.",
      line2: "",
      city: "Manteo",
      state: "NC",
      zip: 27954
    },
    buildings: [
      {
        id: 1,
        buildingID: 1,
        buildingName: "Building 1",
        streetNumber: 100,
        address: {
          id: 2,
          line1: "Sailfish Dr.",
          line2: "",
          city: "Manteo",
          state: "NC",
          zip: 27954
        },
        isPropertyWithin1000FeetOfWater: true,
        numberOfBuildings: 1,
        isoConstructionCode: "2 - JM",
        numberOfStories: 5,
        originallyBuilt: 1999,
        wiring: 2004,
        plumbing: 2004,
        heating: 2004,
        totalTiv: 4334400,
        basement: "100 - Unknown",
        shapeOfRoof: "102 - Flat roof WITHOUT parapets"
      },
      {
        id: 2,
        buildingID: 2,
        buildingName: "Building 2",
        streetNumber: 200,
        address: {
          id: 3,
          line1: "Sailfish Dr.",
          line2: "",
          city: "Manteo",
          state: "NC",
          zip: 27954
        },
        isPropertyWithin1000FeetOfWater: true,
        numberOfBuildings: 1,
        isoConstructionCode: "6 - FRES",
        numberOfStories: 4,
        originallyBuilt: 1999,
        wiring: 2004,
        plumbing: 1995,
        heating: 1995,
        totalTiv: 1225000,
        basement: "101 - No Basement",
        shapeOfRoof: "110-Braced Gable med slope (10 deg to 26.5 deg)"
      }
    ]
  },
  {
    id: 3,
    locationID: 3,
    locationName: "Awesome Avenue",
    address: {
      id: 4,
      line1: "Sailfish Dr.",
      line2: "",
      city: "Manteo",
      state: "NC",
      zip: 27954
    },
    buildings: [
      {
        id: 5,
        buildingID: 1,
        buildingName: "Building 1",
        streetNumber: 300,
        address: {
          id: 5,
          line1: "Awesome Avenue",
          line2: "",
          city: "Manteo",
          state: "NC",
          zip: 27955
        },
        isPropertyWithin1000FeetOfWater: true,
        numberOfBuildings: 1,
        isoConstructionCode: "7 - HTJM",
        numberOfStories: 3,
        originallyBuilt: 2004,
        wiring: 2012,
        plumbing: 2044,
        heating: 2000,
        totalTiv: 942900,
        basement: "100 - Unknown",
        shapeOfRoof: "111-Braced Gable high slope (>26.5 deg)"
      }
    ]
  }
];