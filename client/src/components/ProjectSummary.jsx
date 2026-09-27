const ProjectSummary = ({ projects }) => {
  const pendingProjects = projects.filter(
    (project) => project.status === "Pending",
  );
  const completedProjects = projects.filter(
    (project) => project.status === "Completed",
  );

  const totalBudget = projects
    .reduce((acc, project) => acc + Number(project.unitBudget * project.qty), 0)
    .toLocaleString("en-US");

  const pendingCount = pendingProjects.length;
  const completedCount = completedProjects.length;

  return (
    <section
      aria-labelledby="summary-heading"
      className="space-y-3 sm:space-y-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2
            id="summary-heading"
            className="text-base sm:text-lg font-bold text-white tracking-tight"
          >
            Project Summary
          </h2>
          <p className="text-xs text-zinc-400">
            Live operational overview across active clients, deliveries &
            budget.
          </p>
        </div>
      </div>

      {/* <!-- 4 Cards Grid: 2 cols on mobile, 4 cols on lg --> */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* <!-- Total Projects --> */}
        <div className="bg-[#121215] border border-zinc-800/90 hover:border-zinc-700 rounded-2xl p-4 sm:p-5 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">
              Total Projects
            </span>
            <div className="p-1.5 sm:p-2 rounded-xl bg-zinc-800/80 text-zinc-300 border border-zinc-700/50">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5">
            <span
              id="summaryTotalProjects"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono-code"
            >
              {projects.length}
            </span>
            <span className="text-[11px] text-zinc-500 font-medium">
              projects
            </span>
          </div>
        </div>

        {/* <!-- Pending Projects --> */}
        <div className="bg-[#121215] border border-zinc-800/90 hover:border-amber-500/40 rounded-2xl p-4 sm:p-5 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Pending</span>
            <div className="p-1.5 sm:p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5">
            <span
              id="summaryPendingProjects"
              className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight font-mono-code"
            >
              {pendingCount}
            </span>
            <span className="text-[11px] text-zinc-500 font-medium">
              in queue
            </span>
          </div>
        </div>

        {/* <!-- Completed Projects --> */}
        <div className="bg-[#121215] border border-zinc-800/90 hover:border-emerald-500/40 rounded-2xl p-4 sm:p-5 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Completed</span>
            <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5">
            <span
              id="summaryCompletedProjects"
              className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight font-mono-code"
            >
              {completedCount}
            </span>
            <span className="text-[11px] text-zinc-500 font-medium">
              delivered
            </span>
          </div>
        </div>

        {/* <!-- Total Budget --> */}
        <div className="bg-[#121215] border border-zinc-800/90 hover:border-blue-500/40 rounded-2xl p-4 sm:p-5 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">
              Total Budget
            </span>
            <div className="p-1.5 sm:p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mt-2 sm:mt-3 flex items-baseline gap-1.5">
            <span
              id="summaryTotalBudget"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono-code"
            >
              ${totalBudget}
            </span>
            <span className="text-[11px] text-zinc-500 font-medium">USD</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSummary;
