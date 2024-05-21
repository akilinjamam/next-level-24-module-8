import Joi from 'joi';
import validator from 'validator';

// Custom validator for capitalized first name
const capitalizeFirstNameValidator = (value: string, helpers: any) => {
  const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
  if (firstNameStr !== value) {
    return helpers.message(`${value} is not in capitalize format`);
  }
  return value;
};

// UserName Schema
const usernameValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .required()
    .trim()
    .custom(capitalizeFirstNameValidator, 'custom capitalize validator')
    .messages({
      'string.base': 'First Name should be a type of text',
      'string.max': 'First Name cannot be more than 20 characters',
      'any.required': 'First Name is required',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .custom((value: string, helpers: any) => {
      if (!validator.isAlpha(value)) {
        return helpers.message(`${value} is not valid`);
      }
      return value;
    }, 'custom alpha validator')
    .messages({
      'string.base': 'Last Name should be a type of text',
      'any.required': 'Last Name is required',
    }),
});

// Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.base': 'Father Name should be a type of text',
    'any.required': 'Father Name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.base': 'Father Occupation should be a type of text',
    'any.required': 'Father Occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.base': 'Father Contact Number should be a type of text',
    'any.required': 'Father Contact Number is required',
  }),
  motherName: Joi.string().required().messages({
    'string.base': 'Mother Name should be a type of text',
    'any.required': 'Mother Name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.base': 'Mother Occupation should be a type of text',
    'any.required': 'Mother Occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.base': 'Mother Contact Number should be a type of text',
    'any.required': 'Mother Contact Number is required',
  }),
});

// Local Guardian Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Local Guardian Name should be a type of text',
    'any.required': 'Local Guardian Name is required',
  }),
  occupation: Joi.string().required().messages({
    'string.base': 'Local Guardian Occupation should be a type of text',
    'any.required': 'Local Guardian Occupation is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Local Guardian Contact Number should be a type of text',
    'any.required': 'Local Guardian Contact Number is required',
  }),
  address: Joi.string().required().messages({
    'string.base': 'Local Guardian Address should be a type of text',
    'any.required': 'Local Guardian Address is required',
  }),
});

// Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'ID should be a type of text',
    'any.required': 'ID is required',
  }),
  name: usernameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female').required().messages({
    'string.base': 'Gender should be a type of text',
    'any.only': 'Gender must be either male or female',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string()
    .email()
    .required()
    .custom((value: string, helpers: any) => {
      if (!validator.isEmail(value)) {
        return helpers.message(`${value} is not valid`);
      }
      return value;
    }, 'custom email validator')
    .messages({
      'string.base': 'Email should be a type of text',
      'string.email': 'Email must be a valid email',
      'any.required': 'Email is required',
    }),
  contactNo: Joi.string().required().messages({
    'string.base': 'Contact Number should be a type of text',
    'any.required': 'Contact Number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'string.base': 'Emergency Contact Number should be a type of text',
    'any.required': 'Emergency Contact Number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+')
    .optional()
    .messages({
      'string.base': 'Blood Group should be a type of text',
      'any.only': 'Blood Group should be one of A+, A-, B+, B-, AB+, AB-, O+',
    }),
  presentAddress: Joi.string().required().messages({
    'string.base': 'Present Address should be a type of text',
    'any.required': 'Present Address is required',
  }),
  parmanentAddres: Joi.string().required().messages({
    'string.base': 'Permanent Address should be a type of text',
    'any.required': 'Permanent Address is required',
  }),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().required().messages({
    'string.base': 'Profile Image should be a type of text',
    'any.required': 'Profile Image is required',
  }),
  isActive: Joi.string().valid('active', 'blocked').required().messages({
    'string.base': 'Status should be a type of text',
    'any.only': 'Status must be either active or blocked',
    'any.required': 'Status is required',
  }),
});

export default studentValidationSchema;
