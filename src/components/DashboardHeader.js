import { Button, Container, Typography, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import useUser from "@/lib/useUser";


export const DashboardHeader = (props) => {
	const {page=""} = props;
    const router = useRouter();
	const user = useUser()

	const Signout = () => {
		localStorage.removeItem("user");
		router.push("/auth/login");
	}


	return (
	// 	<AppBar position="relative">
    //     <Toolbar>
    //       <Typography variant="h6" color="inherit" noWrap>
    //         {page}
    //       </Typography>
	// 	  <Button variant="text" onClick={() => router.push('/dashboard/myBookings')}>My Bookings</Button>
    //     	<Button variant="text">My Places</Button>
    //         <Button variant="outlined" onClick={() => router.push('/dashboard/addPlaces')}>Add Places</Button>
    //     </Toolbar>
		
    //   </AppBar>

<Box sx={{ flexGrow: 1 }}>
<AppBar position="static">
  <Toolbar>
	
	<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
	  {page}
	</Typography>
	<Box mr={2}>
	<Button variant="text" color="inherit" onClick={() => router.push('/dashboard')}>Home</Button>
	<Button variant="text" color="inherit" onClick={() => router.push('/dashboard/myBookings')}>My Bookings</Button>
	{user.role == "RENTER" ? <Button variant="text" color="inherit" onClick={() => router.push('/dashboard/myPlaces')}>My Places</Button> : <></>}
	{user.role == "RENTER" ? <Button variant="text" color="inherit" onClick={() => router.push('/dashboard/addPlaces')}>Add Places</Button> : <></>}
	</Box>
	<Button variant="contained" style={{backgroundColor: "white", color: "GrayText"}} onClick={Signout}>Sign out</Button>
  </Toolbar>
</AppBar>
</Box>

		// <Container style={{display: "flex", justifyContent:"end", padding: "1rem"}}>
			
			
		// 				<Button onClick={Signout} variant="contained" color="error" >
		// 					Signout
		// 				</Button>
				
			
		// </Container>
	);
}
