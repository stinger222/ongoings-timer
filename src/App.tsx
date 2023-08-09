import { useNavigate, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
import { authorize } from "./redux/reducers/authSlice";
import { useEffect } from "react";
import { Trello } from "./constants/constants";

import WelcomePage from "./components/pages/WelcomePage/WelcomePage";
import TrackPage from "./components/pages/TrackPage/TrackPage";
import Header from "./components/Header/Header";


function App() {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
  
	const onAuthSuccess = () => {
		console.log('Soft Login: SUCCESS')

    dispatch(authorize())
    navigate('/track')
   }

	const onAuthFailure = () => {
		console.error('Soft Login: FAILURE\n')
    
    navigate('/welcome')
   }
	
	// Trying to login using stored token and key...
	useEffect(() => {
		Trello.authorize({
			interactive: false,
			success: onAuthSuccess,
			error: onAuthFailure
		})

    if(Trello.authorized()) {
      dispatch(authorize())
    }
	}, [])

	return <>
		<Routes>
			<Route path="/welcome" element={<WelcomePage/>}/>
			<Route path="/track" element={<>
		    <Header />
        <TrackPage/>
      </>}
      />
		</Routes>
	</>
}

export default App
