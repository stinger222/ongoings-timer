import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import TrackPage from "./components/pages/TrackPage/TrackPage";
import SettingsPage from "./components/pages/SettingsPage/SettingsPage";


function App() {
  return (
		<>
		<Header/>
		<Router>
			<Routes>
				<Route path="/" element={<TrackPage/>}/>
				<Route path="/settings" element={<SettingsPage/>}/>
			</Routes>
		</Router>
		</>
	)
}

export default App;
