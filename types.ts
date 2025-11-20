export enum ScreenState {
  COURTYARD = 'COURTYARD',
  ETCHING = 'ETCHING',
  OVERGROWTH = 'OVERGROWTH',
  ECHO = 'ECHO'
}

export enum Weather {
  SUN = 'Sun',
  CLOUD = 'Cloud',
  RAIN = 'Rain',
  STORM = 'Storm'
}

export interface StoneData {
  id: string;
  worry: string;
  insight: string;
  timestamp: number;
  weather: Weather;
  shapePolygon: string; // CSS border-radius string
  rotation: number;     // Random rotation for organic feel
  offsetY: number;      // Random vertical offset for staggering
  offsetX: number;      // Random horizontal offset for scattering
}