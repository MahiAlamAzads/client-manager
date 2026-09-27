import { useState } from "react";
import ProjectFormHeader from "./ProjectForm/ProjectFormHeader";
import ProjectFormInput from "./ProjectForm/ProjectFormInput";

const ProjectForm = ({ setProjects, data, setData }) => {
  const [warning, setWarning] = useState({
    projectName: false,
    clientName: false,
    projectUrl: false,
    category: false,
    budget: false,
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (data.id) {
      // ✏️ UPDATE existing project
      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p.id === data.id
            ? {
                ...p,
                name: data.projectName,
                client: data.clientName,
                url: data.projectUrl,
                category: data.category,
                unitBudget: Number(data.budget),
              }
            : p,
        ),
      );
    } else {
      // ➕ CREATE new project
      const newProject = {
        id: crypto.randomUUID(),
        name: data.projectName,
        client: data.clientName,
        url: data.projectUrl,
        category: data.category,
        unitBudget: Number(data.budget),
        qty: 1,
        status: "Pending",
        isFavorite: false,
      };
      setProjects((prevProjects) => [...prevProjects, newProject]);
    }

    // Reset form
    setData({
      id: null,
      projectName: "",
      clientName: "",
      projectUrl: "",
      category: "",
      budget: "",
    });
  };

  const handleClear = () => {
    setData({
      projectName: "",
      clientName: "",
      projectUrl: "",
      category: "",
      budget: "",
    });
  };

  return (
    <aside className="lg:col-span-4 w-full lg:sticky lg:top-20">
      <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl">
        <ProjectFormHeader />

        <form
          id="projectForm"
          onSubmit={handleFormSubmit}
          className="space-y-3.5 sm:space-y-4"
        >
          <ProjectFormInput
            type="text"
            label="Project Name"
            field="projectName"
            placeholder="e.g. NextGen SaaS Dashboard"
            data={data}
            setData={setData}
            warning={warning}
            setWarning={setWarning}
          />

          <ProjectFormInput
            type="text"
            label="Client Name"
            field="clientName"
            placeholder="e.g. Acme Global Tech"
            data={data}
            setData={setData}
            warning={warning}
            setWarning={setWarning}
          />

          <ProjectFormInput
            type="url"
            label="Project URL"
            field="projectUrl"
            placeholder="https://client-project.com"
            data={data}
            setData={setData}
            warning={warning}
            setWarning={setWarning}
          />

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-xs font-medium text-zinc-300 mb-1"
            >
              Category <span className="text-rose-400">*</span>
            </label>

            <div className="relative">
              <select
                id="category"
                value={data.category}
                onChange={(event) =>
                  setData((prev) => ({
                    ...prev,
                    category: event.target.value,
                  }))
                }
                className="w-full px-3 py-2 sm:py-2.5 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400/20 transition-all appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>
                  Select category...
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Cloud / DevOps">Cloud / DevOps</option>
                <option value="AI & ML">AI & Machine Learning</option>
                <option value="Branding & Growth">Branding & Growth</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-zinc-400">
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <p
              id="errorCategory"
              className="hidden text-[11px] text-rose-400 mt-1 items-center gap-1"
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
                />
              </svg>

              <span>Please select a category.</span>
            </p>
          </div>

          <ProjectFormInput
            type="number"
            label="Unit Budget ($ USD)"
            field="budget"
            placeholder="5000"
            data={data}
            setData={setData}
            warning={warning}
            setWarning={setWarning}
          />

          {/* Buttons */}
          <div className="pt-3 flex items-center gap-2.5">
            <button
              type="submit"
              id="submitBtn"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 text-xs font-semibold rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 shadow-sm active:scale-98 transition-all cursor-pointer"
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
                  strokeWidth="2.5"
                  d="M12 4v16m8-8H4"
                />
              </svg>

              <span>{data.id ? "Update" : "Add"} Project</span>
            </button>

            <button
              type="button"
              id="clearBtn"
              onClick={handleClear}
              className="px-3.5 py-2 sm:py-2.5 text-xs font-medium rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </aside>
  );
};

export default ProjectForm;
