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

export const dataType = [{
  name: 'noaa',
  displayName: 'NOAA'
},{
  name: 'era5',
  displayName: 'ERA5'
}] as const;
export const spatial = [{
  name: 'quarter',
  displayName: '≥25%'
},{
  name: 'half',
  displayName: '≥50%'
}] as const;
export const windSpeed = [{
  name: 'near_gale',
  displayName: 'Near Gale (≥28kts)'
},{
  name: 'gale',
  displayName: 'Gale (≥34kts)'
},{
  name: 'storm',
  displayName: 'Storm (≥48kts)'
}] as const;
export const timeFrame = [{
  name: 'annual',
  displayName: 'Annual'
},{
  name: 'spring',
  displayName: 'Spring'
},{
  name: 'summer',
  displayName: 'Summer'
},{
  name: 'fall',
  displayName: 'Fall'
},{
  name: 'winter',
  displayName: 'Winter'
}] as const;