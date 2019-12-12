import { Schema, model, Model } from 'mongoose';
import { IToken } from '../models/token.model';

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
    expires: 1800
  }
});

export const Token: Model<IToken> = model('Token', tokenSchema);
