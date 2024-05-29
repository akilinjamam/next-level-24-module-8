import { academicSemesterNameCodeMapping } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapping[payload.name] !== payload.code) {
    throw new Error('Invelid semester code!');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAcademicSemesterIntoDb = async () => {
  const result = await AcademicSemester.find({});
  return result;
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
    throw new Error('Invalid Semester Code');
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
