import bcrypt from 'bcryptjs';
import { connectMongoDB } from '../lib/mongodb';
import NormalUser from '../models/NormalUser';

class UserManager {
  constructor() {
    //this.connectDb();
  }

  async connectDb() {
    try {
      await connectMongoDB();
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  async registerUser(userData) {
    const { email, password, username, organization_name, contact_number } = userData;

    try {
      if (!email || !password || !username || !organization_name || !contact_number) {
        return {
          success: false,
          message: 'Missing required data',
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new NormalUser({
        email,
        password: hashedPassword,
        username,
        organization_name,
        contact_number,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await newUser.save();

      return {
        success: true,
        message: 'User created successfully',
      };
    } catch (error) {
      console.error(new Error(error));
      return {
        success: false,
        message: `Error registering user: ${error.message}`,
      };
    }
  }

  async loginUser(email, password) {
    try {
      if (!email || !password) {
        return {
          success: false,
          message: 'Missing required data',
        };
      }

      const user = await NormalUser.findOne({ email });

      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return {
          success: false,
          message: 'Invalid credentials',
        };
      }

      return {
        success: true,
        message: 'User logged in successfully',
      };
    } catch (error) {
      console.error(new Error(error));
      return {
        success: false,
        message: `Error logging in user: ${error.message}`,
      };
    }
  }
}

export default UserManager;
