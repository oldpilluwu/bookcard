import React, { useEffect, useState } from "react";
import Header from "./AdminHeader";
import Sidebar from "./AdminSidebar";
import Router from "next/router";
import { Box, Container, Grid } from "@mui/material";

function AdminLayout({ children }) {
	useEffect(() => {
		var user = JSON.parse(localStorage.getItem("user"));
		if (
			user == null ||
			user == undefined ||
			user.role !== "ADMIN"
		) {
			Router.push("/admin/login");
		}
	}, []);

    return(
        <div style={{height: "100vh", width: "auto"}}>
            <Grid container>
                <Grid item xs={3} style={{ height: "100vh", backgroundColor: "InfoBackground"}}>
                    <Box height={60} />
                    <Sidebar />
                </Grid>
                <Grid item xs={9}>
                    <Header />
                    {children}
                </Grid>
            </Grid>
        </div>
    )

	return (
		<div className="h-screen flex flex-col font-sans">
			<Header />

			<div className="flex flex-1 h-screen overflow-x-hidden">
				<Sidebar />
				<main className="bg-gray-200 min-h-full w-full h-full p-6">
					{children}
				</main>
			</div>
		</div>
	);
}

export default AdminLayout;