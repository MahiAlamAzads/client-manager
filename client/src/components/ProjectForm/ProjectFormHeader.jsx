const ProjectFormHeader = () => {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 mb-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <h3
            id="formTitle"
            className="text-sm sm:text-base font-bold text-white uppercase tracking-tight"
          >
            Create Project
          </h3>
        </div>
        <p id="formSubtitle" className="text-xs text-zinc-400 mt-0.5">
          Enter details to add a new project
        </p>
      </div>

      <span
        id="formModeBadge"
        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700"
      >
        New Entry
      </span>
    </div>
  );
};

export default ProjectFormHeader;
