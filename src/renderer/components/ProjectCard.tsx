import React, { useEffect, useRef, useState } from 'react';
import './ProjectCard.scss';
import { kabobToCapitalCase } from '../utils/sting.utils';

const ProjectCard: React.FC<any> = ({project, onConfigure}) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const optionsRef = useRef(null);
  const { packageFile } = project;

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideOptions);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideOptions);
    };
  }, []);

  const handleClickOutsideOptions = (event: MouseEvent) => {
    const cur = optionsRef.current as any;
    if (cur && !cur.contains(event.target as Node)) {
      setOptionsOpen(false);
    }
  };

  const openProject = (event: any) => {
    event.preventDefault();
    (window as any).electron.openVSCode(project.path);
  };

  const handleDuplicateClick = (e: any) => {
    e.preventDefault();
  }

  const handleOptionsClick = (e: any) => {
    e.preventDefault();
    setOptionsOpen(!optionsOpen);
  };

  const handleFileExplorerClick = (e: any) => {
    e.preventDefault();
  };

  const handleConfigureClick = (e: any) => {
    e.preventDefault();
    onConfigure(project);
  }

  const handleDeleteClick = async (e: any) => {
    e.preventDefault();
    (window as any).electron.deleteDirectory(project.path);
    setDeleted(true);
  };

  const showIcon = () => {
    switch(true) {
      case !!packageFile?.dependencies.react:
        return (<i className="fa-brands fa-react"></i>)
      case !!packageFile?.dependencies['@angular/core']:
        return (<i className="fa-brands fa-angular"></i>)
      case !!packageFile?.dependencies.vue:
        return (<i className="fa-brands fa-vuejs"></i>)
      default:
        return (<i className="fa-brands fa-node-js"></i>)
    }
  }

  return (
    <button className={`project-card ${deleted ? 'hidden' : ''}`} onDoubleClick={(e) => openProject(e)}>
      <div className="header">
        <h5>{ kabobToCapitalCase(packageFile?.name) }</h5>
        <a className="options" onClick={(e) => {handleOptionsClick(e)}}>
          <i className="fa-solid fa-ellipsis"></i>
        </a>
        {optionsOpen && (
          <div className="options-list" ref={optionsRef}>
            <a className="option" onClick={(e) => {handleConfigureClick(e); setOptionsOpen(false)}}>Configure</a>
            <a className="option" onClick={(e) => {handleFileExplorerClick(e); setOptionsOpen(false)}}>Open in file explorer</a>
            <a className="option" onClick={(e) => {handleDuplicateClick(e); setOptionsOpen(false)}}>Duplicate</a>
            <a className="option" onClick={(e) => {handleDeleteClick(e); setOptionsOpen(false)}}>Delete</a>
          </div>
        )}
      </div>
      {showIcon()}
    </button>
  );
}

export default ProjectCard;