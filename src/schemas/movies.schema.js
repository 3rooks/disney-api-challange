import { ENTITIES } from '#constants/entities.js';
import { GENDERS } from '#constants/film-genres.js';
import mongoose from 'mongoose';
import uuidv4 from 'uuid-random';

const { Schema, model } = mongoose;

const movieSchema = new Schema(
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
        title: {
            type: String,
            require: true
        },
        rated: {
            type: Number,
            require: true
        },
        releaseYear: {
            type: Number,
            require: true
        },
        gender: {
            type: String,
            enum: GENDERS,
            require: true
        },
        characters: [
            {
                _id: { _id: false },
                character: {
                    type: Schema.Types.String,
                    ref: ENTITIES.CHARACTERS
                }
            }
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const movieModel = model(ENTITIES.MOVIES, movieSchema);
