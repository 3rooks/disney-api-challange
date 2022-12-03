import { ENTITIES } from '#constants/entities.js';
import mongoose from 'mongoose';
import uuidv4 from 'uuid-random';

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        _id: {
            _id: false,
            type: String,
            unique: true,
            default: () => uuidv4()
        },
        username: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const userModel = model(ENTITIES.USERS, userSchema);
