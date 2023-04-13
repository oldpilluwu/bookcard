import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Header() {
	const router = useRouter();

	const Signout = () => {
		localStorage.removeItem("user");
		router.push("/admin/login");
	}


	return (
		<header style={{display: "flex", justifyContent:"end", padding: "1rem"}}>
			
			
						<Button onClick={Signout} variant="contained" color="error" >
							Signout
						</Button>
				
			
		</header>
	);
}

export default Header;