// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export default async function handler(req, res) {

	await new Promise(async (resolve, reject) => {
		const user = await prisma.user.findMany({
            where: {
                role: "RENTER",
                status: "PENDING",
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                phone: true,
            }

        });
		

		
				return res.status(200).send({
					data: user,
					status: true,
				});
	});
}
