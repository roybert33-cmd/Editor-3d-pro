import { useMemo, useState } from 'react';
import { Box, Clock3, Layers3, Printer, RotateCcw, Weight } from 'lucide-react';
import { HALOT_R6_SPECS, RESIN_PRESETS } from './types/printer';
import { estimatePrintParameters } from './utils/printEstimator';

function App() {
  const [height, setHeight] = useState(20);
  const [volume, setVolume] = useState(12);
  const [resinId, setResinId] = useState(RESIN_PRESETS[0].id);

  const resin = RESIN_PRESETS.find((preset) => preset.id === resinId) ?? RESIN_PRESETS[0];
  const estimate = useMemo(
    () => estimatePrintParameters(height, volume, resin),
    [height, volume, resin],
  );

  const reset = () => {
    setHeight(20);
    setVolume(12);
    setResinId(RESIN_PRESETS[0].id);
  };

  return (
    <main className="min-h-screen overflow-auto bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
              3D Print Studio
            </p>
            <h1 className="text-2xl font-bold text-white">Creality HALOT R6</h1>
          </div>
          <div className="hidden items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm text-slate-300 sm:flex">
            <Printer className="h-4 w-4 text-cyan-400" />
            {HALOT_R6_SPECS.width} × {HALOT_R6_SPECS.depth} × {HALOT_R6_SPECS.height} mm
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 p-6 lg:grid-cols-[1fr_1.4fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Parámetros del modelo</h2>
              <p className="mt-1 text-sm text-slate-400">Introduce valores para estimar tu impresión.</p>
            </div>
            <Box className="h-6 w-6 text-cyan-400" />
          </div>

          <div className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Altura del modelo (mm)</span>
              <input
                type="number"
                min="0"
                step="0.1"
                value={height}
                onChange={(event) => setHeight(Math.max(0, Number(event.target.value)))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Volumen de resina (ml)</span>
              <input
                type="number"
                min="0"
                step="0.1"
                value={volume}
                onChange={(event) => setVolume(Math.max(0, Number(event.target.value)))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-300">Tipo de resina</span>
              <select
                value={resin.id}
                onChange={(event) => setResinId(event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500"
              >
                {RESIN_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.name}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={reset}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-500 hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
              Restablecer valores
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">Estimación de impresión</h2>
            <p className="mt-1 text-sm text-slate-400">Calculada con una altura de capa de {resin.layerHeight} mm.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Metric icon={<Clock3 />} label="Tiempo estimado" value={estimate.formattedTime} />
            <Metric icon={<Layers3 />} label="Capas totales" value={estimate.totalLayers.toLocaleString('es-ES')} />
            <Metric icon={<Weight />} label="Peso de resina" value={`${estimate.resinWeightGrams.toFixed(1)} g`} />
            <Metric icon={<Box />} label="Resina con margen" value={`${estimate.resinVolumeMl.toFixed(1)} ml`} />
          </div>

          <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
            <p className="text-sm text-slate-300">Coste estimado</p>
            <p className="mt-1 text-3xl font-bold text-cyan-300">${estimate.cost.toFixed(2)}</p>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              Esta es una estimación orientativa. El tiempo real puede variar según las pausas,
              aceleraciones y la configuración del firmware.
            </p>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-5 text-sm text-slate-400">
            <p className="font-medium text-slate-300">Volumen de impresión</p>
            <p className="mt-1">{HALOT_R6_SPECS.width} × {HALOT_R6_SPECS.depth} × {HALOT_R6_SPECS.height} mm</p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <div className="mb-3 flex items-center gap-2 text-cyan-400">{icon}</div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-white">{value}</p>
    </div>
  );
}

export default App;
