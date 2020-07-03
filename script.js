document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[magnification]").forEach((img) => {
    img.addEventListener("mouseover", overEventForDiv(img));
  });
});

overEventForDiv = (img) => (event) => {
  let divNew = document.querySelector(".magnification-block");
  if (divNew) divNew.remove();
  let Zoom = img.getAttribute("magnification") || 2;
  let img_copy = img.cloneNode(true);
  let data_img = img.getBoundingClientRect();
  let width = data_img.width,
    height = data_img.height;
  img_copy.style.width = `${width * Zoom}px`;
  img_copy.style.height = `${height * Zoom}px`;
  img_copy.removeAttribute("magnification");
  let div = document.createElement("div");
  div.className = "magnification-block";
  div.appendChild(img_copy);
  document.body.appendChild(div);
  (h = div.offsetHeight / 2), (w = div.offsetWidth / 2);
  div.style.top = `${event.pageY - w}px`;
  div.style.left = `${event.pageX - h}px`;
  div.addEventListener(
    "mousemove",
    moveEventForMagnification(img, img_copy, div, Zoom, h, w)
  );
  div.addEventListener("mouseleave", function _listener(e) {
    div.style.display = `none`;
    div.removeEventListener(
      "mousemove",
      moveEventForMagnification(img, img_copy, div, Zoom, h, w)
    );
    div.remove();
  });
};

moveEventForMagnification = (img, img_copy, div, zoom, h, w) => (event) => {
  console.log(event);
  if (glassOnImg(event, img, div)) {
    let cords = getCordsForTransform(event, img);
    let y = +cords.y.toFixed(1),
      x = +cords.x.toFixed(1);
    console.log("Top " + y, "Left " + x);
    div.style.top = `${event.pageY - w}px`;
    div.style.left = `${event.pageX - h}px`;
    let top = y * zoom - w;
    if (top >= 0) {
      top = 0 - top;
    } else {
      top = Math.abs(top);
    }
    let left = x * zoom - h;
    if (left > 0) {
      left = 0 - left;
    } else {
      left = Math.abs(left);
    }
    img_copy.style.top = `${top}px`;
    img_copy.style.left = `${left}px`;
  } else {
    div.style.display = `none`;
    div.removeEventListener(
      "mousemove",
      moveEventForMagnification(img, img_copy, div, zoom, h, w)
    );
    div.remove();
  }
};

glassOnImg = (e, img, div) => {
  let x = 0,
    y = 0;
  let a = img.getBoundingClientRect();
  x = e.pageX - a.left;
  y = e.pageY - a.top;
  x = x - window.pageXOffset;
  y = y - window.pageYOffset;

  if (y > 0 && x > 0 && x < img.offsetWidth && y < img.offsetHeight) {
    console.log(true);
    return true;
  } else {
    return false;
  }
};
getCordsForTransform = (e, img) => {
  let x = 0,
    y = 0;
  let a = img.getBoundingClientRect();
  x = e.pageX - a.left;
  y = e.pageY - a.top;
  x = x - window.pageXOffset;
  y = y - window.pageYOffset;
  if (y > 0 && x > 0) {
    return { x: x, y: y };
  } else {
    return null;
  }
};
