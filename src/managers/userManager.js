const { default: User } = require("@/models/users");
const bcrypt = require("bcryptjs");

class UserManager {
  constructor() {
    this.connectDb();
  }

  async connectDb() {
    try {
      // Connect to the MongoDB database
      await connectMongoDB(); // Assuming connectMongoDB is a function that returns a promise
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  // Register a new user
  async registerUser(email, password, name, organization_name, contact_number, purpose_to_use_app) {
    try {
      // Validate input data
      if (!email || !password || !name || !organization_name || !contact_number || !purpose_to_use_app) {
        return {
          success: false,
          message: "Missing required data",
        };
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await User.create({
        email,
        password: hashedPassword,
        name,
        organization_name,
        contact_number,
        purpose_to_use_app,
        createdAt: new Date(),
        updated_at: new Date(),
      });

      return {
        success: true,
        message: "User created successfully",
      };
    } catch (error) {
      console.error(new Error(error));
      return {
        success: false,
        message: `Error registering user: ${error.message}`,
      };
    }
  }

  // Login a user
  async loginUser(email, password) {
    try {
      // Validate input data
      if (!email || !password) {
        return {
          success: false,
          message: "Missing required data",
        };
      }

      // Find the user by email
      const user = await User.findOne({ email });

      // Check if user exists
      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return {
          success: false,
          message: "Invalid credentials",
        };
      }

      return {
        success: true,
        message: "User logged in successfully",
      };
    } catch (error) {
      console.error(new Error(error));
      return {
        success: false,
        message: `Error logging in user: ${error.message}`,
      };
    }
  }

  // Update user data
  async updateUser(email, updatedData) {
    try {
      // Validate input data
      if (!email || !updatedData) {
        return {
          success: false,
          message: "Missing required data",
        };
      }

      // Find and update the user
      const user = await User.findOneAndUpdate(
        { email },
        { $set: updatedData },
        { new: true }
      );

      // Check if user exists
      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      return {
        success: true,
        message: "User updated successfully",
      };
    } catch (error) {
      console.error(new Error(error));
      // Handle error properly
      return {
        success: false,
        message: `Error updating user: ${error.message}`,
      };
    }
  }
}

module.exports = UserManager;
