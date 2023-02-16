import { ENTITIES } from '@constants/entities';
import { POPULATE_KEYS } from '@constants/populate-keys';
import { IMovie } from '@interfaces/movie.interface';
import mongoose from 'mongoose';
import uuidv4 from 'uuid-random';

const { Schema, model } = mongoose;
const { key, characters } = POPULATE_KEYS;

const movieSchema = new Schema<IMovie>(
    {
        _id: {
            _id: false,
            type: String,
            unique: true,
            default: () => uuidv4()
        },
        title: {
            type: String,
            require: true,
            unique: true
        },
        image: {
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

movieSchema.pre(key, function () {
    this.populate(characters);
});

export const MovieModel = model<IMovie>(ENTITIES.MOVIES, movieSchema);
