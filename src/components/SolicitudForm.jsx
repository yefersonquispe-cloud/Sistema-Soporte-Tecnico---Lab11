import { useState } from "react";
import { Button } from "@/components/ui/button";

function SolicitudForm({ onAgregarSolicitud }) {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [solicitante, setSolicitante] = useState("");
  const [prioridad, setPrioridad] = useState("Media");
  const [errores, setErrores] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = {};
    if (!titulo.trim()) nuevosErrores.titulo = "Ingresa el título de la solicitud.";
    if (!descripcion.trim()) nuevosErrores.descripcion = "Ingresa una descripción del problema.";

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) return;

    onAgregarSolicitud({ titulo, descripcion, solicitante, prioridad });
    setTitulo(""); setDescripcion(""); setSolicitante(""); setPrioridad("Media"); setErrores({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Título de la solicitud</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ej. Problema con mi computadora" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500" />
        {errores.titulo && <p className="mt-1 text-sm text-red-500">{errores.titulo}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Descripción</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Describe el problema..." rows="4" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500" />
        {errores.descripcion && <p className="mt-1 text-sm text-red-500">{errores.descripcion}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Nombre del solicitante</label>
        <input type="text" value={solicitante} onChange={(e) => setSolicitante(e.target.value)} placeholder="Ingresa tu nombre" className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Prioridad</label>
        <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)} className="w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-blue-500">
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
      </div>

      <Button type="submit" className="w-full">Registrar solicitud</Button>
    </form>
  );
}

export default SolicitudForm;