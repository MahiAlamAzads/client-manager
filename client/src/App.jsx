import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainColumnWorkspace from "./components/MainColumnWorkspace";
import ProjectCardGrid from "./components/ProjectCardsGrid";
import ProjectControlAndCardsContainer from "./components/ProjectControlAndCardsContainer";
import ProjectForm from "./components/ProjectForm";
import ProjectsControlAndFilter from "./components/ProjectsControlAndFilter";
import ProjectSummary from "./components/ProjectSummary";
import { projects as initialProjects } from "./data/project";

// Resting state for every search / filter control.
const DEFAULT_FILTERS = {
  search: "",
  category: "ALL",
  status: "ALL",
  sort: "default",
  starredOnly: false,
};

const App = () => {
  // Master list — never mutated by search or filters.
  const [projects, setProjects] = useState(initialProjects || {});
  // Search & filter selections — the visible list is derived from these.
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  // for project form - here I declared to make it only source of truth
  const [data, setData] = useState({
    projectName: "",
    clientName: "",
    projectUrl: "",
    category: "",
    budget: "",
  });

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const matchesSearch = (project) => {
    const query = filters.search.trim().toLowerCase();
    if (query === "") return true;
    return (
      project.name.toLowerCase().includes(query) ||
      project.client.toLowerCase().includes(query) ||
      project.url.toLowerCase().includes(query) ||
      project.category.toLowerCase().includes(query)
    );
  };

  const matchesFilters = (project) => {
    if (filters.category !== "ALL" && project.category !== filters.category) {
      return false;
    }
    if (filters.status !== "ALL" && project.status !== filters.status) {
      return false;
    }
    if (filters.starredOnly && !project.isFavorite) {
      return false;
    }
    return true;
  };

  const sortProjects = (list) => {
    switch (filters.sort) {
      case "name-asc":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...list].sort((a, b) => b.name.localeCompare(a.name));
      case "budget-asc":
        return [...list].sort(
          (a, b) => a.unitBudget * a.qty - b.unitBudget * b.qty,
        );
      case "budget-desc":
        return [...list].sort(
          (a, b) => b.unitBudget * b.qty - a.unitBudget * a.qty,
        );
      default:
        return list;
    }
  };

  // Derived view of the data: filter first, then sort — master array stays intact.
  const visibleProjects = sortProjects(
    projects.filter(
      (project) => matchesSearch(project) && matchesFilters(project),
    ),
  );

  const resetAllFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <ProjectSummary projects={projects} />
        <MainColumnWorkspace>
          <ProjectForm
            data={data}
            setData={setData}
            setProjects={setProjects}
            projects={projects}
          />
          <ProjectControlAndCardsContainer>
            <ProjectsControlAndFilter
              projects={projects}
              projectCount={visibleProjects.length}
              filters={filters}
              updateFilter={updateFilter}
              resetAllFilters={resetAllFilters}
            />
            <ProjectCardGrid
              setData={setData}
              setProjects={setProjects}
              projects={visibleProjects}
            />
          </ProjectControlAndCardsContainer>
        </MainColumnWorkspace>
      </main>
      <Footer />
    </>
  );
};

export default App;
