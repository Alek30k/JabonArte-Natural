import { useGetProductField } from "@/api/getProductField";
import { RadioGroup } from "@/components/ui/radio-group";

const FilterOrigin = () => {
  const { result, loading } = useGetProductField();

  console.log(result);

  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Origin</p>
      {loading && result === null && <p>Cargando origen...</p>}

      <RadioGroup></RadioGroup>
    </div>
  );
};

export default FilterOrigin;
