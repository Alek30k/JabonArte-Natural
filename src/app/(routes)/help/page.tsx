export default function HelpPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Centro de Ayuda</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Preguntas Frecuentes</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• ¿Cómo realizar un pedido?</li>
              <li>• ¿Cuáles son los métodos de pago?</li>
              <li>• ¿Cuánto demora el envío?</li>
              <li>• ¿Cómo cuidar los jabones naturales?</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Contacto</h2>
            <div className="space-y-2 text-gray-600">
              <p>📧 hola@jabonartenatural.com</p>
              <p>📱 +54 11 1234-5678</p>
              <p>🕒 Lun - Vie: 9:00 - 18:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
