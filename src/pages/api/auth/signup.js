// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";

const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export default async function handler(req, res) {
	const { email, password, name, phone } = req.body;

	await new Promise((resolve, reject) => {
		bcrypt.hash(password, 10, async (err, hash) => {
			const user = await prisma.user.create({
				data: {
					email: email,
					phone: phone,
					name: name,
					password: hash,
					role: "USER",
					status: "ACTIVE",
				},
			});
			if (user) {
				delete user["password"];
				res.status(200).json({ data: user, status: true });
			} else res.status(401).json({ status: false });
		});
	});
}
