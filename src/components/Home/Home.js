import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Home = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const userEmail =localStorage.getItem("user")

	return (
		<Box sx={{ flexGrow: 1 }}>
		<AppBar position="static">
		  <Toolbar>
			<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
			  {userEmail}
			</Typography>
			<Button color="inherit" onClick={handleLogout}>Logout</Button>
		  </Toolbar>
		</AppBar>
	  </Box>
	);
};

export default Home;