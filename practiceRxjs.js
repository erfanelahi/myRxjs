/*function customCurry(a, b) {
    return Function(a, "return "+b+";");
}
var myCurryFunction = function (f) {
    var myCurry;
    for (var i = 0; i < f.length-1; i++) {
        if (i === 0) {
            myCurry = customCurry(["a" + i], Function('c', "return (a"+i+"+a"+(i+1)+") / c;"));
        }
        else {
            myCurry = customCurry(["a" + i], myCurry);
        }
    }
    console.log(myCurry);
    console.log(myCurry(3)(3)(2));
}
var myFunction = function (a, b, c) {
    return (a + b) / c;
}
myCurryFunction(myFunction);
//var abc = function (a) {
//    return function (b) {
//        return function (c) {
//            return (a + b) / c;
//        }
//    }
//} */
//var Rx = require('rx');
var arr = ["5", 2, 3, "hi", 7, 8, 9, "world"];
// of / skip / take / skipLast / takeLast / map / filter / reduce
var objOf = Rx.Observable.of(...arr).skip(2).take(6).takeLast(5).skipLast(2).map(x => parseInt(x))
    .filter(x => !isNaN(x)).reduce((x, y) => x + y, 0);
// from / first / last
var objFrom = Rx.Observable.from(arr).first().last().map(x => parseInt(x * x))
    .filter(x => !isNaN(x));
// merge / startWith / subscribe
var objMerge = Rx.Observable.merge(objOf, objFrom).startWith(">>> Begin <<<");
console.log("Hello Rxjs!");
objMerge.subscribe(x => console.log(x));
// just / flatMap / fromPromise
var objJustFlatMap = Rx.Observable.just("https://api.github.com/users")
    .flatMap(requestURL => Rx.Observable.fromPromise(jQuery.getJSON(requestURL)))
// fromEvent / buffer / delay / do
var countClick = document.querySelector("#countClick");
var clickResult = document.querySelector("#countClickResult");
var clickStream = Rx.Observable.fromEvent(countClick, "click");
var evenTimeStampStream = clickStream.buffer(() => clickStream.delay(1000))
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
// interval / concat / withLatestFrom
var timer1 = Rx.Observable.interval(2000).take(2);
var timer2 = Rx.Observable.interval(1000).take(3);
var timer3 = Rx.Observable.interval(500).take(4);
var timer4 = Rx.Observable.interval(1000);
var result1 = timer2.concat(timer3, timer1).withLatestFrom(timer4, (t123, t4) => [t123, t4]);
result1.subscribe(x => console.log(x));
// range / combineLatest 
var weight = Rx.Observable.of(70, 72, 76, 79, 75);
var height = Rx.Observable.range(5, 3);
var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => { console.log("w : " + w + " : h :" + h); return w / (h * h) });
bmi.subscribe(x => console.log('BMI is ' + x));
// create
var objCreate = Rx.Observable.create(s => {
    s.next("Hello");
    s.next(Math.random());
    //s.error("Error!!!");
    s.next(s);
    s.completed();
});
objCreate.subscribe(n => console.log(n), e => console.error(e), () => console.log("World!"));
// defer / throw / empty
var clicksOrInterval = Rx.Observable.defer(() => {
    if (Math.random() > 0.5) {
        return Rx.Observable.throw('oops! :-)');
    } else {
        return Rx.Observable.empty().startWith(720);
    }
});
clicksOrInterval.subscribe(x => console.log(`clicksOrInterval : ${x}`), error => console.error(error));
// timer / mergeMap / never
var result2 = Rx.Observable.timer(10000, 1000).take(4).mergeMap(x =>
    x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.never().startWith("Empty")
);
result2.subscribe(x => console.log(x));
// fromEventPattern / dispose / Promise
function addClickHandler(handler) {
    document.addEventListener('click', handler);
}
function removeClickHandler(handler) {
    document.removeEventListener('click', handler);
}
var domClicks = Rx.Observable.fromEventPattern(
    addClickHandler,
    removeClickHandler
);
var subscription = domClicks.subscribe(mouseEvent => alert("X : " + mouseEvent.x + ", Y : " + mouseEvent.y));
var promise = new Promise(
    function (resolve, reject) {
        resolve("Dom click event has been disabled.");
        reject("Dom click event error.");
    }
);
clickStream.subscribe(e => {
    this.subscription.dispose();
    Rx.Observable.fromPromise(promise).subscribe(resolve => console.log(resolve), reject => console.error(reject));
});
// test test test
//var items1 = Rx.Observable.range(1, 10);
//var items2 = items1.map(i => i*100 );
//items1.withLatestFrom(items2, (i1, i2) => i1+i2).subscribe(x => console.log(x));
// scan / throttle / *audit
var oneClickResult = document.querySelector("#oneClickResult");
var oneClicks = Rx.Observable.fromEvent(document.querySelector("#oneClick"), 'click');
var result3 = oneClicks.throttle(3000);
oneClicks.map(c => 1).scan((acc, i) => acc + i, 0).subscribe(y =>
    console.log('%c One Clicked : ' + y, 'background: #222; color: #bada55'));
