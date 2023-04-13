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
			},
		});
		if (!user) {
			res.status(401).json({ status: false });
			return;
		}

		bcrypt.compare(password, user.password, (err, result) => {
			if (result) {
				delete user.password;
				return res.status(200).send({
					data: user,
					status: true,
				});
			}
			return res.send({
				status: false,
			});
		});
	});
}
