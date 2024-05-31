import { TAcademicFaculty } from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAcademicFacultyIntoDb = async () => {
  const result = await AcademicFaculty.find({});
  return result;
};
const getSingleAcademicFacultyIntoDb = async (id: string) => {
  const result = await AcademicFaculty.findOne({ _id: id });
  return result;
};

const updateSingleAcademicFacultyIntoDb = async (
  id: string,
  data: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true },
  );
  return result;
};

export const academicFacultyService = {
  createAcademicFacultyIntoDb,
  getAcademicFacultyIntoDb,
  getSingleAcademicFacultyIntoDb,
  updateSingleAcademicFacultyIntoDb,
};
