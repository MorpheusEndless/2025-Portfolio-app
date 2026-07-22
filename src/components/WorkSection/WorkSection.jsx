import { projects } from '../Database/projectsData';
import { WorkItem } from './WorkItem';
import styles from './WorkSection.module.css'; 

export const WorkSection = () => {
  return (
    <section id="work" className="section">
      <div className={styles.workContainer}>
        <h2>WORK</h2>
        {projects.map((project, index) => (
          <WorkItem 
            key={project.id} 
            project={project} 
            index={index} 
          />
        ))}
      </div>
    </section>
  );
};