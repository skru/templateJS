// navbar burger
$("body").on("click", "[data-zcc-block='navbar'] [data-zcc-block='navbar-burger']", function () {
  $(this).toggleClass("is-active");
  var wrapper = $(this).parents("[data-zcc-block='navbar']")
  wrapper.find("[data-zcc-block='navbar-menu']").toggleClass("is-active");
});
// navbar dropdown
$("body").on("click", "[data-zcc-block='navbar'] [data-zcc-block='navbar-dropdown']", function (event) {
  // prevent clicking on items closing menu
  console.log("cl")
  if ($(event.target).attr('data-zcc-block') === "navbar-link") {
    $(this).toggleClass("is-active");
    // close any other open menus
    var openMenus = $("body").find("[data-zcc-block='navbar-menu'] .is-active").not(this);
    console.log("opens", openMenus)
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
$("body").on("click", "[data-zcc-block='tabs'] [data-zcc-block='tab']", function (event) {
  var tabIndex = $(this).attr("data-zcc-tab");
  var wrapper = $(this).parents("[data-zcc-block='tabs']")
  wrapper.find("[data-zcc-block='tab']").removeClass("is-active");
  $(this).toggleClass("is-active");
  var content = wrapper.find("[data-zcc-block='tab-content']")
  $(content).each(function (index) {
    if (parseInt(tabIndex) === index) {
      $(this).show();
    } else {
      $(this).hide()
    }
  });
});

// forms
$("body").on("click", "[data-zcc-block='form'] [data-zcc-block='form-submit']", function (event) {
  event.preventDefault(); // prevent normal form submission
  var isValid = true;
  var wrapper = $(this).parents("[data-zcc-block='form']")
  var fields = $(wrapper).find("[data-zcc-block='form-field']");
  fields.each(function (index) {
    // get input and errors for each field
    var input = $(this).find("[data-zcc-block='form-field-input']")
    var errors = $(this).find("[data-zcc-block='form-field-error']")
    errors.html(""); // reset any errors
    if (!input[0].checkValidity()) { // check validity
      isValid = false;
      errors.html(input[0].validationMessage);
    }
  });
  if (isValid) {
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
  }
});