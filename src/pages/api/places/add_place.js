// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises"

export const config = {
    api: {
        bodyParser: false,
    },
};

const readFile = (req, saveLocally) => {
    

}
const prisma = new PrismaClient();

export default async function handler(req, res) {

    const date = new Date().getTime().toString();
    try {
        await fs.readdir(path.join(process.cwd(), "/public/uploads"));
    } catch (error) {
        await fs.mkdir(path.join(process.cwd(), "/public/uploads"));
    }
    
    
    try{
        const options = {};
        console.log("yes")
        options.uploadDir = path.join(process.cwd(), "/public/uploads");
        options.filename = (name, ext, path, form) => {
            console.log(path);
            return `${date}-${path.originalFilename}`;
        }
        console.log("no")
        const form = formidable(options);
        console.log("formidable")
        const data = await new Promise(async (resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                console.log("inside")
                if (err) return reject(err);
                resolve({ fields, files });
            });
        });

        await prisma.place.create({
            data: {
                name: data.fields.name,
                address: data.fields.address,
                description: data.fields.description,
                image: path.join("/uploads", data.files.image.newFilename),
                price: parseFloat(data.fields.price),
                userId: data.fields.userId,
                capacity: parseInt(data.fields.capacity),
            }
        });
        return res.status(200).send({
            status: true,
        });
    }catch(err){
        console.log(err);
        return res.status(400).send({
            meesage: err.message,
            status: false,
        });
    }


        



}
