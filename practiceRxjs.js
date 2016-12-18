//var Rx = require('rx');

var arr = [1, 2, 3, "hi", 7, 8, 9, "world"];
// off
var objOf = Rx.Observable.of(...arr).take(3).map(x => parseInt(x))
    .filter(x => !isNaN(x)).reduce((x, y) => x + y);
// from
var objFrom = Rx.Observable.from(arr).take(5).map(x => parseInt(x))
    .filter(x => !isNaN(x)).reduce((x, y) => x * y);
// merge
var objMerge = Rx.Observable.merge(objOf, objFrom);
//
console.log("Hello Rxjs!");
objMerge.subscribe(x => console.log(x));
// just / flatMap / fromPromise
var objJustFlatMap = Rx.Observable.just("https://api.github.com/users")
    .flatMap(requestURL => Rx.Observable.fromPromise(jQuery.getJSON(requestURL)))
    .subscribe(x => console.log(x));
// buffer / throttle
var countClick = document.querySelector("#countClick");
var clickResult = document.querySelector("#clickResult");
var clickStream = Rx.Observable.fromEvent(countClick, "click");
var dbclickStream = clickStream.buffer(() => clickStream.throttle(250)).map(arr => arr.length)//.filter(len => len === 2);
dbclickStream.subscribe(a => clickResult.textContent = "Double Clicked!!!")
dbclickStream.throttle(1000).subscribe(a => clickResult.textContent = "---")