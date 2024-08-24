import React, { useEffect, useState } from 'react';
import './ConfigureModal.scss';
import { kabobToCapitalCase } from '../utils/sting.utils';
import { v4 as uuidv4 } from 'uuid';

interface ConfigureModalProps {
  project: any,
  isOpen: boolean;
  onClose: () => void;
}

const ConfigureModal: React.FC<ConfigureModalProps> = ({ project, isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [framework, setFramework] = useState('node');
  const { packageFile } = project;

  useEffect(() => {
    if (packageFile) {
      if (packageFile.dependencies.react) {
        setFramework('react');
      } else if (packageFile.dependencies['@angular/core']) {
        setFramework('angular');
      } else if (packageFile.dependencies.vue) {
        setFramework('vue');
      } else {
        setFramework('node');
      }
    }
  }, [packageFile]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const proj = {
      name,
      description,
      internalName: packageFile.name,
      framework,
      id: uuidv4()
    };
    console.log(proj);
    (window as any).electron.addProject(proj);

    onClose();
  };

  const showIcon = () => {
    switch(true) {
      case !!packageFile.dependencies.react:
        return (<i className="fa-brands fa-react"></i>)
      case !!packageFile.dependencies['@angular/core']:
        return (<i className="fa-brands fa-angular"></i>)
      case !!packageFile.dependencies.vue:
        return (<i className="fa-brands fa-vuejs"></i>)
      default:
        return (<i className="fa-brands fa-node-js"></i>)
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3><span className="icon">{showIcon()}</span> { kabobToCapitalCase(packageFile.name) }</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            >
            </textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
          <button type="button" className="cancel-button" onClick={(e) => {e.preventDefault(); onClose();}}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfigureModal;
