// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const {id} = req.body;

	await new Promise(async (resolve, reject) => {
		const place = await prisma.place.findFirst({
            where: {
                id: id
            }
        });
		

		
				return res.status(200).send({
					data: place,
					status: true,
				});
	});
};
