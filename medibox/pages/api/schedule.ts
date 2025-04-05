import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../lib/dbconfig";
import Schedule from "../../models/scheduleModel";
import { deleteScheduleById, saveSchedule, editScheduleById } from "../../lib/scheduleService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase(); // Ensure the database is connected

  const { method } = req;

  switch (method) {
    case "GET": {
      // Get all schedules for a specific user
      const { userEmail } = req.query;
      if (!userEmail || typeof userEmail !== "string") {
        return res.status(400).json({ message: "User email is required" });
      }
      try {
        const schedules = await Schedule.find({ userEmail });
        res.status(200).json(schedules);
      } catch (error) {
        res.status(500).json({ message: `Error fetching schedules: ${(error as Error).message}` });
      }
      break;
    }

    case "POST": {
      // Save a new schedule
      const { date, time, selectBoxType, userEmail } = req.body;
      if (!date || !time || !selectBoxType || !userEmail) {
        return res.status(400).json({ message: "All fields are required" });
      }
      try {
        const savedSchedule = await saveSchedule({ date, time, selectBoxType, userEmail });
        res.status(201).json(savedSchedule);
      } catch (error) {
        res.status(500).json({ message: `Error saving schedule: ${(error as Error).message}` });
      }
      break;
    }

    case "DELETE": {
      // Delete a specific schedule by ID
      const { scheduleId, userEmail } = req.query;
      if (!scheduleId || typeof scheduleId !== "string" || !userEmail || typeof userEmail !== "string") {
        return res.status(400).json({ message: "Schedule ID and user email are required" });
      }
      try {
        await deleteScheduleById(scheduleId, userEmail);
        res.status(204).end(); // No content
      } catch (error) {
        res.status(500).json({ message: `Error deleting schedule: ${(error as Error).message}` });
      }
      break;
    }

    case "PUT": {
      // Edit a specific schedule by ID
      const { scheduleId, userEmail } = req.query;
      const { date, time, selectBoxType, medicineId } = req.body;
      if (!scheduleId || typeof scheduleId !== "string" || !userEmail || typeof userEmail !== "string") {
        return res.status(400).json({ message: "Schedule ID and user email are required" });
      }
      try {
        const updatedSchedule = await editScheduleById(scheduleId, userEmail, { date, time, selectBoxType, medicineId });
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
