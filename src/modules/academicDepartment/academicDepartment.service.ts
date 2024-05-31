import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAcademicDepartmentIntoDb = async () => {
  const result = await AcademicDepartment.find({}).populate('academicFaculty');
  return result;
};
const getSingleAcademicDepartmentIntoDb = async (id: string) => {
  const result = await AcademicDepartment.findOne({ _id: id }).populate(
    'academicFaculty',
  );
  return result;
};

const updateSingleAcademicDepartmentIntoDb = async (
  id: string,
  data: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.updateOne(
    { _id: id },
    { $set: data },
    { runValidators: true },
  );
  return result;
};

export const academicDepartmentService = {
  createAcademicDepartmentIntoDb,
  getAcademicDepartmentIntoDb,
  getSingleAcademicDepartmentIntoDb,
  updateSingleAcademicDepartmentIntoDb,
};
