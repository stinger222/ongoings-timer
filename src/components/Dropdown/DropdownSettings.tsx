import { fetchSelectedBoardLists, selectBoard} from "../../redux/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import { setActiveMenu } from "../../redux/reducers/headerReducer";
import styles from './Dropdown.module.css';

export default function DropdownMain({ className }: any) {
  const dispatch = useAppDispatch()
	const { trelloBoards, selectedBoardName, selectedBoardLists }: any = useAppSelector(state => state.authReducer) 

	const handleBoardSelect = (e: any) => {
		dispatch(selectBoard(e.target.value))
		
		const selectedBoardId: string = trelloBoards.find((board: any) => {
			return board.name === e.target.value
		}).id
		dispatch(fetchSelectedBoardLists(selectedBoardId))
	}

  return <div className={className}>
    <h1 className={styles.header}>
      <BackIcon
        className={styles.header_back}
        onClick={() => dispatch(setActiveMenu('main'))}
      />
      Trello Settings
    </h1>

		<div className={styles.body}>
			<div className={styles.settings_item}>
				<span className={styles.setting_name}>Board:</span>
				{
					(!trelloBoards || trelloBoards.length == 0) && 
						<i className={styles.not_found}>No boards found...</i>
				}

				{ 
					(trelloBoards && trelloBoards.length > 0) &&
						<select onChange={handleBoardSelect} value={selectedBoardName}>
							{
								(trelloBoards as []).map((board: any) => {
									return (
										<option value={board.name} key={board.name}>
											{board.name}
										</option>
									)
								})
							}
						</select>
				}
			</div>

			<div className={styles.settings_item}>
				<span className={styles.setting_name}>List:</span>
				{
					(!selectedBoardLists || selectedBoardLists.length == 0) && 
						<i className={styles.not_found}>No lists found...</i>
				}

				{ 
					(selectedBoardLists && selectedBoardLists.length > 0) &&
						<select>
							{
								(selectedBoardLists as []).map((list: any) => {
									return (
										<option key={list.name}>
											{list.name}
										</option>
									)
								})
							}
						</select>
				}
			</div>
		</div>

  </div>
}