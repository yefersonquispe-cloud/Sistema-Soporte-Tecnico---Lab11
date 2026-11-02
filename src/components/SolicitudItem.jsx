import { Button } from "@/components/ui/button";

function SolicitudItem({ solicitud, onCambiarEstado, onEliminar }) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{solicitud.titulo}</h3>
          <p className="mt-1 text-sm text-slate-500">{solicitud.descripcion}</p>
          <p className="mt-2 text-sm">Solicitante: {solicitud.solicitante}</p>
        </div>
        <span className="rounded-lg bg-blue-50 px-3 py-1 text-sm text-blue-600">{solicitud.prioridad}</span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium">{solicitud.estado}</span>
        <div className="flex gap-2">
          <Button size="sm" onClick={onCambiarEstado}>Cambiar estado</Button>
          <Button size="sm" variant="destructive" onClick={onEliminar}>Eliminar</Button>
        </div>
      </div>
    </div>
  );
}

export default SolicitudItem;