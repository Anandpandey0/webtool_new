const UserManager = require("./userManager");

class AdminManager extends UserManager {
  constructor() {
    super();
  }
  async updateUser(email, updatedData) {
    try {

      return await super.updateUser(email, updatedData); 
    } catch (error) {
      console.error(new Error(error));
      return {
        success: false,
        message: `Error updating user: ${error.message}`,
      };
    }
  }
}
module.exports = AdminManager;