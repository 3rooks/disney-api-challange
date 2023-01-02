import { ENTITIES } from '#constants/entities.js';
import mongoose from 'mongoose';
import uuidv4 from 'uuid-random';

const { Schema, model } = mongoose;

const characterSchema = new Schema(
    {
        _id: {
            _id: false,
            type: String,
            unique: true,
            default: () => uuidv4()
        },
        image: {
            type: String,
            require: true
        },
        name: {
            type: String,
            require: true,
            unique: true
        },
        age: {
            type: Number,
            require: true
        },
        history: {
            type: String,
            require: true
        },
        movies: [
            {
                _id: {
                    _id: false
                },
                movie: {
                    type: Schema.Types.String,
                    ref: ENTITIES.MOVIES
                }
            }
        ]
    },
    { timestamps: true, versionKey: false }
);

export const characterModel = model(ENTITIES.CHARACTERS, characterSchema);
