import { designsProjects } from '../Data/designsProjects';
import { WorkItem } from '../workitem';
import styles from './Designs.Panel.module.css'

export const DesignsPanel = () => {
  return (
    <div className={styles.designsGrid}>
      {designsProjects.map((project, index) => (
        <WorkItem key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};