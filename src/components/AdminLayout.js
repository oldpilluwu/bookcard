import React, { useEffect, useState } from "react";
import Header from "./AdminHeader";
import Sidebar from "./AdminSidebar";
import Router from "next/router";
import { Box, Container, Grid } from "@mui/material";
import ClientOnly from "@/lib/clientOnly";
import Loading from "./Loading";

function AdminLayout({ children }) {
    const [loading, setLoading] = useState(true);
	useEffect(() => {
		var user = JSON.parse(localStorage.getItem("admin"));
		if (
			user == null ||
			user == undefined ||
			user.role !== "ADMIN"
		) {
			Router.push("/admin/login");
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
        <div style={{height: "100vh", width: "auto"}}>
            <Grid container>
                <Grid item xs={3} style={{ height: "100vh", backgroundColor: "InfoBackground"}}>
                    <Box height={60} />
                    <Sidebar />
                </Grid>
                <Grid item xs={9}>
                    <Header />
                    <Container>
					{children}
					</Container>
                </Grid>
            </Grid>
        </div>
        </ClientOnly>
    )

}

export default AdminLayout;