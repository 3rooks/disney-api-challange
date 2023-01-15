import { faker } from '@faker-js/faker';

faker.locale = 'en_US';

const date = new Date(faker.date.past());

const getRandom = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

export const movieFaker = () => ({
    title: `${faker.name.lastName()} movie#${faker.datatype.number()}`.toLowerCase(),
    image: faker.image.cats(),
    rated: faker.datatype.number({ max: 10, min: 1 }),
    releaseYear: getRandom(1950, date.getFullYear())
});

export const genderFaker = () => ({
    name: `${faker.music.genre()} gender#${faker.datatype.number()}`.toLowerCase(),
    image: faker.image.cats()
});

export const characterFaker = () => ({
    name: `${faker.name.firstName()} char#${faker.datatype.number()}`.toLowerCase(),
    image: faker.image.cats(),
    age: faker.datatype.number({ max: 100, min: 1 }),
    history: faker.lorem.paragraph()
});

const genFakerData = async (data: any, quantity: number) => {
    const arr = [];

    for (let i = 0; i < quantity; i++) {
        arr.push(data());
    }

    return arr;
};

export default genFakerData;
