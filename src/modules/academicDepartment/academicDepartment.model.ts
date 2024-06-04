import { Schema, model } from 'mongoose';

import { TAcademicDepartment } from './academicDepartment.interface';
import { AppError } from '../../app/errors/AppError';
import { StatusCodes } from 'http-status-codes';

const academicDepartmentShema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'academic faculty id is requrired'],
      unique: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentShema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'this deparment is already exists!',
    );
  }

  next();
});

academicDepartmentShema.pre('updateOne', async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicDepartment.findOne(query);

  if (!isDepartmentExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this department doesnt exists!');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentShema,
);
