import { useNavigate, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
import { authorize } from "./redux/reducers/authReducer";
import { useEffect } from "react";

import WelcomePage from "./components/pages/WelcomePage/WelcomePage";
import TrackPage from "./components/pages/TrackPage/TrackPage";
import Header from "./components/Header/Header";
import Trello from "./models/Trello";


function App() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
  
	const authenticationSuccess = () => {
		console.log('Soft Login: SUCCESS')

    dispatch(authorize())
    navigate('/track')
   }

	const authenticationFailure = () => {
		console.error('Soft Login: FAILURE\n')
    
    navigate('/welcome')
   }
	
	// Trying to login using stored token and key...
	useEffect(() => {
		Trello.authorize({
			interactive: false,
			success: authenticationSuccess,
			error: authenticationFailure
		})

    if( Trello.authorized() ) {
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