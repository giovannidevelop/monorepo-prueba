import React, { useEffect, useState } from "react";
import {
  obtenerRegiones,
  obtenerProvinciasPorRegion,
  obtenerComunasPorProvincia
} from "./services/ubicacionService";
import { emptyUbicacion } from "./models/ubicacionTypes";
import "./UbicacionForm.css";

const UbicacionForm = ({ ubicacion = emptyUbicacion, onChange }) => {
  const [regiones, setRegiones] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [local, setLocal] = useState(ubicacion);
  const [modo, setModo] = useState("manual"); // "manual" o "mapa"
  const [pasoManual, setPasoManual] = useState(1); // Paso 1 o 2

  useEffect(() => {
    obtenerRegiones().then(setRegiones);
  }, []);

  useEffect(() => {
    if (local.regionId) {
      obtenerProvinciasPorRegion(local.regionId).then(setProvincias);
    } else {
      setProvincias([]);
    }
    setLocal(prev => ({ ...prev, provinciaId: '', comunaId: '' }));
    setComunas([]);
  }, [local.regionId]);

  useEffect(() => {
    if (local.provinciaId) {
      obtenerComunasPorProvincia(local.provinciaId).then(setComunas);
    } else {
      setComunas([]);
    }
    setLocal(prev => ({ ...prev, comunaId: '' }));
  }, [local.provinciaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...local, [name]: value };
    setLocal(updated);
    onChange(updated);
  };

  const handleModoChange = (e) => {
    setModo(e.target.value);
    setPasoManual(1);
  };

  const puedePasarASegundoPaso = local.regionId && local.provinciaId && local.comunaId;

  return (
    <div className="ubicacion-form">
      <div className="opciones-ubicacion">
        <label>¿Cómo deseas ingresar la ubicación?</label>
        <select value={modo} onChange={handleModoChange}>
          <option value="manual">Ingresar manualmente</option>
          <option value="mapa">Ubicar en mapa</option>
        </select>
      </div>

      {modo === "manual" && (
        <>
          {pasoManual === 1 && (
            <div className="ubicacion-container-one">
              <div>
                <label>Región</label>
                <select name="regionId" value={local.regionId} onChange={handleChange}>
                  <option value="">Seleccione una región</option>
                  {regiones.map(r => (
                    <option key={r.id} value={r.id}>{r.nombre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Provincia</label>
                <select name="provinciaId" value={local.provinciaId} onChange={handleChange}>
                  <option value="">Seleccione una provincia</option>
                  {provincias.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </div>

              <div>
                <label>Comuna</label>
                <select name="comunaId" value={local.comunaId} onChange={handleChange}>
                  <option value="">Seleccione una comuna</option>
                  {comunas.map(c => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>

              {puedePasarASegundoPaso && (
                <button onClick={() => setPasoManual(2)}>Siguiente</button>
              )}
            </div>
          )}

          {pasoManual === 2 && (
            <div className="ubicacion-detalles">
              <div>
                <label>Calle</label>
                <input name="calle" value={local.calle} onChange={handleChange} />
              </div>

              <div>
                <label>Número</label>
                <input name="numero" value={local.numero} onChange={handleChange} />
              </div>

              <div>
                <label>Departamento</label>
                <input name="departamento" value={local.departamento} onChange={handleChange} />
              </div>

              <div>
                <label>Referencia</label>
                <input name="referencia" value={local.referencia} onChange={handleChange} />
              </div>

              <div>
                <label>Código Postal</label>
                <input name="codigoPostal" value={local.codigoPostal} onChange={handleChange} />
              </div>

              <button onClick={() => setPasoManual(1)}>Volver</button>
            </div>
          )}
        </>
      )}

      {modo === "mapa" && (
        <div className="mapa-placeholder">
          <p>[ Aquí iría el componente del mapa ]</p>
          <p>Puedes usar una API como Leaflet o Google Maps para geolocalización.</p>
        </div>
      )}
    </div>
  );
};

export default UbicacionForm;
