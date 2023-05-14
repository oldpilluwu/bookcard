
import { Container, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import useUser from "@/lib/useUser";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";


export const DashboardHeader = ({data}) => {
	const page = "";
	// const user = jwtDecode(data);
	// console.log(data);
	// console.log(Cookies.get("auth"))
	
    const router = useRouter();
	// const user = jwtDecode(Cookies.get("auth"));
	const user = useUser();
	
	const [openNav, setOpenNav] = React.useState(false);

	React.useEffect(() => {
		window.addEventListener(
		  "resize",
		  () => window.innerWidth >= 960 && setOpenNav(false)
		);
	  }, []);
	
	

	const Signout = async () => {
		localStorage.removeItem("user");
		// router.push("/auth/login");
		// const res = await fetch('http://localhost:3000/api/auth/signout', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json', 'Set-Cookie': 'auth=; path=/; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT' },
		// 	body: JSON.stringify({}),
		//   })
		router.push("/auth/login");
	}

	const navList = (
		<ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
		  <Typography
			as="li"
			variant="small"
			color="blue-gray"
			className="p-1 font-normal text-md"
		  >
			<Link href="/dashboard/myBookings" className="flex items-center">
			  My Bookings
			</Link>
		  </Typography>
		  {user.role === "RENTER" && (<Typography
			as="li"
			variant="small"
			color="blue-gray"
			className="p-1 font-normal text-md"
		  >
			<Link href="/dashboard/myPlaces" className="flex items-center">
			  My Places
			</Link>
		  </Typography>)}
		  {user.role === "RENTER" && (
			<Typography
			as="li"
			variant="small"
			color="blue-gray"
			className="p-1 font-normal text-md"
		  >
			<Link href="/dashboard/addPlaces" className="flex items-center">
			  Add Places
			</Link>
		  </Typography>
		  )}
		  
		</ul>
	  );
	 
	  return (
		<>
		  <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
			<div className="flex items-center justify-between text-blue-gray-900">
			  <Typography
				as="a"
				href="/dashboard"
				className="mr-4 cursor-pointer py-1.5 font-bold text-lg leading-relaxed inline-block whitespace-nowrap uppercase text-blue-gray-900"
			  >
				Bookcard
			  </Typography>
			  <div className="flex items-center gap-4">
				<div className="mr-4 hidden lg:block">{navList}</div>
				<Button
				  variant="filled"
				  size="sm"
				  className="hidden lg:inline-block bg-red-600"
				  onClick={Signout}
				>
				  <span>Sign out</span>
				</Button>
				<IconButton
				  variant="text"
				  className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
				  ripple={false}
				  onClick={() => setOpenNav(!openNav)}
				>
				  {openNav ? (
					<svg
					  xmlns="http://www.w3.org/2000/svg"
					  fill="none"
					  className="h-6 w-6"
					  viewBox="0 0 24 24"
					  stroke="currentColor"
					  strokeWidth={2}
					>
					  <path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					  />
					</svg>
				  ) : (
					<svg
					  xmlns="http://www.w3.org/2000/svg"
					  className="h-6 w-6"
					  fill="none"
					  stroke="currentColor"
					  strokeWidth={2}
					>
					  <path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M4 6h16M4 12h16M4 18h16"
					  />
					</svg>
				  )}
				</IconButton>
			  </div>
			</div>
			<MobileNav open={openNav}>
			  {navList}
			  <Button variant="filled" size="sm" fullWidth className="mb-2 bg-red-600" onClick={Signout}>
				<span>Sign out</span>
			  </Button>
			</MobileNav>
		  </Navbar>
		  
		</>
	  );
	

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

		// <ClientOnly>
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
		// </ClientOnly>

	);
}

// export async function getServerSideProps(context) {
// 	const cookie = Cookies.get("auth");
// 	console.log(cookie);
// 	const data = jwtDecode(cookie);
// 	return {
// 		props: {data}
// 	}
	
// }

