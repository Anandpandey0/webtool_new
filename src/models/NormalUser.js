// models/NormalUser.js
import BaseUser from './User';
import mongoose from 'mongoose';

const normalUserSchema = new mongoose.Schema({
  purpose_to_use_app: { type: String, default: 'normal user' },
});

const NormalUser = BaseUser.discriminator('NormalUser', normalUserSchema);

export default NormalUser;
