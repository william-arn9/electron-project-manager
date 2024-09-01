import { app, BrowserWindow, ipcMain } from 'electron';
import { exec } from 'child_process';
import * as path from 'path';
import * as url from 'url';
import { promises as fs } from 'fs';
import { StoreService } from './services/store.service';
import { Project } from './models/app.models';
import { searchForNpmProjects } from './services/project-search.service';

let mainWindow: BrowserWindow | null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
  }
  else {
    // Load the index.html file from the dist directory
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../dist/index.html'),
        protocol: 'file:',
        slashes: true,
      }) + '#/'
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle navigation
  mainWindow.webContents.on('will-navigate', (event, newUrl) => {
    event.preventDefault();
    if (process.env.NODE_ENV === 'development') {
      mainWindow?.loadURL('http://localhost:3000');
    }
    else {
      // Load the index.html file from the dist directory
      mainWindow?.loadURL(
        url.format({
          pathname: path.join(__dirname, '../dist/index.html'),
          protocol: 'file:',
          slashes: true,
        }) + '#/'
      );
    }
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const storeService = new StoreService();

ipcMain.handle('get-projects', () => {
  return storeService.getAllProjects();
});

ipcMain.handle('add-project', (event, project: Project) => {
  storeService.addProject(project);
});

ipcMain.handle('edit-project', (event, project: Project) => {
  storeService.editProject(project);
});

ipcMain.handle('delete-project', (event, project: Project) => {
  storeService.deleteProject(project.id);
});

ipcMain.handle('search-npm-projects', async (event, directory: string) => {
  const projects = await searchForNpmProjects(directory);
  return projects;
});

ipcMain.handle('delete-directory', async (event, directory: string) => {
  const projects = await deleteDirectory(directory);
  return projects;
});

ipcMain.handle('open-vscode', (event, projectPath: string) => {
  openVSCode(projectPath);
});

function openVSCode(projectPath: string): void {
  console.log(`${projectPath}`);
  const command = `code ${projectPath} -n`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error opening VSCode: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
  });
}

async function deleteDirectory(dirPath: string): Promise<void> {
  try {
    console.log(`Deleting ${dirPath}`);
    const files = await fs.readdir(dirPath);

    // Iterate over all files and directories within the directory
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = await fs.lstat(fullPath);

      if (stat.isDirectory()) {
        // Recursively delete the sub-directory
        await deleteDirectory(fullPath);
      } else {
        // Delete the file
        await fs.unlink(fullPath);
      }
    }

    // Finally, delete the now-empty directory
    await fs.rmdir(dirPath);
    console.log(`Deleted directory: ${dirPath}`);
  } catch (error) {
    console.error(`Error deleting directory ${dirPath}:`, error);
  }
}