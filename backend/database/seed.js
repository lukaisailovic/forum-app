const {User, Board, Topic, Post} = require('../models');
const argon2 = require('argon2');
const faker = require('faker');

let createdUsers = [];
let createdBoards = [];
let createdTopics = [];
async function seed() {
    await userSeeder();
    await boardSeeder();
    await topicSeeder();
    await postSeeder();
}

seed().then(res => {
    console.log('Table seed successfully completed')
    process.exit(0);
}).catch(err => {
    console.log(err)
    process.exit(0);
})

async function userSeeder(){
    let userDataObjectArray = [];
    for (let i = 0; i < 25; i++) {
        const username = faker.internet.userName();
        const password = await argon2.hash(username+'123');
        userDataObjectArray.push({
            username,
            password
        })
    }
    createdUsers = await User.bulkCreate(userDataObjectArray);
}
async function boardSeeder(){
    let boardDataObjectArray = [];
    for (let i = 0; i < 5; i++) {
        const name = faker.hacker.noun();
        const description = faker.lorem.sentence();
        boardDataObjectArray.push({
            name,
            description
        })
    }
    createdBoards = await Board.bulkCreate(boardDataObjectArray);
}
async function topicSeeder(){
    let topicDataObjectArray = [];
    for (let i = 0; i < 50; i++) {
        const title = faker.hacker.phrase();
        // get random ids for board and user
        const boardId =  createdBoards[Math.floor(Math.random() * createdBoards.length)].dataValues.id;
        const userId =  createdUsers[Math.floor(Math.random() * createdBoards.length)].dataValues.id;
        topicDataObjectArray.push({
            title,
            boardId,
            userId
        })
    }
    createdTopics = await Topic.bulkCreate(topicDataObjectArray);
}

async function postSeeder(){
    let postDataObjectArray = [];
    for (let i = 0; i < 50; i++) {
        const content = faker.lorem.paragraph();
        // get random ids for topic and user
        const topicId =  createdTopics[Math.floor(Math.random() * createdTopics.length)].dataValues.id;
        const userId =  createdUsers[Math.floor(Math.random() * createdBoards.length)].dataValues.id;
        postDataObjectArray.push({
            content,
            topicId,
            userId
        })
    }
    await Post.bulkCreate(postDataObjectArray);
}