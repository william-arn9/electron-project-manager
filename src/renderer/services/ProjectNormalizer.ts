import { ProjectCardData } from "../types/ProjectTypes";

export abstract class NormalizerService {
  constructor() { }

  static transformFromPackageJson(project: any): ProjectCardData {
    const packageJson = project.packageFile;
    let framework = 'node';
    if(packageJson?.dependencies?.hasOwnProperty('react')) framework = 'react';
    if(packageJson?.dependencies?.hasOwnProperty('vue')) framework = 'vue';
    if(packageJson?.dependencies?.hasOwnProperty('@angular/core')) framework = 'angular';
    return {
      name: packageJson?.name,
      framework,
      path: project.path,
      version: packageJson?.version,
      description: packageJson?.description,
      configured: false
    };
  }
  
  static transformFromTraditionalObject(project: any): ProjectCardData {
    return {
      name: project.name,
      framework: project.framework,
      id: project.id,
      version: project.version,
      description: project.description,
      internalName: project.internalName,
      path: project.path,
      configured: true
    };
  }
}