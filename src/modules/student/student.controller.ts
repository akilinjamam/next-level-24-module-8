import { Request, Response } from 'express';
import { StdudentService } from './student.service';
import studentValidationSchema from './student.validation';
import studentZodSchema from './student.zodvalidation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { students: studentData } = req.body;

    // const { value, error } = studentValidationSchema.validate(studentData);

    const zodParsedData = studentZodSchema.parse(studentData);

    // if (error) {
    //   return res.status(500).json({
    //     success: true,
    //     message: 'student is failed to validate',
    //     data: error,
    //   });
    // }

    const result = await StdudentService.createStudentIntoDb(zodParsedData);

    // send response

    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: true,
      message: error.message || 'something went wrong',
      data: error,
    });
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
    res.status(500).json({
      success: true,
      message: 'something went wrong',
      data: error,
    });
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
    res.status(500).json({
      success: true,
      message: 'something went wrong',
      data: error,
    });
  }
};
const deletedStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StdudentService.dleteStudentIntoDb(studentId);

    // send response;

    res.status(200).json({
      success: true,
      message: 'student is deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: 'something went wrong',
      data: error,
    });
  }
};

export const studentControllers = {
  createStudent,
  getAllStudent,
  getSingleStudent,
  deletedStudent,
};
