import React from 'react';
import { Link } from 'react-router-dom';

const NewProjectPage: React.FC = () => {
  return (
    <div>
      <h1>New Project</h1>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};

export default NewProjectPage;
