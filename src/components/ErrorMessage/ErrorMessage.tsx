import styles from './ErrorMessage.module.css';
import { ReactComponent as ExclamationCircle } from '../../assets/exclamation.svg';

interface IProps {
  message: string
}

export default function ErrorMessage({ message }: IProps) {
  return (
    <div className={styles.error_container}>
      <ExclamationCircle className={styles.error_icon}/>
      <span className={styles.error_message}>{message}</span>
    </div>
  )
}