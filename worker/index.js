const keys = require('./keys');

const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});

sub.subscribe('insert');

// function fibR(index) {
//   let n0 = 1;
//   let n1 = 1;
//   let n2;

//   if (index < 2) {
//     return 1;
//   }

//   for (let i = 0; i < index - 1; i++) {
//     n2 = n0 + n1;
//     n0 = n1;
//     n1 = n2;
//   }

//   return n2;
// }

// var hrstart = process.hrtime();
// console.log(fib(40));
// var hrend = process.hrtime(hrstart);
// console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);

// var hrstart = process.hrtime();
// console.log(fibR(40));
// var hrend = process.hrtime(hrstart);
// console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
