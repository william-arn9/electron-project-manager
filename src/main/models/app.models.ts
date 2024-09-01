export interface Project {
  name: string;
  framework: string;
  path: string;
  description: string;
  id: string;
  internalName: string,
  screenshots?: string[];
}

export interface StoreType {
  projects: Project[];
}