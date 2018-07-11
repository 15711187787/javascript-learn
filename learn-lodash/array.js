// https://www.lodashjs.com/docs/4.17.5.html

const _ = require("lodash");

(() => {
  const users = [
    { user: "barney", active: false },
    { user: "fred", active: false, flag: 1 },
    { user: "pebbles", active: true, flag: 2 }
  ];

  const numbers = [1, 2, 3, 1, 2, 3];

  const characters = ["a", "b", "c", "d", "e"];

  const objects = [[1, 2, 3], [2, 3]];

  const x = [{ x: 1 }, { x: 2 }, { x: 3 }, { x: 1 }];

  // indexOf
  (() => {
    console.log("indexOf", _.indexOf(numbers, 3));
    console.log("indexOf", _.indexOf(numbers, 3, 4));
  })();

  // fromPairs toPairs
  (() => {
    console.log("fromPairs", _.fromPairs([["a", 1], ["b", 2]]));
    console.log("toPairs", _.toPairs({ a: 1, b: 2 }));
  })();

  // dropRightWhile
  (() => {
    const result = _.dropWhile(users, o => o.active === false);
    console.log("dropWhile", result);
    const result2 = _.dropWhile(users, ["active", false]);
    console.log("dropWhile", result2);
  })();

  // fill
  (() => {
    let array = [1, 2, 3, 4, 5, 6];
    console.log("fill", _.fill(array, [3, 4], 2, 4));
  })();

  // findIndex findLastIndex
  (() => {
    console.log("findIndex", _.findIndex(users, o => o.active));
    console.log("findIndex", _.findIndex(users, o => !o.active));
    console.log("findLastIndex", _.findLastIndex(users, o => o.active));
    console.log("findLastIndex", _.findLastIndex(users, o => !o.active));
  })();

  // flatten flattenDeep flattenDepth
  (() => {
    console.log("flatten", _.flatten([1, [2, [3, [4]], 5]]));
    console.log("flattenDeep", _.flattenDeep([1, [2, [3, [4]], 5]]));
    console.log("flattenDepth", _.flattenDepth([1, [2, [3, [4]], 2]], 1));
    console.log("flattenDepth", _.flattenDepth([1, [2, [3, [4]], 3]], 2));
    console.log("flattenDepth", _.flattenDepth([1, [2, [3, [4]], 3]], 3));
  })();

  // initial
  (() => {
    console.log("initial", _.initial(numbers));
  })();

  // nth
  (() => {
    console.log("nth", _.nth(characters, 1));
    console.log("nth", _.nth(characters, -1));
    console.log("nth", _.nth(characters, 10));
  })();

  // intersection intersectionBy
  (() => {
    console.log("intersection", _.intersection(...objects));
    console.log(
      "intersectionBy",
      _.intersectionBy([{ x: 1 }], [{ x: 2 }, { x: 1 }], "x")
    );
  })();

  // join
  (() => {
    console.log("join", _.join(numbers, "."));
  })();

  // pull pullAll pullAllBy pullAt
  (() => {
    console.log("pull", _.pull([1, 2, 3, 1, 2, 3], 1, 2));
    console.log("pullAll", _.pull([1, 2, 3, 1, 2, 3], [1, 2]));
    console.log("pullAllBy", _.pullAllBy(x, [{ x: 1 }, { x: 3 }], "x"));
    let x0 = ["a", "b", "c", "d", "e"];
    let xr = _.pullAt(x0, [1, 2]);
    console.log("pullAt", x0, xr);
  })();

  // remove
  (() => {
    let x0 = [1, 2, 3, 4, 5, 6];
    let xr = _.remove(x0, o => o % 2 == 0);
    console.log("remove", x0, xr);
  })();

  // reverse
  (() => {
    let x0 = [1, 2, 3, 4, 5, 6];
    let xr = _.reverse(x0);
    console.log("reverse", x0, xr);
  })();

  // sortedIndex sortedIndexBy
  (() => {
    let x0 = [1, 2, 3, 4, 5, 6];
    let xr = _.sortedIndex(x0, 3);
    console.log("sortedIndex", x0, xr);

    let y0 = [{ x: 1 }, { x: 2 }, { x: 1 }, { x: 1 }];
    let yr = _.sortedIndexBy(y0, { x: 2.5 }, o => o.x);
    console.log("sortedIndexBy", y0, yr);
  })();

  // take takeRight takeRightWhile takeWhile
  (() => {
    let x0 = [1, 2, 3, 4, 5, 6];
    console.log("take", _.take(x0, 2));
    console.log("take", _.take(x0, 10));
    console.log("takeRight", _.takeRight(x0, 2));
    console.log("takeWhile", _.takeWhile(users, o => o.active === false));
    console.log("takeWhile", _.takeWhile(users, ["active", false]));
  })();
})();
