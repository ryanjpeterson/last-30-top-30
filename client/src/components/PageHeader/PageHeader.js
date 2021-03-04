import React from 'react';
import './PageHeader.css';

function PageHeader({ description }) {
  return (
    <div className="page-header">
      <h1>{description}</h1>
    </div>
  );
}

export default PageHeader;
