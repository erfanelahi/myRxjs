//var Rx = require('rx');
var arr = ["5", 2, 3, "hi", 7, 8, 9, "world"];
// of / skip / take / skipLast / takeLast / map / filter / reduce
var objOf = Rx.Observable.of(...arr).skip(2).take(6).takeLast(5).skipLast(2).map(x => parseInt(x))
    .filter(x => !isNaN(x)).reduce((x, y) => x + y);
// from / first / last
var objFrom = Rx.Observable.from(arr).first().last().map(x => parseInt(x * x))
    .filter(x => !isNaN(x));
// merge
var objMerge = Rx.Observable.merge(objOf, objFrom);
//
console.log("Hello Rxjs!");
objMerge.subscribe(x => console.log(x));
// just / flatMap / fromPromise
var objJustFlatMap = Rx.Observable.just("https://api.github.com/users")
    .flatMap(requestURL => Rx.Observable.fromPromise(jQuery.getJSON(requestURL)))
// fromEvent / buffer / delay / do
var countClick = document.querySelector("#countClick");
var clickResult = document.querySelector("#clickResult");
var clickStream = Rx.Observable.fromEvent(countClick, "click");
var evenTimeStampStream = clickStream.buffer(() => clickStream.delay(500))
    .map(event => event.length).do(length => console.log("Click Count : " + length)).filter(length => length === 2);
evenTimeStampStream.subscribe(event => {
    clickResult.innerHTML = "";
    objJustFlatMap.subscribe(data =>
        data.forEach(item =>
            clickResult.innerHTML += `<div style='border: 1px solid #e4e6e8;'>
            <img style="float:laft" src="${item.avatar_url}" alt="avatar" width="100" height="100" />
            <a style="float:laft" target="_blank" href="${item.html_url}">${item.login}</a>
        </div>`))
})
// concat
var timer1 = Rx.Observable.interval(2000).take(2);
var timer2 = Rx.Observable.interval(1000).take(3);
var timer3 = Rx.Observable.interval(500).take(4);
var timer4 = Rx.Observable.interval(1000);
var result = timer1.concat(timer2, timer3).withLatestFrom(timer4);
result.subscribe(x => console.log(x));
// range / combineLatest 
var weight = Rx.Observable.of(70, 72, 76, 79, 75);
var height = Rx.Observable.range(1, 3);
var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => { console.log("w : " + w + " : h :" + h); return w / (h * h) });
bmi.subscribe(x => console.log('BMI is ' + x));
