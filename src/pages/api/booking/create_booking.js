// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import { toast } from "react-toastify";

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

        const booking2 = await prisma.booking.findFirst({
            where: {
                placeId: placeId,
                date: date,
                slot: slot,
                userId: userId,
            }
        });
        if(booking2){
            return res.status(400).send({
                message: "You already have a booking in this slot",
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
            message: "Booking created successfully",
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
