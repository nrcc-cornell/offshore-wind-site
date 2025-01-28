export const regions = [
  {
    name: "Eastern Gulf of Maine",
    labelLocation: [-64.25, 35.75],
    color: '#FF4600'
  },
  {
    name: "Western Gulf of Maine",
    labelLocation: [-72, 35.75],
    color: '#FFEE00'
  },
  {
    name: "Georges Bank",
    labelLocation: [-65.5, 39.75],
    color: '#3FFF61'
  },
  {
    name: "Northern Mid-Atlantic Bight",
    labelLocation: [-70.5, 41.25],
    color: '#01C9F8'
  },
  {
    name: "Southern Mid-Atlantic Bight",
    labelLocation: [-73, 43.25],
    color: '#0B5DC1'
  }
] as const;

export type RegionsObj = typeof regions;
export type Regions = typeof regions[number]['name'];
export type Colors = typeof regions[number]['color'];
