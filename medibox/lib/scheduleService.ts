import Schedule, { ISchedule } from '../models/scheduleModel';
import connectToDatabase from './dbconfig';

// Get all schedules by user email
export const getSchedulesByEmail = async (userEmail: string): Promise<ISchedule[]> => {
  try {
    connectToDatabase();
    console.log('Fetching schedules for user:', userEmail);
    const schedules = await Schedule.find({ userEmail });
    return schedules;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching schedules: ${error.message}`);
    } else {
      throw new Error('Error fetching schedules: An unknown error occurred');
    }
  }
};

// Save a new schedule
export const saveSchedule = async (scheduleData: Partial<ISchedule>): Promise<ISchedule> => {
  try {
    connectToDatabase();
    const schedule = new Schedule(scheduleData);
    const savedSchedule = await schedule.save();
    if (!savedSchedule) {
      throw new Error('Failed to save the schedule');
    }
    return savedSchedule;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error saving schedule: ${error.message}`);
    } else {
      throw new Error('Error saving schedule: An unknown error occurred');
    }
  }
};

// Delete a single schedule by ID
export const deleteScheduleById = async (scheduleId: string, userEmail: string): Promise<void> => {
  try {
    connectToDatabase();
    const result = await Schedule.findOneAndDelete({ _id: scheduleId, userEmail });
    if (!result) {
      throw new Error('Schedule not found or does not belong to the user');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting schedule: ${error.message}`);
    } else {
      throw new Error('Error deleting schedule: An unknown error occurred');
    }
  }
};

// Edit a single schedule by ID
export const editScheduleById = async (
  scheduleId: string,
  userEmail: string,
  updatedData: Partial<ISchedule>
): Promise<ISchedule> => {
  try {
    connectToDatabase();
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { _id: scheduleId, userEmail },
      updatedData,
      { new: true }
    );
    if (!updatedSchedule) {
      throw new Error('Schedule not found or does not belong to the user');
    }
    return updatedSchedule;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error editing schedule: ${error.message}`);
    } else {
      throw new Error('Error editing schedule: An unknown error occurred');
    }
  }
};

