import Header from "./components/Header/Header";
import TrackPage from "./components/pages/TrackPage/TrackPage";
import SettingsPage from "./components/pages/SettingsPage/SettingsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return <>
			<Header/>
			<TrackPage/>
	</>
}

export default App;