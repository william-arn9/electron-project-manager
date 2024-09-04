import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './NewProjectPage.scss';

const NewProjectPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const framework = params.get('framework');
  const [projectName, setProjectName] = useState('');
  const [internalName, setInternalName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: any) => {
      e.preventDefault();
      if (projectName.trim()) {
          (window as any).electron.createReactProject({name: projectName, description, internalName});
      }
  };
  const showIcon = () => {
    switch(framework) {
      case 'react':
        return (<i className="fa-brands fa-react"></i>)
      case 'angular':
        return (<i className="fa-brands fa-angular"></i>)
      case 'vue':
        return (<i className="fa-brands fa-vuejs"></i>)
      default:
        return (<i className="fa-brands fa-node-js"></i>)
    }
  }

  return (
    <div className="new-project-wrapper">
      <header>{showIcon()}</header>
      <form onSubmit={handleSubmit}>
          <label>
              Project Name:
              <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
              />
          </label>
          <label>
              Internal Name:
              <input
                  type="text"
                  value={internalName}
                  onChange={(e) => setInternalName(e.target.value)}
                  required
              />
          </label>
          <label>
              Description:
              <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
              />
          </label>
          <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default NewProjectPage;
