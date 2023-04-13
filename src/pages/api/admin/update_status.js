// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export default async function handler(req, res) {
    console.log(req.body)
    const { id, status } = req.body;

	await new Promise(async (resolve, reject) => {
		const user = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                status: status,
            }
        });
		

		
				return res.status(200).send({
					data: user,
					status: true,
				});
	});
}
