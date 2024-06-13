const mineflayer = require('mineflayer');

console.log('Starting...');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: "RiseSMPMC.aternos.me",
    port: "46779",
    username: "RiseSMPBOT",
    version: false
  });

  bot.on('login', function() {
    bot.chat('/register 123123123 123123123');
    bot.chat('/login 123123123 123123123');
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    switch (message) {
      case ';start':
        bot.chat('24 RiseSMP > Bot started! - Made By Jr Busaco');
        bot.setControlState('forward', true);
        bot.setControlState('jump', true);
        bot.setControlState('sprint', true);
        break;
      case ';stop':
        bot.chat('24 RiseSMP > Bot stopped! - Made By Jr Busaco');
        bot.clearControlStates();
        break;
    }
  });

  bot.on('spawn', function() {
    bot.chat('Bot > Spawned');
  });

  bot.on('death', function() {
    bot.chat('Bot > I died, respawning');
  });

  bot.on('kicked', (reason, loggedIn) => {
    console.log(`Kicked: ${reason} (logged in: ${loggedIn})`);
    reconnect();
  });

  bot.on('error', err => {
    console.log(`Error: ${err}`);
    reconnect();
  });

  bot.on('end', () => {
    console.log('Connection lost, reconnecting...');
    reconnect();
  });
}

function reconnect() {
  setTimeout(() => {
    console.log('Reconnecting...');
    createBot();
  }, 5000); // wait 5 seconds before reconnecting
}

createBot();
