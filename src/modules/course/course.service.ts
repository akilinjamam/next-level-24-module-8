import mongoose from 'mongoose';
import QueryBuilder from '../../app/builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { CourseFaculty, course } from './course.model';
import { AppError } from '../../app/errors/AppError';
import { StatusCodes } from 'http-status-codes';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await course
    .findById(id)
    .populate('preRequisiteCourses.course');
  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const updateCourseFromDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...CourseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateBasicCourseInfo = await course.findOneAndUpdate(
      { _id: id },
      CourseRemainingData,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      //filter out the deleted fields for deleting data
      const dleletedPreREquisites = preRequisiteCourses
        .filter((el) => el?.course && el.isDeleted)
        ?.map((el) => el.course);

      const deletedPreRequisiteCourses = await course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: dleletedPreREquisites } },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update');
      }

      //filter out the new course fields for adding data

      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el?.course && !el?.isDeleted,
      );

      const newPreRequisiteCourses = await course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        { new: true, runValidators: true, session },
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to update');
      }

      const result = await course
        .findById(id)
        .populate('preRequisiteCourses.course');

      return result;
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed!!');
  }
};

const assignFacultieswithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true },
  );

  return result;
};

const removeFacultiesWithCourseIntoDB = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { new: true },
  );

  return result;
};

export const courseService = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
  updateCourseFromDB,
  assignFacultieswithCourseIntoDB,
  removeFacultiesWithCourseIntoDB,
};
