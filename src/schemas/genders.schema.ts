import { ENTITIES } from '@constants/entities';
import { IGender } from '@interfaces/gender.interface';
import mongoose from 'mongoose';
import uuidv4 from 'uuid-random';

const { Schema, model } = mongoose;

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

genderSchema.pre('find', function () {
    this.populate('movies.movie');
});
genderSchema.pre('findOne', function () {
    this.populate('movies.movie');
});

export const GenderModel = model<IGender>(ENTITIES.GENDERS, genderSchema);
