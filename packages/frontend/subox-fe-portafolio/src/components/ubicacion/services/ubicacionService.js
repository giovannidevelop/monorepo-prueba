const API_BASE = "http://localhost:5000/api/ubicaciones"; // Cambia si tu backend usa otro puerto

export const obtenerRegiones = async () => {
  try {
    const res = await fetch(`${API_BASE}/regiones`);
    if (!res.ok) throw new Error("Error al obtener regiones");
    return await res.json();
  } catch (err) {
    console.error("obtenerRegiones:", err);
    return [];
  }
};

export const obtenerProvinciasPorRegion = async (regionId) => {
  try {
    const res = await fetch(`${API_BASE}/provincias?regionId=${regionId}`);
    if (!res.ok) throw new Error("Error al obtener provincias");
    return await res.json();
  } catch (err) {
    console.error("obtenerProvinciasPorRegion:", err);
    return [];
  }
};

export const obtenerComunasPorProvincia = async (provinciaId) => {
  try {
    const res = await fetch(`${API_BASE}/comunas?provinciaId=${provinciaId}`);
    if (!res.ok) throw new Error("Error al obtener comunas");
    return await res.json();
  } catch (err) {
    console.error("obtenerComunasPorProvincia:", err);
    return [];
  }
};

export const guardarUbicacion = async (ubicacion) => {
  try {
    const res = await fetch(`${API_BASE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ubicacion)
    });
    if (!res.ok) throw new Error("Error al guardar ubicación");
    return await res.json();
  } catch (err) {
    console.error("guardarUbicacion:", err);
    throw err;
  }
};

export const listarUbicaciones = async () => {
  try {
    const res = await fetch(`${API_BASE}`);
    if (!res.ok) throw new Error("Error al obtener ubicaciones");
    return await res.json();
  } catch (err) {
    console.error("listarUbicaciones:", err);
    return [];
  }
};