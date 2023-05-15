// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { select } from "@material-tailwind/react";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export default async function handler(req, res) {
    console.log(req.body)

    try{
        const bookings = await prisma.booking.findMany({

            select: {
                id: true,
                slot: true,
                date: true,
                status: true,
                place: {
                    select: {
                        name: true,
                        id: true,
                        user: {
                            select: {
                                name: true,
                                email: true,
                                phone: true,
                            }
                        }
                    }
                },
                user: {
                    select: {
                        name: true,
                        email: true,
                        phone: true,
                    }
                }
        
    
            }
        });
        
        
        return res.status(200).send({
            status: true,
            data: bookings,
        });
    }catch(err){
        console.log(err);
        return res.status(400).send({
            meesage: err.message,
            status: true,
        });
    }

}
