// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export default async function handler(req, res) {

	await new Promise(async (resolve, reject) => {
		const user = await prisma.place.findMany({
            select: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                }},
                id: true,
                name: true,
                address: true,
                description: true,
                image: true,
                price: true,
            }

        });
		

		
				return res.status(200).send({
					data: user,
					status: true,
				});
	});
}
