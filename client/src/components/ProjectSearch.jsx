const ProjectSearch = ({
  searchQuery,
  setSearchQuery,
  projectCount,
  totalProjects,
}) => {
  const hasQuery = searchQuery.trim().length > 0;

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </span>
        <input
          type="text"
          id="searchProjects"
          placeholder="Search by project name or domain..."
          className="w-full pl-9 pr-8 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        {hasQuery && (
          <button
            id="clearSearchBtn"
            onClick={() => setSearchQuery("")}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        )}
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
        <span className="text-xs text-zinc-400">Count:</span>
        <span
          id="displayedCount"
          className="text-xs font-bold font-mono-code px-2.5 py-1 bg-zinc-800 text-zinc-200 border border-zinc-700 rounded-lg"
        >
          {projectCount} of {totalProjects}
        </span>
      </div>
    </div>
  );
};

export default ProjectSearch;
