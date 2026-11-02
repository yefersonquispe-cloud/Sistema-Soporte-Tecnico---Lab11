import { Button } from "@/components/ui/button";

function FiltrosSolicitudes({ filtroActual, onCambiarFiltro }) {
  const filtros = ["Todas", "Pendiente", "En proceso", "Resuelta"];

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {filtros.map((filtro) => (
        <Button key={filtro} size="sm" variant={filtroActual === filtro ? "default" : "outline"} onClick={() => onCambiarFiltro(filtro)}>
          {filtro === "Todas" ? "Todas" : filtro === "Pendiente" ? "Pendientes" : filtro === "Resuelta" ? "Resueltas" : filtro}
        </Button>
      ))}
    </div>
  );
}

export default FiltrosSolicitudes;