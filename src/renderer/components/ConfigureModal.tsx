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
  const [framework, setFramework] = useState(project.framework);

  useEffect(() => {
    setFramework(project.framework);
  }, [project]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const proj = {
      name,
      description,
      internalName: project.name,
      framework,
      path: project.path,
      id: uuidv4()
    };
    console.log(proj);
    (window as any).electron.addProject(proj);

    onClose();
  };

  const showIcon = () => {
    switch(project.framework) {
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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3><span className="icon">{showIcon()}</span> { kabobToCapitalCase(project.name) }</h3>
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
