const _ = require('lodash');

var users = [
  {
    user: 'barney',
    active: false,
  },
  {
    user: 'fred',
    active: false,
  },
  {
    user: 'pebbles',
    active: true,
  },
];

const result = _.dropWhile(users, function(o) {
  return !!o.active;
});

console.log(`result: ${JSON.stringify(result)}`);
console.log(`users: ${JSON.stringify(users)}`);
