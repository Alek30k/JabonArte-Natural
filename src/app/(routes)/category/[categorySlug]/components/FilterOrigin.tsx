import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filter";

type FilterOriginProps = {
  setFilterOrigin: (origin: string) => void;
};

const FilterOrigin = (props: FilterOriginProps) => {
  const { setFilterOrigin } = props;
  const { result, loading }: FilterTypes = useGetProductField();

  return (
    <div className="my-5 ">
      <p className="mb-3 font-bold">Origin</p>
      {loading && result === null && <p>Cargando origen...</p>}

      <RadioGroup
        onValueChange={(value) => setFilterOrigin(value)}
        className="cursor-pointer
      "
      >
        {result !== null &&
          result.schema.attributes.origin.enum.map((origin: string) => (
            <div
              className="flex items-center gap-2 p-2 space-x-2 cursor-pointer"
              key={origin}
            >
              <RadioGroupItem value={origin} id={origin} className="p-2" />
              <Label htmlFor={origin}>{origin}</Label>
            </div>
          ))}
      </RadioGroup>
    </div>
  );
};

export default FilterOrigin;
