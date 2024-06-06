import { Schema, model } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const coursesSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  code: {
    type: Number,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },

  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const course = model<TCourse>('Course', coursesSchema);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
