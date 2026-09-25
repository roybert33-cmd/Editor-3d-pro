import { ResinPreset, PrintEstimation } from '../types/printer';

export function estimatePrintParameters(
  modelHeightZ: number,
  volumeMl: number,
  resin: ResinPreset
): PrintEstimation {
  if (modelHeightZ <= 0) {
    return {
      totalLayers: 0,
      totalTimeSeconds: 0,
      formattedTime: '0h 0m',
      resinVolumeMl: 0,
      resinWeightGrams: 0,
      cost: 0,
      layerHeightMm: resin.layerHeight,
    };
  }

  const layerHeight = Math.max(0.01, resin.layerHeight);
  const totalLayers = Math.max(1, Math.ceil(modelHeightZ / layerHeight));

  const bottomLayersCount = Math.min(totalLayers, resin.bottomLayers);
  const normalLayersCount = Math.max(0, totalLayers - bottomLayersCount);

  const bottomLiftTime = (resin.bottomLiftDistance / Math.max(1, resin.bottomLiftSpeed)) * 60;
  const bottomRetractTime = (resin.bottomLiftDistance / Math.max(1, resin.retractSpeed)) * 60;
  const bottomCycleTime = resin.bottomExposure + resin.lightOffDelay + bottomLiftTime + bottomRetractTime;

  const normalLiftTime = (resin.liftDistance / Math.max(1, resin.liftSpeed)) * 60;
  const normalRetractTime = (resin.liftDistance / Math.max(1, resin.retractSpeed)) * 60;
  const normalCycleTime = resin.normalExposure + resin.lightOffDelay + normalLiftTime + normalRetractTime;

  const totalTimeSeconds = Math.round(
    bottomLayersCount * bottomCycleTime + normalLayersCount * normalCycleTime
  );

  const hours = Math.floor(totalTimeSeconds / 3600);
  const minutes = Math.floor((totalTimeSeconds % 3600) / 60);
  const formattedTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes} min`;

  const totalResinMl = Math.round(volumeMl * 1.08 * 10) / 10;
  const resinWeightGrams = Math.round(totalResinMl * resin.density * 10) / 10;
  const cost = Math.round((totalResinMl / 1000) * resin.costPerLiter * 100) / 100;

  return {
    totalLayers,
    totalTimeSeconds,
    formattedTime,
    resinVolumeMl: totalResinMl,
    resinWeightGrams,
    cost,
    layerHeightMm: resin.layerHeight,
  };
}
