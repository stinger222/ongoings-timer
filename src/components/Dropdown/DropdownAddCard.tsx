import { useAppDispatch } from "../../hooks/redux";
import { setActiveMenu } from "../../redux/reducers/headerReducer";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import styles from './Dropdown.module.css';

export default function DropdownMain() {
  const dispatch = useAppDispatch()

  return <div>
    <h1 className={styles.header}>  
    <BackIcon
        className={styles.header_back}
        onClick={() => dispatch(setActiveMenu('main'))}
      />
      Add New Card  
    </h1>

    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, odio id aperiam deserunt tenetur exercitationem, aliquid sequi repudiandae unde, qui consequatur nulla! Cum in facere omnis culpa voluptate dolore quisquam!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, odio id aperiam deserunt tenetur exercitationem, aliquid sequi repudiandae unde, qui consequatur nulla! Cum in facere omnis culpa voluptate dolore quisquam!
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, odio id aperiam deserunt tenetur exercitationem, aliquid sequi repudiandae unde, qui consequatur nulla! Cum in facere omnis culpa voluptate dolore quisquam!
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore dicta qui, illo obcaecati, et consectetur, sapiente reiciendis magnam esse deserunt accusantium laborum repellendus blanditiis facilis quibusdam. Reprehenderit ex suscipit iste!
    sddd
  </div>
}
