import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filter";

const FilterOrigin = () => {
  const { result, loading }: FilterTypes = useGetProductField();

  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Origin</p>
      {loading && result === null && <p>Cargando origen...</p>}

      <RadioGroup>
        {result !== null &&
          result.schema.attributes.origin.enum.map((origin: string) => (
            <div className="flex items-center space-x-2" key={origin}>
              <RadioGroupItem value={origin} id={origin} />
              <Label htmlFor={origin}>{origin}</Label>
            </div>
          ))}
      </RadioGroup>
    </div>
  );
};

export default FilterOrigin;
