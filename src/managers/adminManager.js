import UserManager from './userManager';
import AdminUser from '../models/AdminUser';
import NormalUser from '../models/NormalUser';

class AdminManager extends UserManager {
  constructor() {
    super();
  }

  async promoteToAdmin(email, purpose_to_use_app) {
    try {
      const normalUser = await NormalUser.findOne({ email });

      if (!normalUser) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      const newAdmin = new AdminUser({
        email: normalUser.email,
        password: normalUser.password,
        username: normalUser.username,
        organization_name: normalUser.organization_name,
        contact_number: normalUser.contact_number,
        purpose_to_use_app,
        createdAt: normalUser.createdAt,
        updatedAt: new Date(),
      });

      await newAdmin.save();
      await NormalUser.deleteOne({ email });

      return {
        success: true,
        message: 'User promoted to admin successfully',
      };
    } catch (error) {
      console.error(new Error(error));
      return {
        success: false,
        message: `Error promoting user to admin: ${error.message}`,
      };
    }
  }
}

export default AdminManager;
