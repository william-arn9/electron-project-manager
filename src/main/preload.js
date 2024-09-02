const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    searchNpmProjects: (directory) => ipcRenderer.invoke('search-npm-projects', directory),
    openVSCode: (projectPath) => ipcRenderer.invoke('open-vscode', projectPath),
    openInFileExplorer: (path) => ipcRenderer.invoke('open-in-file-explorer', path),
    deleteDirectory: (directory) => ipcRenderer.invoke('delete-project', directory),
    getProjects: () => ipcRenderer.invoke('get-projects'),
    addProject: (project) => ipcRenderer.invoke('add-project', project),
    editProject: (project) => ipcRenderer.invoke('edit-project', project),
    deleteProject: (project) => ipcRenderer.invoke('delete-project', project)
});

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
