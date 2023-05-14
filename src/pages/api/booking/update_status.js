// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default async function handler(req, res) {
    console.log(req.body)
	const { bookingId, slot, placeId, date, status } = req.body;

    try{
        if(status == "CONFIRMED"){
            await prisma.booking.updateMany({
                where: {
                    placeId: placeId,
                    date: date,
                    slot: slot,
                    status: "PENDING",
                },
                data: {
                    status: "CANCELLED",
                }
            });
        
            await prisma.booking.update({
                where: {
                    id: bookingId,
                },
                data: {
                    status: "CONFIRMED",
                }
            });
            return res.status(200).send({
                status: true,
            });
        }else if(status == "CANCELLED"){
            await prisma.booking.update({
                where: {
                    id: bookingId,
                },
                data: {
                    status: "CANCELLED",
                }
            });
            return res.status(200).send({
                status: true,
            });
        }
    }catch(err){
        console.log(err);
        return res.status(400).send({
            meesage: err.message,
            status: true,
        });
    }


}
