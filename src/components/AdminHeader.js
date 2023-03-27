import Link from "next/link";
import React, { useEffect, useState } from "react";

function Header() {
	const [user, setUser] = useState({});

	useEffect(() => {
		setUser(JSON.parse(localStorage.getItem("user")));
	}, []);

	return (
		<header className="h-20 p-3 bg-gray-light flex">
			<div className="block h-16 p-3 w-64 flex items-center justify-start">
				
			</div>
			<div className="flex flex-grow items-center justify-end p-3 pl-6 pr-6 ">
				<div className="flex items-center justify-end">
					<Link href="/admin/dashboard/profile">
						<button className="h-full p-3 rounded transition-all duration-200 pl-2 pr-2 flex items-center justify-around hover:bg-gray-dark hover:bg-opacity-10">
							
							<span className="ml-2 text-xl">
								{user ? user.name : ""}
							</span>
						</button>
					</Link>
				</div>
			</div>
		</header>
	);
}

export default Header;