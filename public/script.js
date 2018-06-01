function clickLink(className) {
  const elem = document.getElementsByClassName(className)
  if (elem.length !== 0) {
    elem[0].click();
  }
}

document.onkeydown = function(e) {
  switch(e.keyCode) {
    case 37:
      clickLink('previous');
      break;
    case 39:
      clickLink('next');
      break;
  }
}
