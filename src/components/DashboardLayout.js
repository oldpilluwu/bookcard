import React, { useEffect, useState } from "react";
import {useRouter} from "next/router";
import { Box, Container, Grid } from "@mui/material";
import { DashboardHeader } from "./DashboardHeader";
import ClientOnly from "@/lib/clientOnly";
import useUser from "@/lib/useUser";
import Loading from "./Loading";

export default function DashboardLayout({ page, children }) {
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	useEffect(() => {
		const user = localStorage.getItem("user");
		if(!user) {
			router.push("/auth/login");
		}
		else{
			setLoading(false);
		}
	}, []);

	if(loading) {
		return <Loading />
	}
    return(
		<ClientOnly>
			<Box style={{height: "100vh", width: "auto"}}>
                
                
				<DashboardHeader page={page} />
				<Container>
				{children}
				</Container>

	</Box>
	</ClientOnly>
    )

}
