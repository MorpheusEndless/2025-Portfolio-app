import styles from './WorkSection.module.css';

export const WorkItem = ({ project, index }) => {
  return (
    <div className="work-item" id={`work-item-${index + 1}`}>
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <div className={styles.workInfo}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <span className={styles.viewLink}>View Project →</span> 
        </div>
      </a>
    </div>
  );
};