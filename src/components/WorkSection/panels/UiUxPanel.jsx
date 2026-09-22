import { uiUxProjects } from '../Data/uiUxProjects';
import { WorkItem } from '../workitem';
import styles from './UiUxPanel.module.css'; // optional

export const UiUxPanel = () => {
  return (
    <div className={styles.uiuxGrid}>
      {uiUxProjects.map((project, index) => (
        <WorkItem key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};