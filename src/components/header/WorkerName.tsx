import styles from "../../styles/layout/header/_workerName.module.scss";

type WorkerNameProps = {
  name: string;
};

const WorkerName: React.FC<WorkerNameProps> = ({ name }) => {
  return (
    <div>
      <p className={styles.name__text}>{name}</p>
    </div>
  );
};

export default WorkerName;
