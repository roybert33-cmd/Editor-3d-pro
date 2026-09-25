export interface PrinterSpecs {
  id: string;
  name: string;
  brand: string;
  technology: 'MSLA' | 'LCD';
  width: number; // mm (X)
  depth: number; // mm (Y)
  height: number; // mm (Z)
  xyResolution: number; // micrones (ej. 50 um)
  wavelength: number; // nm (405nm)
  lcdSize: string;
  lcdResolution: string;
  description: string;
}

export const HALOT_R6_SPECS: PrinterSpecs = {
  id: 'creality-halot-r6',
  name: 'Creality HALOT R6',
  brand: 'Creality',
  technology: 'MSLA',
  width: 130, // mm
  depth: 82,  // mm
  height: 160, // mm
  xyResolution: 50,
  wavelength: 405,
  lcdSize: '6.08" Monocromo 2K',
  lcdResolution: '1620 × 2560 px',
  description: 'Impresora 3D de resina de precisión con fuente de luz integral Creality, eje Z de alta estabilidad y volumen 130×82×160 mm.',
};

export interface ResinPreset {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  opacity: number;
  roughness: number;
  layerHeight: number; // mm
  bottomLayers: number;
  bottomExposure: number; // s
  normalExposure: number; // s
  lightOffDelay: number;
  bottomLiftDistance: number;
  bottomLiftSpeed: number;
  liftDistance: number;
  liftSpeed: number;
  retractSpeed: number;
  density: number; // g/cm³
  costPerLiter: number;
}

export const RESIN_PRESETS: ResinPreset[] = [
  {
    id: 'creality-standard-grey',
    name: 'Creality Resina Estándar Gris',
    colorName: 'Gris Mate',
    colorHex: '#808894',
    opacity: 0.98,
    roughness: 0.35,
    layerHeight: 0.05,
    bottomLayers: 5,
    bottomExposure: 32,
    normalExposure: 2.3,
    lightOffDelay: 1.0,
    bottomLiftDistance: 6,
    bottomLiftSpeed: 50,
    liftDistance: 6,
    liftSpeed: 90,
    retractSpeed: 150,
    density: 1.15,
    costPerLiter: 28,
  },
  {
    id: 'creality-water-washable',
    name: 'Creality Lavable al Agua',
    colorName: 'Azul Aguamarina',
    colorHex: '#0ea5e9',
    opacity: 0.92,
    roughness: 0.25,
    layerHeight: 0.05,
    bottomLayers: 6,
    bottomExposure: 35,
    normalExposure: 2.5,
    lightOffDelay: 1.5,
    bottomLiftDistance: 7,
    bottomLiftSpeed: 45,
    liftDistance: 6,
    liftSpeed: 80,
    retractSpeed: 140,
    density: 1.16,
    costPerLiter: 34,
  }
];

export interface ModelMetrics {
  name: string;
  dimensions: { x: number; y: number; z: number };
  volumeCm3: number;
  triangles: number;
  vertices: number;
  isOutOfBounds: boolean;
  exceedsX: boolean;
  exceedsY: boolean;
  exceedsZ: boolean;
  belowBed: boolean;
  overflow?: { x: number; y: number; z: number };
  warnings: string[];
}

export interface PrintEstimation {
  totalLayers: number;
  totalTimeSeconds: number;
  formattedTime: string;
  resinVolumeMl: number;
  resinWeightGrams: number;
  cost: number;
  layerHeightMm: number;
}
