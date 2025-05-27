import EnvironmentChecker from "../components/EnvironmentChecker";
import ProductionImageTest from "../components/ProductionImageTest";

export default function TestEnvPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          🧪 Test de Entorno y Variables
        </h1>

        <div className="space-y-8">
          <EnvironmentChecker />
          <ProductionImageTest />
        </div>
      </div>
    </div>
  );
}
