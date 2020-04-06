module.exports = function handleSpawnCommand(spawnedCommand, finishedCb) {
  spawnedCommand.stdout.on('data', data => {
    console.log(data.toString());
  });
  spawnedCommand.stderr.setEncoding('utf8');
  spawnedCommand.stderr.on('data', data => {
    console.error(data);
  });
  spawnedCommand.on('exit', data => {
    console.error(data.toString());

    finishedCb();

    process.exit(1);
  });
  spawnedCommand.on('close', code => {
    console.log(`child process exited with code ${code}`);

    finishedCb();

    process.exit(1);
  });
};
