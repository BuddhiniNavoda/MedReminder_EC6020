import { mockSchedule } from "../../app/scheduleData";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(mockSchedule);
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
