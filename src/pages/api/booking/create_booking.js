// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default async function handler(req, res) {
    console.log(req.body)
	const { userId, slot, placeId, date } = req.body;

    try{
        const booking = await prisma.booking.findFirst({
            where: {
                placeId: placeId,
                date: date,
                slot: slot,
                status: "CONFIRMED"
            }
        });
        if(booking){
            return res.status(400).send({
                message: "Slot already booked",
                status: false,
            });
        }
        await prisma.booking.create({
            data: {
                slot: slot,
                date: date,
                placeId: placeId,
                userId: userId,
                status: "PENDING"
            }
        });
        return res.status(200).send({
            status: true,
        });
    }catch(err){
        console.log(err);
        return res.status(400).send({
            meesage: err.message,
            status: true,
        });
    }


        



}
