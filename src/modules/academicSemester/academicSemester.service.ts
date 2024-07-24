import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../app/errors/AppError';
import {
  academicSemesterNameCodeMapping,
  academicSemesterSearchableFields,
} from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import QueryBuilder from '../../app/builder/QueryBuilder';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapping[payload.name] !== payload.code) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invelid semester code!');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemesterIntoDb = async (query: Record<string, unknown>) => {
  const academicSemestersQuery = new QueryBuilder(
    AcademicSemester.find(),
    query,
  )
    .search(academicSemesterSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const data = await academicSemestersQuery.modelQuery;
  const meta = await academicSemestersQuery.countTotal();
  return {
    meta,
    data,
  };
};
const getSingleAcademicSemesterIntoDb = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

const updateSingleAcademicSemesterIntoDb = async (
  id: string,
  data: Partial<TAcademicSemester>,
) => {
  if (
    data.name &&
    data.code &&
    academicSemesterNameCodeMapping[data.name] !== data.code
  ) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await AcademicSemester.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true },
  );
  return result;
};

export const academicSemesterService = {
  createAcademicSemesterIntoDb,
  getAcademicSemesterIntoDb,
  getSingleAcademicSemesterIntoDb,
  updateSingleAcademicSemesterIntoDb,
};
