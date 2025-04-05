import mongoose, { Schema, Document } from 'mongoose';

// Define the Schedule interface
export interface ISchedule extends Document {
  date: Date;
  time: string;
  selectBoxType: string;
  userEmail: string; // Email of the logged-in user
}

// Define the Schedule schema
const ScheduleSchema: Schema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    selectBoxType: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Schedule model
const Schedule = mongoose.models.Schedule || mongoose.model<ISchedule>('Schedule', ScheduleSchema);
export default Schedule;