import ProjectCard from "./ProjectCard";

const ProjectCardGrid = ({ setData, projects, setProjects }) => {
  if (projects.length < 1) {
    return (
      <div className="col-span-full text-center text-zinc-500 py-10">
        No projects found.
      </div>
    );
  }
  return (
    <div id="projectsGrid" className="space-y-3.5 sm:space-y-4">
      {projects.map((project) => (
        <ProjectCard
          setData={setData}
          key={project.id}
          project={project}
          setProjects={setProjects}
        />
      ))}
    </div>
  );
};

export default ProjectCardGrid;
