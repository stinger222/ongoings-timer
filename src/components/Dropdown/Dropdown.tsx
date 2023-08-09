import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";

import { setActiveMenu } from "../../redux/reducers/headerSlice";
import { fetchSelectedBoardLists, fetchTrelloBoards } from "../../redux/reducers/authSlice";

import DropdownAddCard from "./DropdownAddCard";
import DropdownMain from "./DropdownMain";
import DropdownSettings from "./DropdownSettings";

import styles from "./Dropdown.module.css";
import { CSSTransition } from 'react-transition-group';

export default function Dropdown({className}: any) {
  const dispatch = useAppDispatch()
  const activeMenu = useAppSelector(state => state.headerReducer.dropdownActiveMenu)
	const { trelloBoards, selectedBoard } = useAppSelector(state => state.authReducer)
  
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

	useEffect(() => {
		if (!trelloBoards) {
			console.log('Fetching boards...');
			dispatch(fetchTrelloBoards())
		}
    
    if (selectedBoard) { 
      dispatch(fetchSelectedBoardLists(selectedBoard.id))
    }
	}, [])

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
      ><DropdownMain className={styles.dropdown_content} /></CSSTransition>
      
      <CSSTransition
        in={activeMenu === 'trello_settings'}
        unmountOnExit
        timeout={200}
        onEnter={calculateHeight}
        classNames={{
          enterActive: styles.secondaryMenuEnterActive,
          enterDone: styles.secondaryMenuEnterDone,
          exitActive: styles.secondaryMenuExitActive,
          exitDone: styles.secondaryMenuExitDone
        }}
      ><DropdownSettings className={styles.dropdown_content} /></CSSTransition>

      <CSSTransition
        in={activeMenu === 'add_card'}
        unmountOnExit
        timeout={200}
        onEnter={calculateHeight}
        classNames={{
          enterActive: styles.secondaryMenuEnterActive,
          enterDone: styles.secondaryMenuEnterDone,
          exitActive: styles.secondaryMenuExitActive,
          exitDone: styles.secondaryMenuExitDone
        }}
      ><DropdownAddCard className={`${styles.dropdown_content} ${styles.add_card_menu}`} /></CSSTransition>
    </div>
  )
}