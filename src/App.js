import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import EmailVerify from "./components/EmailVerify/EmailVerify";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Home />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
		</Routes>
	);
}

export default App;
