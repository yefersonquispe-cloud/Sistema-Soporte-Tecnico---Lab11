import "./App.css";
import { useState } from "react";
import { Headset, ClipboardList, Clock3, CheckCircle2, Plus, Search, Activity, Ticket } from "lucide-react";
import SolicitudForm from "./components/SolicitudForm";
import ListaSolicitudes from "./components/ListaSolicitudes";
import FiltrosSolicitudes from "./components/FiltrosSolicitudes";

const pasos = ["Registrada", "En proceso", "Resuelta"];
const nivelPorEstado = { "Pendiente": 1, "En proceso": 2, "Resuelta": 3 };
const claseEstado = { "Pendiente": "est-pending", "En proceso": "est-progress", "Resuelta": "est-completed" };
const opcionesEstado = ["Pendiente", "En proceso", "Resuelta"];

function App() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [filtroActual, setFiltroActual] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");

  const agregarSolicitud = (datos) => {
    const nuevaSolicitud = { ...datos, id: Date.now(), estado: "Pendiente" };
    setSolicitudes((prev) => [...prev, nuevaSolicitud]);
  };
  const cambiarEstado = (id) => {
    setSolicitudes((prev) => prev.map((s) => s.id === id ? { ...s, estado: s.estado === "Pendiente" ? "En proceso" : s.estado === "En proceso" ? "Resuelta" : "Pendiente" } : s));
  };
  const establecerEstado = (id, nuevoEstado) => {
    setSolicitudes((prev) => prev.map((s) => s.id === id ? { ...s, estado: nuevoEstado } : s));
  };
  const eliminarSolicitud = (id) => {
    setSolicitudes((prev) => prev.filter((s) => s.id !== id));
  };
  const solicitudesFiltradas = solicitudes.filter((s) => {
    const coincideFiltro = filtroActual === "Todas" || s.estado === filtroActual;
    const coincideBusqueda = `${s.titulo} ${s.descripcion} ${s.solicitante}`.toLowerCase().includes(busqueda.toLowerCase());
    return coincideFiltro && coincideBusqueda;
  });

  const pendientes = solicitudes.filter((s) => s.estado === "Pendiente").length;
  const enProceso = solicitudes.filter((s) => s.estado === "En proceso").length;
  const resueltas = solicitudes.filter((s) => s.estado === "Resuelta").length;
  const total = solicitudes.length;
  const porcentaje = (cantidad) => total === 0 ? 0 : (cantidad / total) * 100;
  const hoy = new Date().toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" });
  const estadisticas = [
    { clase: "stat-pending", numero: "01", titulo: "Pendientes", detalle: "Solicitudes por atender", cantidad: pendientes, Icono: Clock3 },
    { clase: "stat-progress", numero: "02", titulo: "En proceso", detalle: "Solicitudes en atención", cantidad: enProceso, Icono: Activity },
    { clase: "stat-completed", numero: "03", titulo: "Resueltas", detalle: "Solicitudes finalizadas", cantidad: resueltas, Icono: CheckCircle2 },
  ];

  return (
    <div className="app-shell">
      <header className="masthead">
        <div className="masthead-inner">
          <div className="brand">
            <div className="brand-icon"><Headset size={26} strokeWidth={1.75} /></div>
            <div>
              <p className="brand-label">Centro de operaciones</p>
              <h1>Sistema de <em>Soporte Técnico</em></h1>
              <p className="brand-description">Gestión y seguimiento de solicitudes de asistencia.</p>
            </div>
          </div>
          <div className="masthead-side">
            <span className="masthead-date">{hoy}</span>
            <div className="system-status"><span></span> Sistema operativo</div>
          </div>
        </div>
      </header>

      <main className="dashboard">
        <section className="welcome-section">
          <div>
            <p className="section-eyebrow">Panel de control</p>
            <h2>Resumen general</h2>
            <p>Consulta el estado actual de las solicitudes de soporte técnico.</p>
          </div>
          <div className="total-indicator"><Ticket size={18} /><span>{total} solicitudes registradas</span></div>
        </section>

        <section className="stats-grid">
          {estadisticas.map(({ clase, numero, titulo, detalle, cantidad, Icono }) => (
            <article key={titulo} className={`stat-card ${clase}`}>
              <div className="stat-top"><span className="stat-num">N.º {numero}</span><span className="stat-icon"><Icono size={17} /></span></div>
              <div className="stat-main">
                <div className="stat-value">{cantidad}</div>
                <div className="stat-pct">{Math.round(porcentaje(cantidad))}<small>%</small></div>
              </div>
              <h4 className="stat-title">{titulo}</h4>
              <p>{detalle}</p>
              <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${porcentaje(cantidad)}%` }}></div></div>
              <div className="stat-bar-meta"><span>{cantidad} de {total}</span><span>del total</span></div>
            </article>
          ))}
        </section>

        <section className="workspace">
          <aside className="form-panel">
            <div className="panel-heading">
              <div className="panel-icon"><Plus size={21} /></div>
              <div><span className="panel-eyebrow">Nuevo registro</span><h3>Registrar solicitud</h3><p>Completa los datos del requerimiento.</p></div>
            </div>
            <div className="support-form">
              <SolicitudForm onAgregarSolicitud={agregarSolicitud} />
            </div>
            <div className="form-note"><CheckCircle2 size={16} /><span>Los campos obligatorios serán validados antes del registro.</span></div>
          </aside>

          <section className="requests-panel">
            <div className="panel-heading requests-heading">
              <div className="panel-icon"><ClipboardList size={21} /></div>
              <div><span className="panel-eyebrow">Administración</span><h3>Solicitudes de soporte</h3><p>Consulta, filtra y administra los requerimientos.</p></div>
              <div className="requests-count">{solicitudesFiltradas.length} / {total}</div>
            </div>

            <div className="search-box">
              <Search size={18} />
              <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar por título, descripción o solicitante..." />
            </div>

            <div className="filters-wrapper">
              <FiltrosSolicitudes filtroActual={filtroActual} onCambiarFiltro={setFiltroActual} />
            </div>

            <div className="support-list">
              {solicitudesFiltradas.length === 0 ? (
                <ListaSolicitudes solicitudes={[]} onCambiarEstado={cambiarEstado} onEliminar={eliminarSolicitud} />
              ) : (
                <div className="solicitudes-stack">
                  {solicitudesFiltradas.map((s) => {
                    const nivel = nivelPorEstado[s.estado] || 1;
                    return (
                      <div key={s.id} className={`solicitud-item ${claseEstado[s.estado] || "est-pending"}`}>
                        <ListaSolicitudes solicitudes={[s]} onCambiarEstado={cambiarEstado} onEliminar={eliminarSolicitud} />
                        <div className="estado-barra">
                          <div className="estado-info">
                            <div className="estado-segmentos">
                              {pasos.map((p, i) => <span key={p} className={i < nivel ? "seg seg-on" : "seg"}></span>)}
                            </div>
                            <div className="estado-etiquetas">
                              {pasos.map((p, i) => <span key={p} className={i === nivel - 1 ? "etq etq-actual" : "etq"}>{p}</span>)}
                            </div>
                          </div>
                          <label className="estado-selector">
                            <span>Cambiar estado</span>
                            <select value={s.estado} onChange={(e) => establecerEstado(s.id, e.target.value)}>
                              {opcionesEstado.map((o) => <option key={o} value={o}>{o}</option>)}
                            </select>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        </section>

        <footer className="dashboard-footer">
          <span>SOPORTE TÉCNICO</span>
          <span>Panel de administración de solicitudes</span>
        </footer>
      </main>
    </div>
  );
}

export default App;