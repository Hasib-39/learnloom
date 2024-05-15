import { NextApiRequest, NextApiResponse } from "next";
import { queries } from "@repo/utils";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            return handleEnroll(req, res);
        } else if (req.method === "GET") {
            return handleGetEnroll(req, res);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: true, message: "Internal Error" });
    }
}

function handleEnroll(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const { studentId, amount, paymentMethod, phoneNo, paymentId } = req.body;
        const enroll = queries.enrollStudent({ courseId: id as string, studentId, amount, paymentMethod, phoneNo, paymentId });
        res.status(200).json({ error: false, data: enroll });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: true, message: "Internal Error" });
    }
}

async function handleGetEnroll(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;

        const session = await getSession(req, res);
        if (!session)
            return res.status(403).json({ error: true, message: "Unauthorized" });
        const student = await queries.getStudent(session.user.email);
        const enroll = queries.getEnrolledData(student.id, id as string);
        res.status(200).json({ error: false, data: enroll });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: true, message: "Internal Error" });
    }
}