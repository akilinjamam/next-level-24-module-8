import { TStudent } from './student.interface';
import Student from './student.model';

const createStudentIntoDb = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  const result = await Student.create(studentData);

  // const student = new Student(studentData);
  // custom instance method
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists!');
  // }

  // const result = student.save();

  return result;
};

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
  createStudentIntoDb,
  getAllStudentIntoDb,
  getSingleStudentIntoDb,
  dleteStudentIntoDb,
};