result3.subscribe(x => {
    oneClickResult.textContent = (oneClickResult.textContent === '' ? 0 : parseInt(oneClickResult.textContent)) + 1;
});
// zip
var zipObservable1 = Rx.Observable.interval(1000).take(5);
var zipObservable2 = Rx.Observable.interval(500).take(3);
Rx.Observable.zip(zipObservable1, zipObservable2, (z1, z2) => ({ Z1: z1, Z2: z2 })).subscribe(console.log.bind(console));
// bufferCount / bufferTime / *delayWhen / bufferToggle
var objBufferCT = Rx.Observable.of('E', 'r', 'f', 'a', 'n').zip(Rx.Observable.interval(300).take(5), (x, _) => x);
objBufferCT.delay(new Date(new Date().getTime() + 1000)).bufferCount(2, 1).reduce((p, c) => p + c, ">>>").subscribe(console.log.bind(console));
objBufferCT.bufferTime(500, 500, 2)./*delayWhen(x => Rx.Observable.interval(x.length * 1000).first()).*/subscribe(console.log.bind(console));
/*var bufferToggle = objBufferCT.bufferToggle(Rx.Observable.interval(1000), i =>
  i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
);
bufferToggle.subscribe(x => console.log('%c' + x, 'background: #blue; color: white'));*/
// debounce / *debounceTime 
var textLabel = document.getElementById("textLabel");
var textInput = Rx.Observable.fromEvent(document.getElementById("textInput"), "input")
    .map(event => event.target.value).debounce(() => Rx.Observable.interval(1000).first());
textInput.subscribe(text => textLabel.textContent = text);
// distinct / distinctUntilChanged / catch / retry / retryWhen / repeat
var objDistinct = Rx.Observable.of('E', 'r', 'f', 'a', 'n', 'e', 'e', 'l', 'a', 'h', 'i', Math.random());
objDistinct.distinct().scan((acc, i) => acc + i, "").last()
    .subscribe(x => console.log('%c' + x, 'color: green'));
objDistinct.distinct(x => x.toLowerCase()).catch(error => Rx.Observable.empty()).scan((acc, i) => acc + i, "").last()
    .subscribe(x => console.log('%c' + x, 'color: blue'));
objDistinct.distinctUntilChanged().scan((acc, i) => acc + i, "").last()
    .subscribe(x => console.log('%c' + x, 'color: red'));
var retry = Rx.Observable.interval(1000).first().map(() => Math.random())
    .do(x => { if (x < 0.7) console.log("Ignore retry >>> " + x) })
    .map(x => { if (x > 0.7) { return x; } else { throw new Error("retry Too Small Number"); } });
var retryWhen = Rx.Observable.interval(1000).first().map(() => Math.random())
    .do(x => { if (x < 0.7) console.log("Ignore retryWhen >>> " + x) })
    .map(x => { if (x > 0.7) { return x; } else { throw new Error("retryWhen Too Small Number"); } });
retry.retry(3).subscribe(x => console.log("Next retry >>> " + x), error => console.log(error), () => console.log("retry done!"));
retryWhen.retryWhen(errorObj => errorObj.delay(3000)).subscribe(x => console.log("Next retryWhen >>> " + x), error => console.log(error), () => console.log("retryWhen done!"));
objDistinct.repeat(3).reduce((x, y) => x + y, "").subscribe(console.log.bind(console));
// flatMapLatest / takeUntil
var dotSource = Rx.Observable.interval(100).map(() => '. ');
var display = document.querySelector('#display');
var toggle = document.querySelector('#toggle');
var checked = Rx.Observable.fromEvent(toggle, 'change').map(e => e.target.checked);
checked.filter(x => x === true).flatMapLatest(() => dotSource.takeUntil(checked)).subscribe(x => display.innerHTML += x);