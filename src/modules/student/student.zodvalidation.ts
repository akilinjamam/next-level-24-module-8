import { z } from 'zod';

// Define the createUserName Zod Zodschema
const createuserNameZodSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First Name can not be more than 20')
    .regex(/^[A-Z][a-z]*$/, 'First name is not in capitalize format'),
  middleName: z.string().optional(),
  lastName: z.string().regex(/^[A-Za-z]+$/, 'Last name is not valid'),
});

// Define the Guardian Zod Zodschema
const createguardianZodSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// Define the LocalGuardian Zod Zodschema
const createLocalZodSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Define the Student Zod Zodschema
export const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    students: z.object({
      name: createuserNameZodSchema,
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Email is not valid'),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+'])
        .optional(),
      presentAddress: z.string(),
      parmanentAddres: z.string(),
      guardian: createguardianZodSchema,
      localGuardian: createLocalZodSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().optional(),
    }),
  }),
});

// UserName Zod Schema
const updateUserNameZodSchema = z
  .object({
    firstName: z
      .string()
      .max(20, 'First Name can not be more than 20')
      .regex(/^[A-Z][a-z]*$/, 'First name is not in capitalize format')
      .optional(),
    middleName: z.string().optional(),
    lastName: z
      .string()
      .regex(/^[A-Za-z]+$/, 'Last name is not valid')
      .optional(),
  })
  .partial();

// Guardian Zod Schema
const updateGuardianZodSchema = z
  .object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNo: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().optional(),
  })
  .partial();

// LocalGuardian Zod Schema
const updateLocalZodSchema = z
  .object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
  })
  .partial();

// Student Zod Schema
export const updateStudentZodSchema = z
  .object({
    body: z
      .object({
        password: z.string().max(20).optional(),
        students: z
          .object({
            name: updateUserNameZodSchema.optional(),
            gender: z.enum(['male', 'female']).optional(),
            dateOfBirth: z.string().optional(),
            email: z.string().email('Email is not valid').optional(),
            contactNo: z.string().optional(),
            emergencyContactNo: z.string().optional(),
            bloodGroup: z
              .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+'])
              .optional(),
            presentAddress: z.string().optional(),
            parmanentAddres: z.string().optional(),
            guardian: updateGuardianZodSchema.optional(),
            localGuardian: updateLocalZodSchema.optional(),
            admissionSemester: z.string().optional(),
            academicDepartment: z.string().optional(),
            profileImg: z.string().optional(),
          })
          .partial(),
      })
      .partial(),
  })
  .partial();

export const studentZodSchema = {
  createStudentZodSchema,
  updateStudentZodSchema,
};
