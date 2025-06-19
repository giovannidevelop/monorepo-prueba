import React, { useState, useEffect } from "react";
import UbicacionForm from "../components/ubicacion/UbicacionForm";
import { emptyUbicacion } from "../components/ubicacion/models/ubicacionTypes";
import { guardarUbicacion, listarUbicaciones } from "../components/ubicacion/services/ubicacionService";

function Home() {
  const [ubicacion, setUbicacion] = useState(emptyUbicacion);
  const [lista, setLista] = useState([]);

  useEffect(() => {
    cargarUbicaciones();
  }, []);

  const handleUbicacionChange = (nuevaUbicacion) => {
    setUbicacion(nuevaUbicacion);
  };

  const cargarUbicaciones = async () => {
    const data = await listarUbicaciones();
    setLista(data);
  };

  const handleGuardar = async () => {
    try {
      await guardarUbicacion(ubicacion);
      await cargarUbicaciones();
      alert("Ubicación guardada");
    } catch (err) {
      alert("Error al guardar");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Formulario de Ubicación</h1>
      <UbicacionForm ubicacion={ubicacion} onChange={handleUbicacionChange} />

      <button onClick={handleGuardar} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Guardar ubicación
      </button>

      <h2 className="text-xl font-semibold mt-8">Ubicaciones guardadas</h2>
      <ul className="mt-2 space-y-2">
        {lista.map((u, i) => (
          <li key={i} className="border p-3 rounded bg-gray-50">
            {u.calle} #{u.numero}, {u.comuna?.nombre} ({u.latitud}, {u.longitud})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
