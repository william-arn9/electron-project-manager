import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import ProjectCard from '../components/ProjectCard';
import ConfigureModal from '../components/ConfigureModal';
import { useNavigate } from 'react-router-dom';
import { NormalizerService } from '../services/ProjectNormalizer';
import { ProjectCardData } from '../types/ProjectTypes';
import { StorageService } from '../services/StorageService';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(0);
  const [configuredProjects, setConfiguredProjects] = useState([] as any[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState({});
  const [projects, setDirProjects] = useState([] as any[]);
  const navigate = useNavigate();

  useEffect(() => {
    handleSearches(true);
    return () => { };
  }, []);

  const startNewProject = (framework: string) => {
    console.log(`Opening a new ${framework} project`);
    navigate('new-project');
  };

  const handleSearches = async (useCache?: boolean) => {
    setLoading(loading + 1);
    let resultConfig = await (window as any).electron.getProjects();
    resultConfig = resultConfig.map((p: any) => p = NormalizerService.transformFromTraditionalObject(p));
    setConfiguredProjects(resultConfig);
    const cachedProjects = StorageService.sessionGet('projects');
    if(useCache && cachedProjects) {
      console.log(cachedProjects);
      setDirProjects(cachedProjects);
    }
    else {
      let resultDir = await (window as any).electron.searchNpmProjects();
      resultDir = resultDir.map((p: any) => p = NormalizerService.transformFromPackageJson(p));
      resultDir = resultDir.filter((p: ProjectCardData) => !resultConfig.find((confProj: any) => confProj.internalName === p.name ));
      setDirProjects(resultDir);
      StorageService.sessionSet('projects', resultDir);
    }
    setLoading(loading - 1);
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
