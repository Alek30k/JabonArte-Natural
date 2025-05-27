// import FeaturedProductsPublic from "../../components/FeaturedProductsPublic"
// import CloudinaryTestFixed from "../../components/CloudinaryTestFixed"

import CloudinaryTestFixed from "@/components/CloudinaryTestFixed";
import FeaturedProductsPublic from "@/components/FeaturedProductsPublic";

export default function DebugProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          🔍 Debug de Productos
        </h1>

        <div className="space-y-8">
          <CloudinaryTestFixed />

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Productos (API Pública)</h2>
            <FeaturedProductsPublic />
          </div>
        </div>
      </div>
    </div>
  );
}
