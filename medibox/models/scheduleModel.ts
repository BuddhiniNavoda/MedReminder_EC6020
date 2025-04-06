import mongoose, { Schema, Document } from 'mongoose';

export interface ISchedule extends Document {
  dateTime: Date; 
  boxType: string;
  userEmail: string; 
}


const ScheduleSchema: Schema = new Schema(
  {
    dateTime: { 
      type: Date,
      required: true,
    },

    boxType: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const Schedule = mongoose.models.Schedule || mongoose.model<ISchedule>('Schedule', ScheduleSchema);
export default Schedule;