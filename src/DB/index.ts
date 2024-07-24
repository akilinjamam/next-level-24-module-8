import config from '../app/config';
import { USER_ROLE } from '../modules/user/user.constant';
import User from '../modules/user/user.model';

const superUser = {
  id: '0001',
  email: 'akilinjamam@gmail.com',
  password: config.super_admin_pass,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-prograss',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  // when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: USER_ROLE.superAdmin });
  if (!isSuperAdminExits) {
    const result = await User.create(superUser);
    console.log(result);
  }
};

export default seedSuperAdmin;
