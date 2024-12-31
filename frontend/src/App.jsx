import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminView from "./pages/AdminView";
import UserView from "./pages/UserView";
import PageNotFound from "./components/PageNotFound";
const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/admin" element={<AdminView />} />
				<Route path="/user" element={<UserView />} />
				<Route path="/" element={<UserView />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</Router>
	);
};

export default App;
