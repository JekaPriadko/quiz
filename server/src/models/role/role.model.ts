import { Schema, model } from 'mongoose';
import { IRole, Roles } from './entity';

const roleSchema = new Schema<IRole>({ name: { type: String, enum: Roles } });

const Role = model('Role', roleSchema);

export default Role;
