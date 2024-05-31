import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuradian,
  TStudent,
  // StudentMethod,
  StudentModel,
  TUserName,
} from './student.interface';
import validator from 'validator';

const usernameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'first name is needed'],
    maxlength: [20, 'First Name can not be more than 20'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE}  is not in capitalize format',
    },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'last name is needed'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE}  is not valid',
    },
  },
});

const gurardianSchema = new Schema<TGuardian>({
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

const localGuardianSchema = new Schema<TLocalGuradian>({
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

const studnentShema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user id is requrired'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: usernameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} is not valied',
      },
    },
    contactNo: {
      type: String,
      require: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+'],
        message:
          "blood group should be as following: 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+'",
      },
    },
    presentAddress: {
      type: String,
      required: true,
    },
    parmanentAddres: {
      type: String,
      required: true,
    },
    guardian: {
      type: gurardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: true,
    },
    profileImg: {
      type: String,
      required: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// mongoose virtual

studnentShema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

studnentShema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studnentShema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studnentShema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method

studnentShema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

const Student = model<TStudent, StudentModel>('Student', studnentShema);

export default Student;
