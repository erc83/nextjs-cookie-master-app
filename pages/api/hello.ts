import { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    console.log( req.cookies )    // para obtener las cookies en la restfullapi

    res.status(200).json({
        name: 'John Doe',
        ...req.cookies
    })
}



