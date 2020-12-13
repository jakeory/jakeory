document.addEventListener("DOMContentLoaded", function () {
  const _C = document.querySelector("#home-container"),
    N = _C.children.length,
    NF = 30;

  let i = 0,
    x0 = null,
    locked = false,
    w,
    ini,
    fin,
    rID = null;

  function stopAni() {
    cancelAnimationFrame(rID);
    rID = null;
  }

  function ani(cf = 0) {
    _C.style.setProperty("--i", ini + ((fin - ini) * cf) / NF);

    if (cf === NF) {
      stopAni();
      return;
    }

    rID = requestAnimationFrame(ani.bind(this, ++cf));
  }

  function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  }

  function lock(e) {
    x0 = unify(e).clientX;
    locked = true;
  }

  function drag(e) {
    e.preventDefault();

    if (locked) {
      let dx = unify(e).clientX - x0,
        f = +(dx / w).toFixed(2);

      _C.style.setProperty("--i", i - f);
    }
  }

  function move(e) {
    if (locked) {
      let dx = unify(e).clientX - x0,
        s = Math.sign(dx),
        f = +((s * dx) / w).toFixed(2);

      ini = i - s * f;

      if ((i > 0 || s < 0) && (i < N - 1 || s > 0) && f > 0.05) {
        i -= s;
        f = 1 - f;
      }

      fin = i;
      ani();
      x0 = null;
      locked = false;
    }
  }

  function size() {
    w = window.innerWidth;
  }

  size();
  _C.style.setProperty("--n", N);

  addEventListener("resize", size, false);

  _C.addEventListener("mousedown", lock, false);
  _C.addEventListener("touchstart", lock, false);

  _C.addEventListener("mousemove", drag, false);
  _C.addEventListener("touchmove", drag, false);

  _C.addEventListener("mouseup", move, false);
  _C.addEventListener("touchend", move, false);
});
