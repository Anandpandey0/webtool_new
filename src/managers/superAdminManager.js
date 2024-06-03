import AdminManager from './adminManager';
import SuperAdminUser from '../models/SuperAdminUser';
import User from '../models/User'
import bcrypt from 'bcryptjs';

class SuperAdminManager extends AdminManager {
  constructor() {
    super();
  }

  async registerSuperAdmin(username, email, password) {
    try {
      if (!email || !password || !username) {
        return {
          success: false,
          message: "Missing required data",
        };
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const superAdmin = new SuperAdminUser({
        email,
        password: hashedPassword,
        username,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await superAdmin.save();

      return {
        success: true,
        message: "Super admin registered successfully",
      };
    } catch (error) {
      console.error(new Error(error));
      return {
        success: false,
        message: `Error registering super admin: ${error.message}`,
      };
    }
  }

  async getSuperAdminDashboard() {
    try {
      const userDB = await User.find();
      return {
        success: true,
        message: "Super admin dashboard",
        users: userDB,
      };
    } catch (error) {
      console.error(new Error(error));
      return {
        success: false,
        message: `Error getting super admin dashboard: ${error.message}`,
      };
    }
  }

  async changeAdminRights(email, updatedRights) {
    try {
      if (!email || typeof updatedRights.isAdmin !== 'boolean') {
        return {
          success: false,
          message: "Missing or invalid required data",
        };
      }

      const user = await User.findOneAndUpdate(
        { email },
        { isAdmin: updatedRights.isAdmin },
        { new: true }
      );

      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      return {
        success: true,
        message: "User admin rights updated successfully",
        user,
      };
    } catch (error) {
      console.error(new Error(error));
      return {
        success: false,
        message: `Error updating user: ${error.message}`,
      };
    }
  }
}

export default SuperAdminManager;
