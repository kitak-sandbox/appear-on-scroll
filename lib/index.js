document.addEventListener('DOMContentLoaded', () => {
  const scrollObservable = Rx.Observable.fromEvent(window, 'scroll').map(() =>{
    return window.scrollY;
  });
  const header = document.querySelector('header');

  Rx.Observable.zip(
    scrollObservable,
    scrollObservable.skip(1)
  ).subscribe(function(positions) {
    const diff = positions[1] - positions[0];
    const transform = header.style.transform;
    const m = transform.match(/translate3d\(0px\,\s\-?(\d+)px\,\s0px\)/);
    if (m) {
      const current = parseInt(m[1], 10);
      if (current + diff >= 80) {
        header.style.transform = 'translate3d(0px, -80px, 0px)';
        return;
      }
      header.style.transform = 'translate3d(0px, -'+(current + diff)+'px, 0px)';
    }
  });
});
