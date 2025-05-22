import FilterOrigin from "./FilterOrigin";

type FiltersControlsCategoryProps = {
  setFilterOrigin: (origin: string) => void;
};

const FiltersControlsCategory = (props: FiltersControlsCategoryProps) => {
  const { setFilterOrigin } = props;
  return (
    <div className="sm:w-[350px] sm:mt-5">
      <FilterOrigin setFilterOrigin={setFilterOrigin} />
    </div>
  );
};

export default FiltersControlsCategory;
