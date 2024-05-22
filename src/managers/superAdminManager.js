const AdminManager = require("./adminManager");

class SuperAdminManager extends AdminManager {
  constructor() {
    super();
  }
  //Super Admin will get to see everything UsersDb have
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
        message: `Error getting admin dashboard: ${error.message}`,
      };
    }
  }

  async changeAdminRights(email, updatedRights) {
    try {
      // Validate input data
      if (!email || typeof updatedRights.isAdmin !== 'boolean') {
        return {
          success: false,
          message: "Missing or invalid required data",
        };
      }

      // Find user by email and update the isAdmin field
      const user = await User.findOneAndUpdate(
        { email },
        { isAdmin: updatedRights.isAdmin },
        { new: true }  // Return the updated document
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

module.exports = SuperAdminManager;
