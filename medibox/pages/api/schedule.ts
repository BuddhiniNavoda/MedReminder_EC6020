import { NextApiRequest, NextApiResponse } from "next";
import Schedule from "../../models/scheduleModel";
import { deleteScheduleById, saveSchedule, editScheduleById } from "../../lib/scheduleService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const { userEmail } = req.query;
      if (!userEmail || typeof userEmail !== "string") {
        return res.status(400).json({ message: "User email is required" });
      }
      try {
        const schedules = await Schedule.find({ userEmail }).sort({ dateTime: 1 });
        res.status(200).json(schedules);
      } catch (error) {
        res.status(500).json({ message: `Error fetching schedules: ${(error as Error).message}` });
      }
      break;
    }

    case "POST": {
      const { dateTime, boxType, userEmail } = req.body;
      console.log("Received data:", !!dateTime, !!boxType, !!userEmail);
      if (!dateTime || !boxType || !userEmail) {
        return res.status(400).json({ message: "All fields are required" });
      }
      try {
        const savedSchedule = await saveSchedule({ dateTime, boxType, userEmail });
        res.status(201).json(savedSchedule);
      } catch (error) {
        res.status(500).json({ message: `Error saving schedule: ${(error as Error).message}` });
      }
      break;
    }

    case "DELETE": {
      const { scheduleId, userEmail } = req.query;
      if (!scheduleId || typeof scheduleId !== "string" || !userEmail || typeof userEmail !== "string") {
        return res.status(400).json({ message: "Schedule ID and user email are required" });
      }
      try {
        await deleteScheduleById(scheduleId, userEmail);
        res.status(204).end(); 
      } catch (error) {
        res.status(500).json({ message: `Error deleting schedule: ${(error as Error).message}` });
      }
      break;
    }

    case "PUT": {
      const { scheduleId, userEmail } = req.query;
      const { dateTime, boxType } = req.body;
      if (!scheduleId || typeof scheduleId !== "string" || !userEmail || typeof userEmail !== "string") {
        return res.status(400).json({ message: "Schedule ID and user email are required" });
      }
      try {
        const updatedSchedule = await editScheduleById(scheduleId, userEmail, { dateTime, boxType });
        res.status(200).json(updatedSchedule);
      } catch (error) {
        res.status(500).json({ message: `Error editing schedule: ${(error as Error).message}` });
      }
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
