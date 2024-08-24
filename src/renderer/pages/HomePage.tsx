import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import ProjectCard from '../components/ProjectCard';
import ConfigureModal from '../components/ConfigureModal';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(0);
  const [configuredProjects, setConfiguredProjects] = useState([] as any[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState({});
  const [projects, setDirProjects] = useState([] as any[]);
  const navigate = useNavigate();

  useEffect(() => {
    handleDirSearch();
    handleAppSearch();
    return () => { };
  }, []);

  const startNewProject = (framework: string) => {
    console.log(`Opening a new ${framework} project`);
    navigate('new-project');
  };

  const handleAppSearch = async () => {
    setLoading(loading + 1);
    const result = await (window as any).electron.getProjects();
    console.log(result);
    setLoading(loading - 1);
    setConfiguredProjects(result);
  };

  const handleDirSearch = async () => {
    setLoading(loading + 1);
    const result = await (window as any).electron.searchNpmProjects();
    console.log(result);
    setLoading(loading - 1);
    setDirProjects(result);
  };

  const handleOpenModal = (context: any) => {
    setIsModalOpen(true);
    setModalContext(context);
  };

  return (
    <div>
      <h2>New Project?</h2>
      <div className="button-bar">
        <button type="button" onClick={() => {startNewProject('react')}}><i className="fa-brands fa-react"></i>React</button>
        <button type="button" onClick={() => {startNewProject('angular')}}><i className="fa-brands fa-angular"></i>Angular</button>
        <button type="button" onClick={() => {startNewProject('vue')}}><i className="fa-brands fa-vuejs"></i>Vue</button>
        <button type="button" onClick={() => {startNewProject('node')}}><i className="fa-brands fa-node-js"></i>Node</button>
        <button type="button" onClick={() => {startNewProject('other')}}><i className="fa-solid fa-plus"></i>Other</button>
      </div>
      {configuredProjects.length > 0 && (
        <>
          <h2>Configured Projects</h2>
          <div className="projects-container">
            {configuredProjects.map((proj: any, index: number) => (
              <ProjectCard
                key={index}
                project={proj}
                onConfigure={handleOpenModal}></ProjectCard>
            ))}
          </div>
        </>
      )}
      <h2>Projects</h2>
      {loading === 0 && (
        <h2>Loading...</h2>
      )}
      <div className="projects-container">
        {projects.map((proj: any, index: number) => (
          <ProjectCard
            key={index}
            project={proj}
            onConfigure={handleOpenModal}></ProjectCard>
        ))}
      </div>
      <ConfigureModal
        project={modalContext}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;
