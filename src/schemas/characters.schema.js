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
        name: {
            type: String,
            require: true,
            unique: true
        },
        image: {
            type: String,
            require: true
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

// characterSchema.pre('find', function () {
//     this.populate('movies.movie');
// });
// characterSchema.pre('findOne', function () {
//     this.populate('movies.movie');
// });
// characterSchema.pre('findById', function () {
//     this.populate('movies.movie');
// });

export const characterModel = model(ENTITIES.CHARACTERS, characterSchema);
