import Header from "./components/Header/Header";
import TrackPage from "./components/pages/TrackPage/TrackPage";
import SettingsPage from "./components/pages/SettingsPage/SettingsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


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