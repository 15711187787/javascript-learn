const t = new Date()
console.log(t.toDateString()); // Mon Nov 12 2018
console.log(t.toISOString()); // 2018-11-12T03:38:33.301Z
console.log(t.toLocaleDateString()); // 018/11/12
console.log(t.toLocaleString()); // 2018/11/12 上午11:38:33
console.log(t.toLocaleTimeString()); // 上午11:38:33
console.log(t.toString()); // Mon Nov 12 2018 11:38:33 GMT+0800 (中国标准时间)
console.log(t.toUTCString()); // Mon, 12 Nov 2018 03:38:33 GMT