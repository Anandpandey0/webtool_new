// models/AdminUser.js
import BaseUser from './User';
import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema({
  isAdmin: { type: Boolean, default: true },
  organization_name: { type: String, required: true },
  contact_number: { type: String, required: true },
  purpose_to_use_app: { type: String, required: true },
});

const AdminUser = BaseUser.discriminator('AdminUser', adminUserSchema);

export default AdminUser;
