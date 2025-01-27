export const regions = [
  {
    name: "Eastern Gulf of Maine",
    // bounds: [[25.06,-94.68],[39.46,-75.62]],
    labelLocation: [685, 425],
    color: '#FF4600'
  },
  {
    name: "Western Gulf of Maine",
    // bounds: [[31.31,-124.43],[42.02,-102.0]],
    labelLocation: [200, 325],
    color: '#FFEE00'
  },
  {
    name: "Georges Bank",
    // bounds: [[35.96,-97.25],[49.40,-80.49]],
    labelLocation: [625, 265],
    color: '#3FFF61'
  },
  {
    name: "Northern Mid-Atlantic Bight",
    // bounds: [[39.91,-116.09],[49.02,-95.28]],
    labelLocation: [375, 175],
    color: '#01C9F8'
  },
  {
    name: "Southern Mid-Atlantic Bight",
    // bounds: [[25.81,-106.51],[40.02,-93.45]],
    labelLocation: [445, 425],
    color: '#0B5DC1'
  }
] as const;

export type RegionsObj = typeof regions;
export type Regions = typeof regions[number]['name'];
export type Colors = typeof regions[number]['color'];
