import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
import { authorize } from "./redux/reducers/authReducer";
import { useEffect } from "react";

import WelcomePage from "./components/pages/WelcomePage/WelcomePage";
import TrackPage from "./components/pages/TrackPage/TrackPage";
import Header from "./components/Header/Header";


function App() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const authenticationSuccess = () => {
		console.log('Soft Login: SUCCESS');
    dispatch(authorize())

		navigate('/track')
	}

	const authenticationFailure = () => {
		console.error('Soft Login: FAILURE\n')
		navigate('/welcome')
	}
	
	// Trying to login using stored token and key...
	useEffect(() => {
		(window as any).Trello.authorize({
			interactive: false,
			success: authenticationSuccess,
			error: authenticationFailure
		})

    if((window as any).Trello.authorized()) {
      dispatch(authorize())
    }
	}, [])

	return <>
		<Header />
		<Routes>
			<Route path="/welcome" element={<WelcomePage/>}/>
			<Route path="/track" element={<TrackPage/>}/>
		</Routes>
	</>
}

export default App;