import { ENTITIES } from '@constants/entities';
import { POPULATE_KEYS } from '@constants/populate-keys';
import { IGender } from '@interfaces/gender.interface';
import mongoose from 'mongoose';
import uuidv4 from 'uuid-random';

const { Schema, model } = mongoose;
const { key, movies } = POPULATE_KEYS;

const genderSchema = new Schema<IGender>(
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
    {
        timestamps: true,
        versionKey: false
    }
);

genderSchema.pre(key, function () {
    this.populate(movies);
});

export const GenderModel = model<IGender>(ENTITIES.GENDERS, genderSchema);
