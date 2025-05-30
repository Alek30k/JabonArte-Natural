export async function calcularCostoEnvio({ pesoTotal, codigoPostal }) {
  try {
    const response = await fetch(`${process.env.OCA_API_URL}/calcular-envio`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OCA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        peso: pesoTotal, // Peso total en kg
        codigoPostalDestino: codigoPostal, // Código postal del cliente
        codigoPostalOrigen: "3600", // Código postal de Formosa, ajusta según corresponda
      }),
    });

    if (!response.ok) {
      throw new Error("Error al calcular el costo de envío");
    }

    const data = await response.json();
    return data.costo; // Suponemos que la API devuelve un campo "costo"
  } catch (error) {
    console.error("Error en la API de OCA:", error);
    return null; // Retornamos null para manejar el error en la UI
  }
}
