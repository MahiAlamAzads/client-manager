import FilterInput from "./FilterInput";
import ProjectSearch from "./ProjectSearch";
import ToggleStarAndReset from "./ToggleStarred";

const ProjectsControlAndFilter = ({
  projects,
  projectCount,
  filters,
  updateFilter,
  resetAllFilters,
}) => {
  return (
    <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-4 space-y-3 shadow-sm">
      {/* <!-- Search Bar & Count --> */}
      <ProjectSearch
        searchQuery={filters.search}
        setSearchQuery={(value) => updateFilter("search", value)}
        totalProjects={projects.length}
        projectCount={projectCount}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2.5 border-t border-zinc-800/80">
        <FilterInput
          filterName="Category"
          value={filters.category}
          onChange={(value) => updateFilter("category", value)}
          options={[
            { value: "ALL", label: "All Categories" },
            { value: "Web Development", label: "Web Development" },
            { value: "Mobile App", label: "Mobile App" },
            { value: "UI/UX Design", label: "UI/UX Design" },
            { value: "Cloud / DevOps", label: "Cloud / DevOps" },
            { value: "AI & ML", label: "AI & Machine Learning" },
            { value: "Branding & Growth", label: "Branding & Growth" },
          ]}
        />

        <FilterInput
          filterName="Status"
          value={filters.status}
          onChange={(value) => updateFilter("status", value)}
          options={[
            { value: "ALL", label: "All Status" },
            { value: "Pending", label: "Pending" },
            { value: "Completed", label: "Completed" },
          ]}
        />

        <FilterInput
          filterName="Sort"
          value={filters.sort}
          onChange={(value) => updateFilter("sort", value)}
          options={[
            { value: "default", label: "Default" },
            { value: "name-asc", label: "Name: A-Z" },
            { value: "name-desc", label: "Name: Z-A" },
            { value: "budget-asc", label: "Budget: Low-High" },
            { value: "budget-desc", label: "Budget: High-Low" },
          ]}
        />

        {/* <!-- Starred Toggle & Reset --> */}
        <ToggleStarAndReset
          starredOnly={filters.starredOnly}
          toggleFavoriteFilter={() =>
            updateFilter("starredOnly", !filters.starredOnly)
          }
          resetAllFilters={resetAllFilters}
        />
      </div>
    </div>
  );
};

export default ProjectsControlAndFilter;
