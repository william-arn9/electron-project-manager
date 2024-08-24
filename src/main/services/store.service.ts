import Store from "electron-store";
import { Project, StoreType } from "../models/app.models";

export class StoreService {
  private store: Store<StoreType>;

  constructor() {
    this.store = new Store<StoreType>({
      defaults: {
          projects: []
      }
    });
  }

  getAllProjects(): Project[] {
      return this.store.get('projects', []);
  }

  addProject(project: Project): void {
    console.log(`Storing project: ${project}`);
      const projects = this.getAllProjects();
      projects.push(project);
      console.log(projects);
      this.store.set('projects', projects);
  }

  editProject(updatedProject: Project): void {
      const projects = this.getAllProjects();
      const index = projects.findIndex(p => p.id === updatedProject.id);
      if (index !== -1) {
          projects[index] = updatedProject;
          this.store.set('projects', projects);
      }
  }

  deleteProject(projectId: string): void {
      let projects = this.getAllProjects();
      projects = projects.filter(p => p.id !== projectId);
      this.store.set('projects', projects);
  }
}