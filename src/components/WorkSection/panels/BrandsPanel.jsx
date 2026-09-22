import { brandsProjects } from '../Data/brandsProjects';
import { WorkItem } from '../workitem';
import styles from './BrandsPanel.module.css'; // optional

export const BrandsPanel = () => {
  return (
    <div className={styles.brandsGrid}>
      {brandsProjects.map((project, index) => (
        <WorkItem key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};