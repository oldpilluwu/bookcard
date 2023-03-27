// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export default async function handler(req, res) {
	const { email, title, name, userId } = req.body;
	await new Promise(async (resolve, reject) => {
		const user = await prisma.user.update({
			where: {
				userId: userId,
			},
			data: {
				email: email,
				name: name,
				title: title,
			},
		});
		if (user) {
			delete user["password"];
			res.status(200).json({ data: user, status: true });
		} else res.status(401).json({ status: false });
	});
}
