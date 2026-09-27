import { DropDownIcon } from "./Icon";

const FilterInput = ({ options, filterName, value, onChange }) => {
  const inputId = filterName.toLowerCase();
  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-[10px] font-medium text-zinc-400 mb-1"
      >
        {filterName}
      </label>
      <div className="relative">
        <select
          id={inputId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 focus:outline-none focus:border-zinc-500 transition-all appearance-none cursor-pointer"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <DropDownIcon />
      </div>
    </div>
  );
};

export default FilterInput;
