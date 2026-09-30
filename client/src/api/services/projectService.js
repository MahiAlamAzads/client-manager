// projectService.js
import { api } from "./../apiClient.js";

// GET request: baseURL and headers are automatic
export async function getProjects(QUERY_PARAMS = "") {
  return await api.get(`/projects?${QUERY_PARAMS}`);
}
export async function createProject(projectData) {
  return await api.post("/projects", projectData);
}

export async function updateProject(projectId, projectData) {
  return await api.put(`/projects/${projectId}`, projectData);
}

export async function deleteProject(projectId) {
  return await api.delete(`/projects/${projectId}`);
}
