import Student from './student.model';

const getAllStudentIntoDb = async () => {
  const result = await Student.find({});
  return result;
};

const getSingleStudentIntoDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const dleteStudentIntoDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StdudentService = {
  getAllStudentIntoDb,
  getSingleStudentIntoDb,
  dleteStudentIntoDb,
};
