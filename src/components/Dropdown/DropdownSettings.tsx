import { fetchSelectedBoardLists, selectBoard, selectList} from "../../redux/reducers/authReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ReactComponent as BackIcon } from "../../assets/back.svg";
import { setActiveMenu } from "../../redux/reducers/headerReducer";
import { ITrelloList } from "../../models/trelloModels";
import styles from './Dropdown.module.css';

export default function DropdownMain({ className }: any) {
  const dispatch = useAppDispatch()
	const {
    trelloBoards, selectedBoard, selectedList, selectedBoardLists
  }: any = useAppSelector(state => state.authReducer) 

	const handleBoardSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedBoard = trelloBoards.find((board: any) => {
			return board.name === e.target.value
		})

		const _selectedBoard = {
			id: selectedBoard.id,
			name: selectedBoard.name
		}
		
		dispatch(selectBoard(_selectedBoard))
		dispatch(fetchSelectedBoardLists(_selectedBoard.id))
    dispatch(selectList(null))
	}

	const handleListSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedList = selectedBoardLists.find((list: any) => {
			return list.name === e.target.value
		})

		const _selectedList: ITrelloList = {
			id: selectedList.id,
			name: selectedList.name
		}

		dispatch(selectList(_selectedList))
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
					(!trelloBoards || trelloBoards.length === 0) && 
						<i className={styles.not_found}>No boards found...</i>
				}

				{ 
					(trelloBoards && trelloBoards.length > 0) &&
						<select onChange={handleBoardSelect} value={selectedBoard?.name}>
							{
								!selectedBoard &&
									<option selected={true}>not selected...</option>
							}
							
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
					(!selectedBoardLists || selectedBoardLists.length === 0) && 
						<i className={styles.not_found}>No lists found...</i>
				}

				{ 
					(selectedBoardLists && selectedBoardLists.length > 0) &&
						<select onChange={handleListSelect} value={selectedList?.name}>
							{
								!selectedList &&
									<option selected={true}>not selected...</option>
							}

							{
								(selectedBoardLists as []).map((list: any) => {
									return (
										<option key={list.name} value={list.name}>
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