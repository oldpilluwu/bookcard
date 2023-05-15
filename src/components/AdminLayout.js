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
                <Grid item xs={2} style={{ height: "100vh", backgroundColor: "whitesmoke"}}>
                    <h1 className="text-2xl text-gray-800 p-6 font-bold">BOOKCARD</h1>
                    <hr/>
                    <Sidebar />
                </Grid>
                <Grid item xs={10}>
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