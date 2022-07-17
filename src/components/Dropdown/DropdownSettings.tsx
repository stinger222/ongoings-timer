import { ReactComponent as BackIcon } from "../../assets/back.svg";
import { useAppDispatch } from "../../hooks/redux";
import { setActiveMenu } from "../../redux/reducers/headerReducer";
import styles from './Dropdown.module.css';

export default function DropdownMain() {
  const dispatch = useAppDispatch()

  return <div>
    <h1 className={styles.header}>
      <BackIcon
        className={styles.header_back}
        onClick={() => dispatch(setActiveMenu('main'))}
      />
      Trello Settings
    </h1>

    this is settings for trello etc
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae veritatis unde facere, est corporis beatae quas! Iure velit neque quod rerum voluptates aspernatur saepe harum iusto cupiditate, ex illo architecto?
    
  </div>
}
