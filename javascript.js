// navbar burger
$("body").on("click", "[data-zcc-block='navbar'] .navbar-burger", function () {
  $(this).toggleClass("is-active");
  var wrapper = $(this).parents("[data-zcc-block='navbar']")
  wrapper.find('.navbar-menu').toggleClass("is-active");
});
// navbar dropdown
$("body").on("click", "[data-zcc-block='navbar'] .has-dropdown", function (event) {
  // prevent clicking on items closing menu
  if ($(event.target).hasClass('navbar-link')) {
    $(this).toggleClass("is-active");
    // close any other open menus
    var openMenus = $("body").find(".navbar-menu .is-active").not(this);
    openMenus.each(function () {
      $(this).toggleClass("is-active");
    });
  }
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

// tabs
$("body").on("click", "[data-zcc-block='tabs'] .bulma-tab", function (event) {
  var tabIndex = $(this).attr("data-zcc-tab");
  var wrapper = $(this).parents("[data-zcc-block='tabs']")
  wrapper.find('.bulma-tab').removeClass("is-active");
  $(this).toggleClass("is-active");
  var content = wrapper.find(".tab-content-wrapper")
  $(content).each(function (index) {
    if (parseInt(tabIndex) === index) {
      $(this).show();
    } else {
      $(this).hide()
    }
  });
});

// forms
$("body").on("click", "form :submit", function (event) {
  event.preventDefault();
  var wrapper = $(this).parents("form")
  console.log("serialised", $(wrapper).serialize());
  $.ajax({
    url: this.http,
    type: 'POST',
    data: $(wrapper).serialize(),
    success: function (data) {
      console.log(data)
      // show notification
    },
    error: function (e) {
      console.log(e.message);
    }
  });
});

