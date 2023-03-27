// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
const uuid = require("uuid");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export default async function handler(req, res) {
	const { userId, oldPassword, newPassword } = req.body;

	await new Promise(async (resolve, reject) => {
		const user = await prisma.user.findFirst({
			where: {
				userId: userId,
			},
		});
		if (!user) {
			res.status(401).json({ status: false });
			return;
		}

		bcrypt.compare(oldPassword, user.password, (err, result) => {
			if (result) {
				bcrypt.hash(newPassword, 10, async (err, hash) => {
					const updateUser = await prisma.user.update({
						where: {
							userId: userId,
						},
						data: {
							password: hash,
						},
					});
					if (updateUser) {
						delete updateUser["password"];
						res.status(200).json({
							status: true,
						});
					} else res.status(401).json({ status: false });
				});
			}
			return res.send({
				status: false,
			});
		});
	});
}
