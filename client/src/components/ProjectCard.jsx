const ProjectCard = ({ setData, project, setProjects }) => {
  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case "Web Development":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      case "Mobile App":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";

      case "UI/UX Design":
        return "bg-pink-500/10 text-pink-400 border-pink-500/20";

      case "Cloud / DevOps":
        return "bg-teal-500/10 text-teal-400 border-teal-500/20";

      case "AI & ML":
      case "AI & Machine Learning":
        return "bg-violet-500/10 text-violet-400 border-violet-500/20";

      case "Branding & Growth":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";

      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };
  const toggleStatus = () => {
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === project.id
          ? { ...p, status: p.status === "Pending" ? "Completed" : "Pending" }
          : p,
      ),
    );
  };

  const toggleFavorite = () => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => {
        if (p.id === project.id) {
          return { ...p, isFavorite: !p.isFavorite };
        }
        return p;
      }),
    );
  };

  const changeQuantity = (qtyForAdjustment) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => {
        if (p.id === project.id) {
          const newQty = p.qty + qtyForAdjustment;
          return { ...p, qty: newQty };
        }
        return p;
      }),
    );
  };

  const deleteProject = (id) => {
    setProjects((prevProjects) => prevProjects.filter((p) => p.id !== id));
  };

  // project is paramter not the props {careful dont get confused}
  const editProject = (project) => {
    setData({
      id: project.id,
      projectName: project.name,
      clientName: project.client,
      projectUrl: project.url,
      category: project.category,
      budget: project.unitBudget,
      qty: project.qty,
      status: project.status,
      isFavorite: project.isFavorite,
    });
  };

  return (
    <article
      className="project-card bg-[#121215] border border-zinc-800 hover:border-zinc-700 rounded-2xl p-4 sm:p-5 transition-all relative group shadow-sm"
      data-id={project.id}
      data-name={project.name}
      data-client={project.client}
      data-url={project.url}
      data-category={project.category}
      data-unit-budget={project.unitBudget}
      data-qty={project.qty}
      data-status={project.status}
      data-favorite={project.isFavorite}
    >
      {/* <!-- Top Card Row: Category Badge + Favorite + Actions --> */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <span
            className={`px-2 py-0.5 text-[11px] font-medium rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 ${getCategoryBadgeClass(project.category)}`}
          >
            {project.category}
          </span>

          {project.status === "Pending" ? (
            <span class="status-indicator px-2 py-0.5 text-[11px] font-medium rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>{project.status}</span>
            </span>
          ) : (
            <span className="status-indicator px-2 py-0.5 text-[11px] font-medium rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>{project.status}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* <!-- Star Favorite Button --> */}
          <button
            onClick={() => toggleFavorite()}
            className={`favorite-btn p-1.5 rounded-lg ${project.isFavorite ? "text-amber-400" : "text-zinc-500"} hover:bg-zinc-800 transition-colors cursor-pointer`}
            title="Favorite"
          >
            <svg
              className={`w-4 h-4 ${project.isFavorite ? "fill-amber-400" : ""}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              ></path>
            </svg>
          </button>

          {/* <!-- Edit Button --> */}
          <button
            onClick={() => editProject(project)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Edit"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
          </button>

          {/* <!-- Delete Button --> */}
          <button
            onClick={() => deleteProject(project.id)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Delete"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* <!-- Middle Card Row: Project Title & Client & URL --> */}
      <div className="space-y-1 mb-3.5">
        <h4 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
          {project.name}
        </h4>
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-zinc-400">
          <span className="inline-flex items-center gap-1 text-zinc-300">
            Client:{" "}
            <strong className="text-zinc-200 font-semibold">
              {project.client}
            </strong>
          </span>
          <span className="text-zinc-700 hidden sm:inline">•</span>
          <a
            href={project.url}
            target="_blank"
            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 hover:underline font-mono-code"
          >
            <span>{project.url.replace(/^(https?:\/\/)/, "")}</span>

            <svg
              className="w-3 h-3 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      {/* <!-- Bottom Card Row --> */}
      <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
        {/* <!-- Quantity Controller --> */}
        <div className="flex items-center gap-1.5 bg-zinc-950 px-2 py-1 rounded-xl border border-zinc-800">
          <span className="text-[11px] text-zinc-400">Qty:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => changeQuantity(-1)}
              className="w-5 h-5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center text-xs font-bold transition-all active:scale-90 cursor-pointer"
            >
              -
            </button>
            <span className="qty-display text-xs font-mono-code font-bold text-white px-1.5">
              {project.qty}
            </span>
            <button
              onClick={() => changeQuantity(1)}
              className="w-5 h-5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center text-xs font-bold transition-all active:scale-90 cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* <!-- Budget Calculations --> */}
        <div className="text-right">
          <div className="text-[10px] text-zinc-500 font-mono-code">
            Unit: ${project.unitBudget.toLocaleString()} × {project.qty}
          </div>
          <div
            className={`text-xs sm:text-sm font-bold ${project.status === "Completed" ? "text-emerald-400" : "text-white"} font-mono-code total-card-budget`}
          >
            ${(project.unitBudget * project.qty).toLocaleString()}.00
          </div>
        </div>

        {/* <!-- Status Toggle Action Switch --> */}
        <button
          onClick={toggleStatus}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border ${project.status === "Pending" ? "border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300" : "border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 hover:text-white"} transition-all cursor-pointer"
          title="Toggle status`}
        >
          <span>
            Mark {project.status === "Completed" ? "Pending" : "Completed"}
          </span>

          {project.status === "Completed" ? (
            <svg
              className="w-3.5 h-3.5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          )}
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;
