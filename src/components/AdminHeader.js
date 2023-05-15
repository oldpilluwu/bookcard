import { Typography } from "@material-tailwind/react";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Header() {
	const router = useRouter();
	const [user, setUser] = useState({});

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("admin")));
	}, []);

	const Signout = () => {
		localStorage.removeItem("admin");
		router.push("/admin/login");
	}


	return (
		<header className="flex justify-between p-4">
			
						<Typography color="blueGray" className="text-xl font-normal">
							<Link href="/admin/dashboard">Welcome, {user.name}!</Link>
						</Typography>
						<Button onClick={Signout} variant="contained" color="error" >
							Signout
						</Button>
				
			
		</header>
	);
}

export default Header;