module.exports = function () {
  if (process.env.NODE_ENV !== 'production') {
    throw Error('NODE_ENV must be \'production\' to deploy');
  }
  return require('child_process').spawn('sh', ['deploy.sh'], {
    cwd: process.env.HOME + '/Fugitive',
    env: process.env
  });
};
