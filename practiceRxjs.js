var Rx = require('rxjs/Rx');

var arr = [1, 2, 3, "hi", 7, 8, 9, "world"];

var objOf = Rx.Observable.of(...arr).take(10).map(x => parseInt(x))
  .filter(x => !isNaN(x)).reduce((x, y) => x+y);

var objFrom = Rx.Observable.from(arr).take(10).map(x => parseInt(x))
  .filter(x => !isNaN(x)).reduce((x, y) => x*y);

var objMerge = Rx.Observable.merge(objOf, objFrom);

console.log("Hello Rxjs!");
objMerge.subscribe(x => console.log(x));
