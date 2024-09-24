import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './NewProjectPage.scss';

const NewProjectPage: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const framework = params.get('framework');
  const [loading, setLoading] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [internalName, setInternalName] = useState('');
  const [description, setDescription] = useState('');
  const [addRouting, setAddRouting] = useState(true);
  const [style, setStyle] = useState('scss');
  const navigate = useNavigate();

  useEffect(() => {
    (window as any).electron.onProjectReply((data: any) => {
      const result = handleProjectReply(data);
      console.log(result);
    });
  }, []);

  const handleProjectReply = (data: any) => {
    setLoading(loading - 1);
    if (data.success) {
      console.log('Success:', data.message);
      navigate('/');
      return { status: 'success', message: data.message };
    } else {
      console.error('Failure:', data.message);
      navigate('error');
      return { status: 'failure', message: data.message };
    }
  };
  const handleSubmit = (e: any) => {
      e.preventDefault();
      if (projectName.trim()) {
        setLoading(loading + 1);
        switch(framework){
          case 'react':
            (window as any).electron.createReactProject({name: projectName, description, internalName});
            break;
          case 'angular':
            (window as any).electron.createAngularProject({
              name: projectName,
              description,
              internalName,
              addRouting,
              style
            });
            break;
        }
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
      {loading > 0 && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}
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
                  placeholder='Optional'
              />
          </label>
          {framework === 'angular' && (
            <>
              <label className="switch">
                Add Routing:
                <input
                  type="checkbox"
                  checked={addRouting}
                  onChange={(e) => setAddRouting(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
              <label>
                Stylesheet Format:
                <select value={style} onChange={(e) => setStyle(e.target.value)} required>
                  <option value="css">CSS</option>
                  <option value="scss">SCSS</option>
                  <option value="sass">SASS</option>
                  <option value="less">LESS</option>
                  <option value="styl">Stylus</option>
                </select>
              </label>
            </>
          )}
          <div className="button-wrapper">
            <button type="submit">Create Project</button>
            <button type="button" onClick={() => {navigate('/')}}>Back to Home</button>
          </div>
      </form>
    </div>
  );
};

export default NewProjectPage;
