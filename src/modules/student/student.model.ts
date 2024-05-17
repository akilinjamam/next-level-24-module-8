import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuradian,
  Student,
  UserName,
} from './student.interface';

const usernameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const gurardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<LocalGuradian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studnentShema = new Schema<Student>({
  id: {
    type: String,
  },
  name: usernameSchema,
  gender: ['male', 'female'],
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    require: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+'],
  presentAddress: {
    type: String,
    required: true,
  },
  parmanentAddres: {
    type: String,
    required: true,
  },
  guardian: gurardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: {
    type: String,
    required: true,
  },
  isActive: ['active', 'blocked'],
});

const StudentModel = model<Student>('Student', studnentShema);

export default StudentModel;
