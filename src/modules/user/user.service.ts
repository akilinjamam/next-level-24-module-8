/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../app/config/index';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { AppError } from '../../app/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { sendImageToCloudinary } from '../../app/utils/sendImageToCloudinary';

const createStudentIntoDb = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = 'student';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const admissionSemester = await AcademicSemester.findById(
      payload.admissionSemester,
    );

    // send image to cloudinary;

    // set auto generated id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    //  create a user (transaction -1)

    // create a user
    // first transection -1
    const newUser = await User.create([userData], { session });

    const filname = `${newUser[0].id}-${payload?.name?.firstName}`;

    const imageData = await sendImageToCloudinary(file?.path, filname);

    console.log('result image :', imageData);

    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    if (newUser.length) {
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference id
      payload.profileImg = imageData?.secure_url;
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

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  console.log(payload.academicDepartment);

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    const filname = `${newUser[0].id}-${payload?.name?.firstName}`;

    const imageData = await sendImageToCloudinary(file?.path, filname);

    console.log('result image admin :', imageData);

    //create a faculty
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    payload.profileImg = imageData?.secure_url;

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};
  console.log('admin');
  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    const filname = `${newUser[0].id}-${payload?.name?.firstName}`;

    const imageData = await sendImageToCloudinary(file?.path, filname);

    console.log('result image admin :', imageData);

    //create a admin
    if (!newUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    payload.profileImg = imageData?.secure_url;

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }

  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }

  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

export const userService = {
  createStudentIntoDb,
  createAdminIntoDB,
  createFacultyIntoDB,
  getMe,
  changeStatus,
};
