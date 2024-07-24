import mongoose from 'mongoose';
import Student from './student.model';
import { AppError } from '../../app/errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { TStudent } from './student.interface';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';
import User from '../user/user.model';

const getAllStudentIntoDb = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate('academicDepartment academicFaculty'),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleStudentIntoDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findById({ _id: id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const dleteStudentIntoDb = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    const userId = deletedStudent?.user;

    if (!deletedStudent) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete student');
    }

    const deletedUser = await User.findByIdAndUpdate(
      { userId },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error as string);
  }
};

const updateStudentIntoDb = async (id: string, payload: Partial<TStudent>) => {
  const { name, localGuardian, guardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [keys, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${keys}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [keys, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${keys}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [keys, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${keys}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findByIdAndUpdate(
    { id: id },
    modifiedUpdatedData,
    { new: true },
  );

  return result;
};

export const StdudentService = {
  getAllStudentIntoDb,
  getSingleStudentIntoDb,
  dleteStudentIntoDb,
  updateStudentIntoDb,
};
