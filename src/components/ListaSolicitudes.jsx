import SolicitudItem from "./SolicitudItem";

function ListaSolicitudes({ solicitudes, onCambiarEstado, onEliminar }) {
  return (
    <div className="space-y-3">
      {solicitudes.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">No hay solicitudes para mostrar.</p>
      ) : (
        solicitudes.map((solicitud) => (
          <SolicitudItem key={solicitud.id} solicitud={solicitud} onCambiarEstado={() => onCambiarEstado(solicitud.id)} onEliminar={() => onEliminar(solicitud.id)} />
        ))
      )}
    </div>
  );
}

export default ListaSolicitudes