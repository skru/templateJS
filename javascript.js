// navbar burger
$("body").on("click", "[data-zcc-block='navbar'] .navbar-burger", function () {
  $(this).toggleClass("is-active");
  var wrapper = $(this).parents("[data-zcc-block='navbar']")
  wrapper.find('.navbar-menu').toggleClass("is-active");
});
// navbar dropdown
$("body").on("click", "[data-zcc-block='navbar'] .has-dropdown", function () {
  $(this).toggleClass("is-active");
});
// image-modal-open
$("body").on("click", "[data-zcc-block='image-modal'] img", function () {
  var wrapper = $(this).parents("[data-zcc-block='image-modal']")
  wrapper.find('.modal').toggleClass("is-active");
});
// image-modal-close
$("body").on("click", "[data-zcc-block='image-modal'] button", function () {
  var wrapper = $(this).parents("[data-zcc-block='image-modal']")
  wrapper.find('.modal').toggleClass("is-active");
});

