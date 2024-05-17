import { Request, Response } from 'express';
import { StdudentService } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { students: studentData } = req.body;
    const result = await StdudentService.createStudentIntoDb(studentData);

    // send response;

    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StdudentService.getAllStudentIntoDb();

    // send response;

    res.status(200).json({
      success: true,
      message: 'student is retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StdudentService.getSingleStudentIntoDb(studentId);

    // send response;

    res.status(200).json({
      success: true,
      message: 'student is retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
};
