import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config/index';

const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needsPasswordChange: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-prograss', 'blocked'],
      required: true,
      default: 'in-prograss',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// pre save middleware/ hook

userSchema.pre('save', async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id }).select('+password'); // it will include password and plus sign will add remaining properties
};

userSchema.statics.isPasswordExists = async function (
  plainTextPassword,
  hasedPassword,
) {
  const result = bcrypt.compare(plainTextPassword, hasedPassword);
  return result;
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimetamp: number,
) {
  // console.log(passwordChangedTimestamp, jwtIssuedTimetamp);

  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  console.log(passwordChangedTime > jwtIssuedTimetamp);
  return passwordChangedTime > jwtIssuedTimetamp;
};

const User = model<TUser, UserModel>('User', userSchema);
export default User;
