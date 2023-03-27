import React from "react";
import { withRouter } from "next/router";
import Link from "next/link";
import { Container, Icon, Typography } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import ArticleIcon from '@mui/icons-material/Article';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

function NavLink({icon, label = "Label", href = "#", router }) {
	const { pathname } = router;

	return (
		<Link href={href} >
            <Container  style={{display: "flex", alignItems: "center", padding: "1rem", backgroundColor: pathname === href ? "lavender" : "", color: pathname === href ? "MenuText" : "", transition: "all", transitionDuration: "200", height: "4rem", margin: " 0.5rem 0 0.5rem 0", borderRadius: "0px 4rem 4rem 0px"}}>
                {icon ? icon : ""}
                <Typography marginLeft="2rem" variant="h6"> {label} </Typography>
            </Container>
			
		</Link>
	);
}

const LinkAction = withRouter(NavLink);

const routes = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <DashboardIcon/>
    },
    {
        label: "Users",
        href: "/admin/users",
        icon: <GroupIcon/>
    },
    {
        label: "Renters",
        href: "/admin/renters",
        icon: <PersonIcon/>
    },
    {
        label: "Places",
        href: "/admin/places",
        icon: <PlaceIcon/>
    },
    {
        label: "Bookings",
        href: "/admin/bookings",
        icon: <EventAvailableIcon/>
    },
    {
        label: "Requests",
        href: "/admin/requests",
        icon: <ArticleIcon/>
    },
]

function Sidebar() {
    return (
        <nav >
            {routes.map((route, index) => (
                <LinkAction
                    key={index}
                    href={route.href}
                    label={route.label}
                    icon={route.icon}
                />
            ))}
        </nav>
    )
	// return (
	// 	<nav className="flex flex-col bg-gray-light h-full w-64 flex-shrink-0 py-4 px-1">
	// 		<LinkAction
	// 			href="/admin/dashboard"
				
	// 			label="Dashboard"
	// 		/>

	// 	</nav>
	// );
}

export default Sidebar;