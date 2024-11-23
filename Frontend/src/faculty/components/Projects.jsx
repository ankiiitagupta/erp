import React, { useState } from "react";
//import "../stylesheets/Projects.css";
import "../stylesheets/AcademicsDashboard.css";

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      projectTitle: "Machine Learning Model",
      description: "Build a machine learning model for image recognition.",
      deadline: "2024-12-15",
      link: "#",
    },
    {
      projectTitle: "Web Development Portfolio",
      description: "Create a personal website showcasing your projects and skills.",
      deadline: "2024-12-20",
      link: "#",
    },
    {
      projectTitle: "Database Management System",
      description: "Design a DBMS for an online library system.",
      deadline: "2025-01-05",
      link: "#",
    },
  ]);

  const handleUpload = () => {
    alert("Project upload functionality will be implemented here!");
  };

  return (
    <div className="projects-dashboard">
      <div className="projects-content">
        <h1 className="projects-title">PROJECTS</h1>
        <div className="upload-section">
          <button onClick={handleUpload} className="upload-button">
            Upload Project
          </button>
        </div>
        <div className="projects-list">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-details">
                <span className="project-title">{project.projectTitle}</span>
                <p className="project-description">{project.description}</p>
                <span className="project-deadline">Deadline: {project.deadline}</span>
              </div>
              <a href={project.link} className="view-link">
                View Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
