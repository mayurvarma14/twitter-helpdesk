module.exports = function(io) {
  io.on('connection', function(client) {
    client.on('join', function(data) {
      console.log(data);
    });
    client.emit('tweet', { test: 'test' });
  });
};
