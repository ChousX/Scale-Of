async function get_images() {
  const response = await fetch("./image_config.json");
  const data = await response.json();
  // console.log(data)
  return data;
}
const images = get_images();
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");
var scale = 0.0;
window.addEventListener("wheel", function (event) {
  wheelManager(event);
});
function wheelManager(event) {
  scale += event.deltaY / 3;scale
  // console.log(scale)
}
function disableScrolling() {
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
  function preventDefault(e) {
    e.preventDefault();
  }
  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }
  var supportsPassive = false;
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
        },
      })
    );
  } catch (e) {}
  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}
function clear() {
  c.clearRect(0, 0, canvas.width, canvas.height);
}

function main() {
  images.then(function (imgs) {
    for (i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      const norm = scale - img.size;
      const sx = Math.pow(norm, 1.5);
      const sy = Math.pow(norm, 1.5);
      const x = canvas.width / 2 + norm * img.dx  * 1.5;
      const y = canvas.height / 2 + norm * img.dy * 1.5;
      
      if (
        norm >= 0 &&
        x + sx > 0 &&
        y + sy > 0 &&
        x < canvas.width &&
        y < canvas.height
      ) {
        image = document.getElementById(img.id);
        c.drawImage(image, x, y, sx, sy );
      }
    }
  });
}
function draw_current_scale() {
  c.font = "48px Arial";
    var temp = "10^" + scale.toString();

  c.fillText(scale, canvas.width / 2 - (48 * 2), 55);
}
function draw_size_circle(r, size) {
  c.beginPath();
  c.arc(canvas.width/ 2, canvas.height/2, r, 0, Math.PI * 2);
  c.stroke();
}
function update() {
  clear();
  draw_size_circle(scale);
  main();
  draw_current_scale();
  requestAnimationFrame(update);
}

disableScrolling();
update();
