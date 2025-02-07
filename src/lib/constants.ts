export const regions = [
  {
    name: "Eastern Gulf of Maine",
    labelLocation: [-65.35, 35.55],
    color: '#FF4600',
    map: 'north'
  },
  {
    name: "Western Gulf of Maine",
    labelLocation: [-72.5, 36.2],
    color: '#FFEE00',
    map: 'north'
  },
  {
    name: "Georges Bank",
    labelLocation: [-66.5, 40.00],
    color: '#3FFF61',
    map: 'north'
  },
  {
    name: "Northern Mid-Atlantic Bight",
    labelLocation: [-70.2, 41.0],
    color: '#01C9F8',
    map: 'north'
  },
  {
    name: "Southern Mid-Atlantic Bight",
    labelLocation: [-72.5, 42.95],
    color: '#0B5DC1',
    map: 'north'
  },
  {
    name: "Northern South Atlantic",
    labelLocation: [-83, 25.25],
    color: '#008000',
    map: 'south'
  },
  {
    name: "Eastern Florida",
    labelLocation: [-76, 34.75],
    color: '#8f1aef',
    map: 'south'
  },
  {
    name: "Gulf",
    labelLocation: [-90, 36.25],
    color: '#c91212',
    map: 'south'
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