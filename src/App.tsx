import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Header from "./components/Header/Header";
import TrackPage from "./components/pages/TrackPage/TrackPage";
import SettingsPage from "./components/pages/SettingsPage/SettingsPage";


function App() {
  return <>
		<Router>
			<Header/>
			<Routes>
				<Route path="/settings" element={<SettingsPage/>}/>
				<Route path="/" element={<TrackPage/>}/>
			</Routes>
		</Router>
	</>
}

export default App;
