import { Navigate, useNavigate, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
import { useEffect } from "react";
import WelcomePage from "./components/pages/WelcomePage/WelcomePage";
import TrackPage from "./components/pages/TrackPage/TrackPage";
import Header from "./components/Header/Header";


function App() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const authenticationSuccess = () => {
		console.log('SUCCESS');
		navigate('../track', {replace: true})
	}

	const authenticationFailure = () => {
		console.log('FAILURE')
		navigate('../welcome', {replace: true})
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

	}, [])

	return <>
		<Header />
		<Routes>
			<Route path="/welcome" element={<WelcomePage/>}/>
			<Route path="/track" element={<TrackPage/>}/>
			<Route path="*" element={<Navigate to='/welcome' replace/>}/>
		</Routes>
	</>
}

export default App;