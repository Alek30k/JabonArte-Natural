// import ApiDataInspector from "../../components/ApiDataInspector"

import ApiDataInspector from "../components/ApiDataInspector";

export default function DebugApiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          🔍 Debug de API - Producto Cacao
        </h1>
        <ApiDataInspector />
      </div>
    </div>
  );
}
