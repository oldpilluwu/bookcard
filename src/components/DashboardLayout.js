import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Box, Container, Grid } from "@mui/material";
import { DashboardHeader } from "./DashboardHeader";

export default function DashboardLayout({ page, children }) {
	useEffect(() => {
		var user = JSON.parse(localStorage.getItem("user"));
		if (
			user == null ||
			user == undefined
		) {
			Router.push("/admin/login");
		}
	}, []);

    return(
        <div style={{height: "100vh", width: "auto"}}>
            <Grid container>
                
                
                    <DashboardHeader page={page} />
                    <Container>
					{children}
					</Container>
                
            </Grid>
        </div>
    )

}
