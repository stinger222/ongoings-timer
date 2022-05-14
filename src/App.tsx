import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SettingsPage from "./components/pages/SettingsPage/SettingsPage";
import TrackPage from "./components/pages/TrackPage/TrackPage";


function App() {
  return (
	<Router>
		<Routes>
			<Route path="/" element={<TrackPage/>}/>
			<Route path="/settings" element={<SettingsPage/>}/>
		</Routes>
	</Router>
	)
}

export default App;
