import { promises as fs } from 'fs';
import * as path from 'path';

export async function searchForNpmProjects(directory = 'C:\\Users\\Funsi\\OneDrive\\Desktop'): Promise<any[]> {
  let npmProjects: any[] = [];

  async function searchDir(currentPath: string): Promise<void> {
    try {
      const files = await fs.readdir(currentPath);

      for (const file of files) {
        const fullPath = path.join(currentPath, file);
        let stat;
        try {
          stat = await fs.lstat(fullPath);
        } catch (error: any) {
          if (error.code === 'EPERM' || error.code === 'EACCES' || error.code === 'EBUSY') {
            console.warn(`Skipping directory due to permission issues: ${fullPath}`);
            continue;
          } else {
            throw error;
          }
        }

        if (stat.isDirectory()) {
          if (file === 'node_modules') {
            console.log(`Skipping node_modules directory: ${fullPath}`);
            continue;
          }
          await searchDir(fullPath);
        } else if (file === 'package.json') {
          let packageJson;
          try {
            packageJson = JSON.parse(await fs.readFile(fullPath, 'utf-8'));
          }
          catch (err) { console.log(err) }
          if (packageJson) {
            npmProjects.push({
              path: fullPath.split(`\\package.json`)[0],
              packageFile: packageJson
            });
          }
        }
      }
    } catch (error: any) {
      if (error.code === 'EPERM' || error.code === 'EACCES' || error.code === 'EBUSY') {
        console.warn(`Skipping directory due to permission issues: ${currentPath}`);
      } else {
        throw error;
      }
    }
  }

  await searchDir(directory);
  return npmProjects;
}
