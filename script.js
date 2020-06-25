document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[magnification]").forEach((img) => {
    img.addEventListener("mouseover", overEventForDiv(img));
  });
});

overEventForDiv = (img) => (event) => {
  let Zoom = img.getAttribute("magnification") || 4;
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
  div.style.top = `${event.pageY - 50}px`;
  div.style.left = `${event.pageX - 50}px`;
  div.addEventListener(
    "mousemove",
    moveEventForMagnification(img, img_copy, div, Zoom),
    true
  );
  div.addEventListener(
    "mouseout",
    function _listener() {
      div.removeEventListener(
        "mousemove",
        moveEventForMagnification(img, img_copy, div, Zoom)
      );
      div.removeEventListener("click", _listener, true);
      div.parentNode.removeChild(div);
    },
    true
  );
};

moveEventForMagnification = (img, img_copy, div, zoom) => (event) => {
  if (glassOnImg(event, img)) {
    let cords = getCordsForTransform(event, img);
    div.style.top = `${event.pageY - 50}px`;
    div.style.left = `${event.pageX - 50}px`;
    img_copy.style.top = `${(-cords.y + 43) * zoom - 50}px`;
    img_copy.style.left = `${(-cords.x + 47) * zoom - 50}px`;
  }
};

glassOnImg = (e, img) => {
  let x = 0,
    y = 0;
  let a = img.getBoundingClientRect();
  x = e.pageX - a.left;
  y = e.pageY - a.top;
  x = x - window.pageXOffset;
  y = y - window.pageYOffset;

  if (y > 0 && x > 0 && x <= a.width && y <= a.height) {
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
