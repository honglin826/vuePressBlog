let el = document.getElementsByClassName('table-box')[0]; // 可拖动的div
el.onmousedown = function() {
  el.style.cursor = 'grabbing';
  let gapX = event.clientX;
  let startX = el.scrollLeft;
  document.onmousemove = function(e) {
    let x = e.clientX - gapX;
    el.scrollLeft = startX - x;
    return false;
  };
  document.onmouseup = function() {
    el.style.cursor = 'grab'
    document.onmousemove = null;
    document.onmouseup = null;
  };
};