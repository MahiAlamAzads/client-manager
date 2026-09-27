const ProjectNotFound = () => {
  return (
    <div
      id="notFoundState"
      className="hidden bg-[#121215] border border-zinc-800 border-dashed rounded-2xl p-8 sm:p-12 text-center space-y-3"
    >
      <img
        src="assets/empty-state.svg"
        alt="No Projects Found"
        className="w-36 sm:w-48 h-auto mx-auto opacity-90"
      />
      <div className="max-w-md mx-auto space-y-1">
        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
          No Matching Projects
        </h4>
        <p className="text-xs text-zinc-400">
          No projects match your current search or filter. Try adjusting terms
          or resetting.
        </p>
      </div>
      <div className="pt-2 flex items-center justify-center gap-2">
        <button
          onClick="resetAllFilters()"
          className="px-3.5 py-2 text-xs font-medium rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 shadow-sm transition-all cursor-pointer font-semibold"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default ProjectNotFound;
