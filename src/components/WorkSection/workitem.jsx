import styles from './WorkSection.module.css';

export const WorkItem = ({ project, index, style }) => {
  return (
    <div className="work-item" id={`work-item-${index + 1}`}>
      {/* Separate image layer so it can scale independently of workInfo */}
      <div className="work-item-bg" style={style} />

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