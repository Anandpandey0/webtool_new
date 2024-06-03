// models/SuperAdminUser.js
import BaseUser from './User';
import mongoose from 'mongoose';

const superAdminUserSchema = new mongoose.Schema({
  isSuperAdmin: { type: Boolean, default: true },
});

const SuperAdminUser = BaseUser.discriminator('SuperAdminUser', superAdminUserSchema);

export default SuperAdminUser;
