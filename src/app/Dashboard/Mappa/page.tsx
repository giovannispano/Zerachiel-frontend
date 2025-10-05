import Map from "@/components/map";

export default function Mappa() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Mappa del Cimitero
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Esplora le tombe, le richieste e i punti di interesse. Clicca sui
            marker per maggiori informazioni.
          </p>
        </header>

        <section className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Mappa interattiva</h2>
          </div>

          <div className="p-4">
            <div className="h-[60vh] rounded-xl overflow-hidden border border-slate-100">
              <Map />
            </div>
          </div>

          <div className="p-4 border-t flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Usa gli strumenti a destra per navigare la mappa
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-slate-100 text-slate-700 text-sm">
                Zoom +
              </button>
              <button className="px-3 py-1 rounded bg-slate-100 text-slate-700 text-sm">
                Zoom −
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
