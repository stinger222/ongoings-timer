import { useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import TrackPage from "./components/pages/TrackPage/TrackPage";
import WelcomePage from "./components/pages/WelcomePage/WelcomePage";
import { useAppDispatch } from "./hooks/redux";
import { signIn } from "./redux/reducers/authReducer";


function App() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()


	const authenticationSuccess = () => {
		console.log('SUCCESS');
		navigate('/track')
	}

	const authenticationFailure = () => {
		console.log('FAILURE')
		navigate('/welcome')
	}
	
	// Signed Up?...
	useEffect(() => {
		(window as any).Trello.authorize({
			name: 'Ongoings Timer',
			scope: {
				read: true,
				write: true,
				account: false
			},
			interactive: false,
			expiration: '30days',
			success: authenticationSuccess,
			error: authenticationFailure
		})

		console.log("LOGGED??????: ", (window as any).Trello.authorized());

		if ((window as any).Trello.authorized()) {
			dispatch(signIn())
		}
	}, [])

	return <>
		<Header />
		<Routes>
			<Route path="/welcome" element={<WelcomePage/>}/>
			<Route path="/track" element={<TrackPage/>}/>
			{/* <Route path="*" element={<Navigate to='/welcome' replace/>}/> */}
		</Routes>
	</>
}

export default App;