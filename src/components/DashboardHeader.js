import { Button, Container } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";


export const DashboardHeader = () => {
    const router = useRouter();

	const Signout = () => {
		localStorage.removeItem("user");
		router.push("/auth/login");
	}


	return (
		<Container style={{display: "flex", justifyContent:"end", padding: "1rem"}}>
			
			
						<Button onClick={Signout} variant="contained" color="error" >
							Signout
						</Button>
				
			
		</Container>
	);
}
