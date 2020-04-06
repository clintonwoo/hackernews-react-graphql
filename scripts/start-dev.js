const { spawn } = require('child_process');

const handleSpawnCommand = require('./spawn-command');

// Run "next" and "nodemon" as child processes
const next = spawn('next');
const nodemon = spawn('nodemon');

handleSpawnCommand(next, () => {
  nodemon.kill('SIGINT'); // Kill nodemon if next fails
});

handleSpawnCommand(nodemon, () => {
  next.kill('SIGINT'); // Kill next if nodemon fails
});

function cleanUpServer() {
  next.kill('SIGINT'); // Kill next if nodemon fails
  nodemon.kill('SIGINT'); // Kill nodemon if next fails
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach(eventType => {
  process.on(eventType, cleanUpServer);
});
