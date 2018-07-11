// https://www.lodashjs.com/docs/4.17.5.html

const _ = require("lodash");

(() => {
  const users = [
    { user: "loo", active: false, score: 70, age: 19 },
    { user: "hi", active: false, score: 70, age: 18 },
    { user: "barney", active: false, score: 70, age: 22 },
    { user: "fred", active: false, score: 60, age: 16, flag: 1 },
    { user: "pebbles", active: true, score: 80, age: 32, flag: 2 }
  ];

  // countBy
  (() => {
    console.log("countBy", _.countBy([1, 2, 3, 1, 2]));
  })();

  // every some
  (() => {
    console.log("every", _.every([true, null, 2, "false"], Boolean));
    console.log("every", _.every(users, ["active", false]));
    console.log("some", _.some([true, null, 2, "false"], Boolean));
    console.log("some", _.some(users, ["active", false]));
  })();

  // filter
  (() => {
    console.log("filter", _.filter([true, null, 2, "false"], Boolean));
    console.log("filter", _.filter(users, ["active", false]));
  })();

  // find findLast
  (() => {
    console.log("find", _.find(users, o => o.score > 60));
    console.log("find", _.find(users, ["active", true]));
  })();

  // flatMap
  (() => {
    let x0 = [1, 2, 3, 4];
    let xr = _.flatMap(x0, o => [o, o * o]);
    console.log("flatMap", x0, xr);
  })();

  // forEach
  (() => {
    console.log("forEach", _.forEach([1, 2, 3], o => console.log(o)));
    console.log(
      "forEach",
      _.forEach({ x: 1, y: 2, z: 3 }, (v, k) =>
        console.log(`key: ${k}, value: ${v}`)
      )
    );
  })();

  // groupBy
  (() => {
    console.log("groupBy", _.groupBy(users, o => o.active));
    console.log("groupBy", _.groupBy(users, o => o.flag));
  })();

  // includes
  (() => {
    console.log("includes", _.includes([1, 2, 3, 4], 1));
    console.log("includes", _.includes({ a: 1, b: 2, c: 3 }, 1));
    console.log("includes", _.includes({ a: 1, b: 2, c: 3 }, "a"));
  })();

  // invokeMap
  (() => {
    let x0 = [[5, 1, 7], [3, 2, 1]];
    let xr = _.invokeMap(x0, "sort");
    console.log("invokeMap", x0, xr);

    let y0 = [123, 456];
    let yr = _.invokeMap(y0, String.prototype.split, "");
    console.log("invokeMap", y0, yr);
  })();

  // keyBy
  (() => {
    console.log("keyBy", _.keyBy(users, o => o.score));
  })();

  // map
  (() => {
    console.log("map", _.map([1, 2, 3, 4], o => o * o));
  })();

  // orderBy
  (() => {
    console.log("orderBy", _.orderBy(users, ["age", "score"], ["desc", "asc"]));
  })();

  // reject
  (() => {
    let x0 = [
      { user: "loo", active: false, score: 70, age: 19 },
      { user: "hi", active: false, score: 70, age: 18 },
      { user: "barney", active: false, score: 70, age: 22 },
      { user: "fred", active: false, score: 60, age: 16, flag: 1 },
      { user: "pebbles", active: true, score: 80, age: 32, flag: 2 }
    ];
    let xr = _.reject(x0, ["active", false]);
    console.log("reject", x0, xr);
  })();

  // sample sampleSize
  (() => {
    for (let i = 0; i < 3; ++i) {
      console.log("sample", _.sample([1, 2, 3, 4, 5, 7]));
      console.log("sampleSize", _.sampleSize(["a", "b", "c", "d"], 2));
      console.log("sampleSize", _.sampleSize(["a", "b", "c", "d"], 6));
    }
  })();

  // shuffle
  (() => {
    console.log("shuffle", _.shuffle([1, 2, 3, 4, 5, 6, 7]));
  })();
})();
