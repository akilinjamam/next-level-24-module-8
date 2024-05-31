import mongoose from 'mongoose';
import config from '../../app/config/index';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import { generateStudentId } from './user.utils';
import { AppError } from '../../app/errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const admissionSemester = await AcademicSemester.findById(
      payload.admissionSemester,
    );
    // set auto generated id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    //  create a user (transaction -1)

    // create a user
    // first transection -1
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    if (newUser.length) {
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference id
    }

    // create a student
    // second transection -2
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error as string);
  }
};

export const userService = {
  createStudentIntoDb,
};
