function expensive() {
  for (let index = 0; index < 100000; index++) {
    const element = index;
  }
}

function debounce(fn, interval) {
  let allowUpdate = true;
  let lastvalue;
  return (...args) => {
    if (allowUpdate) {
      lastvalue = fn(...args);
      allowUpdate = false;
      setTimeout(() => {
        allowUpdate = true;
      }, interval);
      return lastvalue;
    } else {
      return lastvalue;
    }
  };
}

function smile(name) {
  console.log('Smiling at' + name);
}

let slowsmile = debounce(smile, 1000);
slowsmile('Andy');

function reconnect(timeout, attempts) {
  return new Promise((resolve, reject) => {
    fakeConnection()
      .then(() => resolve('connected'))
      .catch(err => {
        if (attempts === 0) {
          return reject('could not connect');
        }
        setTimeout(() => {
          console.log(attempts);
          reconnect(timeout, attempts - 1)
            .then(msg => resolve(msg))
            .catch(err => reject(err));
        }, timeout);
      });
  });
}

function fakeConnection() {
  let r = Math.floor(Math.random() * 2);
  console.log(r);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (r === 0) {
        return resolve('success');
      }
      return reject('could not connect');
    }, 1000);
  });
  //return Promise.reject('could not connect');
}

reconnect(1000, 4)
  .then(msg => console.log(msg))
  .catch(err => console.log(err));
