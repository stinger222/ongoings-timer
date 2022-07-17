import { useEffect, useRef, useState } from "react";
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setActiveMenu, setDropdownState } from "../../redux/reducers/headerReducer";

import styles from "./Dropdown.module.css";

import DropdownAddCard from "./DropdownAddCard";
import DropdownMain from "./DropdownMain";
import DropdownSettings from "./DropdownSettings";

export default function Dropdown({className}: any) {
  const dispatch = useAppDispatch()
  const activeMenu = useAppSelector(state => state.headerReducer.dropdownActiveMenu)
  
  const [menuHeight, setMenuHeight] = useState(null)  
  const menuRef = useRef(null)

  const calculateHeight = (element: any) => { 
    setMenuHeight(element.offsetHeight)
  }

  useEffect(() => {
    calculateHeight(menuRef.current)

    return () => {
      dispatch(setActiveMenu('main'))
    }
  }, [menuRef])

  return (
    <div
      ref={menuRef}
      className={`${className} ${styles.dropdown}`}
      style={{height: menuHeight ?? 'max-content'}}
    >
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={200}
        onEnter={calculateHeight}
        classNames={{
          enterActive: styles.mainMenuEnterActive,
          enterDone: styles.mainMenuEnterDone,
          exitActive: styles.mainMenuExitActive,
          exitDone: styles.mainMenuExitDone
        }}
      > 
        <DropdownMain /> 
      </CSSTransition>
      
      <CSSTransition
        in={activeMenu === 'trello_settings'}
        unmountOnExit
        timeout={200}
        onEnter={calculateHeight}
        classNames={{
          enterActive: styles.mainMenuEnterActive,
          enterDone: styles.mainMenuEnterDone,
          exitActive: styles.mainMenuExitActive,
          exitDone: styles.mainMenuExitDone
        }}
      >
       <DropdownSettings />
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'add_card'}
        unmountOnExit
        timeout={200}
        onEnter={calculateHeight}
        classNames={{
          enterActive: styles.mainMenuEnterActive,
          enterDone: styles.mainMenuEnterDone,
          exitActive: styles.mainMenuExitActive,
          exitDone: styles.mainMenuExitDone
        }}
      >
       <DropdownAddCard/>
      </CSSTransition>
    </div>
  )
}