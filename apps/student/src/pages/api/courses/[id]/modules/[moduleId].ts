import { queries } from "@repo/utils";
import { ModuleInputInfo } from "@repo/utils/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        handleGetModule(req, res);
        break;
      default:
        res.status(405).json({ error: true, message: "Method Not Allowed" });
        break;
    }
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Error" });
  }
}

async function handleGetModule(req: NextApiRequest, res: NextApiResponse) {
  try {
    // TODO: Implement enrollment check to access module
    const { id } = req.query;
    if (!id)
      return res.status(401).json({ error: true, message: "No module has been specified" });

    const module = await queries.getModule(id.toString());
    res.status(200).json({ error: false, module });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Error" });
  }
}
