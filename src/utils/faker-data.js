import faker from 'faker';

faker.locale = 'en_US';

const date = new Date(faker.date.past());

const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const movieFaker = () => ({
    title: `${faker.name.title()} ${faker.datatype.number()}`.toLocaleLowerCase(),
    image: faker.image.cats(),
    rated: faker.datatype.number({ max: 10, min: 1 }),
    releaseYear: getRandom(1950, date.getFullYear())
});

export const genderFaker = () => ({
    name: `${faker.music.genre()} ${faker.datatype.number()}`.toLocaleLowerCase(),
    image: faker.image.cats()
});

export const characterFaker = () => ({
    name: `${faker.name.firstName()} ${faker.datatype.number()}`.toLocaleLowerCase(),
    image: faker.image.cats(),
    age: faker.datatype.number({ max: 100, min: 1 }),
    history: faker.lorem.paragraph()
});

const genFakerData = async (data, quantity) => {
    const arr = [];

    for (let i = 0; i < quantity; i++) {
        arr.push(data());
    }

    return arr;
};

export default genFakerData;
