// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export default async function handler(req, res) {
	const { email, password } = req.body;
	console.log(req.body);

	await new Promise(async (resolve, reject) => {
		const user = await prisma.user.findFirst({
			where: {
				email: email,
				status: "ACTIVE",
				OR: [
					{role: "USER"},
					{role: "RENTER"}
				]
			},
		});
		if (!user) {
			console.log("User not found")
			res.status(401).json({ status: false, message: "User not found" });
			return;
		}

		bcrypt.compare(password, user.password, (err, result) => {
			console.log(result);
			if (result) {
				delete user.password;
				// const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
				// res.setHeader("Set-Cookie", cookie.serialize("auth", token, {
				// 	// httpOnly: true,
				// 	secure: process.env.NODE_ENV !== "development",
				// 	sameSite: "strict",
				// 	maxAge: 3600,
				// 	path: "/",
				// 	}));
				return res.json({ status: true, data: user})
			}
			return res.send({
				status: false,
				message: "Password does not match",
			});
		});
	});
}
