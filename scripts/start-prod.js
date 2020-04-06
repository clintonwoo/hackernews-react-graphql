const { spawn } = require('child_process');

const handleSpawnCommand = require('./spawn-command');

// Run App and API servers as child processes
const next = spawn('next', ['start']);
const nodejs = spawn('node', ['dist/server.js']);

handleSpawnCommand(next, () => {
  nodejs.kill('SIGINT'); // Kill nodejs if next fails
});

handleSpawnCommand(nodejs, () => {
  next.kill('SIGINT'); // Kill next if nodejs fails
});

function cleanUpServer() {
  next.kill('SIGINT'); // Kill next if nodemon fails
  nodejs.kill('SIGINT'); // Kill nodemon if next fails
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach(eventType => {
  process.on(eventType, cleanUpServer);
});
