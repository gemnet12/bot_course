const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options')
const token = '5236819991:AAFm7nA35qbKtutleKWJZMKsf11jsTeL1b0';

const bot = new TelegramApi(token, {polling: true});

const chats = {};


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'I will now guess number from 0 to 9, and you should guess it!')
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Now Guess!', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Initial greetings'},
        {command: '/info', description: 'Geting information'},
        {command: '/game', description: 'Play game'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id
        console.log(msg);
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/972/d03/972d03b1-80b4-43ac-8063-80e62b150d91/192/1.webp')
            return bot.sendMessage(chatId, `Welcome ${msg.from.first_name}`);
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `хУЙ СОСИ))), ${msg.from.first_name}`);
            //return bot.sendMessage(chatId, `Your name is ${msg.from.first_name}`);

        }
        if (text === '/game') {
             return startGame(chatId)
        }

        return bot.sendMessage(chatId, `I don't understand you`);
    })

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId);
        }
        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `Congratulations, You've guessed the number ${data}`, againOptions)
        }
        else {
            return bot.sendMessage(chatId, `Sorry, you're wrong, bot wanted ${chats[chatId]}`, againOptions);
        }
        bot.sendMessage(chatId, `You've chosen ${data}`);
    })
}

start();
