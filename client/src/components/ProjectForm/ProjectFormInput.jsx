const ProjectFormInput = ({
  type,
  label,
  field,
  placeholder,
  data,
  setData,
  warning,
  setWarning,
}) => {
  return (
    <div>
      <label
        htmlFor={field}
        className="block text-xs font-medium text-zinc-300 mb-1"
      >
        {label} <span className="text-rose-400">*</span>
      </label>
      <input
        type={type}
        id={field}
        value={data[field]}
        placeholder={placeholder}
        onChange={(e) => {
          setData({
            ...data,
            [field]: e.target.value,
          });
          if (e.target.value.trim() === "") {
            setWarning((prev) => ({
              ...prev,
              [field]: true,
            }));
          } else {
            setWarning((prev) => ({
              ...prev,
              [field]: false,
            }));
          }
        }}
        className="w-full px-3 py-2 sm:py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all"
        required
      />
      <p
        id="errorProjectName"
        className={`${warning[field] ? "block" : "hidden"} text-[11px] text-rose-400 mt-1 flex items-center gap-1`}
      >
        <svg
          className="w-3.5 h-3.5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>{label} is required.</span>
      </p>
    </div>
  );
};

export default ProjectFormInput;
