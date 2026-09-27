const ToggleStarAndReset = ({
  starredOnly,
  toggleFavoriteFilter,
  resetAllFilters,
}) => {
  return (
    <div className="flex items-end gap-1.5">
      <button
        id="filterFavoriteBtn"
        onClick={toggleFavoriteFilter}
        aria-pressed={starredOnly}
        className={`flex-1 py-1.5 px-2 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-xs font-medium inline-flex items-center justify-center gap-1 transition-all cursor-pointer ${
          starredOnly
            ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
            : "text-zinc-400 hover:text-amber-400"
        }`}
        title="Filter Starred"
      >
        <svg
          id="filterStarIcon"
          className={`w-3.5 h-3.5 ${
            starredOnly ? "text-amber-400 fill-amber-400" : "text-zinc-500"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          ></path>
        </svg>
        <span>Starred</span>
      </button>

      <button
        onClick={resetAllFilters}
        className="py-1.5 px-2.5 rounded-xl border border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white text-xs font-medium transition-all cursor-pointer"
        title="Reset Filters"
      >
        Reset
      </button>
    </div>
  );
};

export default ToggleStarAndReset;
