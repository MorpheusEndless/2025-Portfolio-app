import { devProjects } from '../Data/devProjects';
import { WorkItem } from '../workitem';
import styles from '../WorkSection.module.css';

export const DevPanel = () => {
  return (
    <div className={styles.workContainer}>
      {devProjects.map((project, index) => (
        <WorkItem
          key={project.id}
          project={project}
          index={index}
          style={{ backgroundImage: `url(${project.image})` }}
        />
      ))}
    </div>
  );
};