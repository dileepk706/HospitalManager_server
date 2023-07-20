import mongoose, { Document, Model, Schema } from 'mongoose';
import { User } from '../../../../domain/entities/user/userValidation';

export type MongoDBUser = Model<Document<any, any, any> & User>;

// Define the schema for the user collection
const userSchema = new Schema<User>({
  name: { type: String, required: true},
  email:  { type: String, required: true,unique:true},
  password:  { type: String, required: true},
  isMailVarified: { type: Boolean, default: false },
  phone:String,
  image: String,
  address: [{ type: Schema.Types.ObjectId, ref: 'address' }],
  dob:Date,
  desease:[String],
  isBlocked:{type:Boolean,default:false},
  sex:{type:String,enum:['male,female']}
  }, {
    timestamps: { createdAt: true}
  });

export const userModel: MongoDBUser = mongoose.connection.model<Document<any, any, any> & User>('user', userSchema);