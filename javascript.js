$(function () {
  // navbar burger
  $("body").on("click", "[data-zcc-block='navbar'] [data-zcc-block='navbar-burger']", function () {
    $(this).toggleClass("is-active");
    var wrapper = $(this).parents("[data-zcc-block='navbar']")
    wrapper.find("[data-zcc-block='navbar-menu']").toggleClass("is-active");
  });
  // navbar dropdown
  $("body").on("click", "[data-zcc-block='navbar'] [data-zcc-block='navbar-dropdown']", function (event) {
    // prevent clicking on items closing menu
    if ($(event.target).attr('data-zcc-block') === "navbar-link") {
      $(this).toggleClass("is-active");
      // close any other open menus
      var openMenus = $("body").find("[data-zcc-block='navbar-menu'] .is-active").not(this);
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
  $("body").on("click", "[data-zcc-block='tabs'] [data-zcc-block='tab']", function () {
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
    console.log("fs", fields.length)
    if (fields.length !== 0) { // check form has fields
      var notification = $(wrapper).find("[data-zcc-block='form-notification']");
      // validate each field
      fields.each(function () {
        // get input and errors for each field
        var input = $(this).find("[data-zcc-block='form-field-input']")
        var errors = $(this).find("[data-zcc-block='form-field-error']")
        errors.html(""); // reset any errors

        switch (input.prop('type')) {
          case 'select-one': // validate select
            if (input.prop('required')) {
              if (!input[0].checkValidity() || input.val() === "") {
                isValid = false;
                errors.html("Please select an option");
              }
            }
            break;
          case 'select-multiple': // validate select multiple
            if (input.prop('required')) {
              if (!input[0].checkValidity() || input.val()[0] == "") {
                isValid = false;
                errors.html("Please select at least one option");
              }
            }
            break;
          default:
            if (!input[0].checkValidity()) { // check validity
              isValid = false;
              errors.html(input[0].validationMessage);
            }
        }
      });
      if (isValid) {
        $.ajax({
          url: this.http,
          type: 'POST',
          data: $(wrapper).serialize(),
          success: function () {
            // show notification
            notification[0].classList.remove("is-hidden");
          },
          error: function (xhr) {
            alert(xhr.responseText);
          }
        });
      }
    } else { alert("Form requires fields") }

  });

  // notifications
  var notifications = new Notifications(".notification");
  notifications.init();
});
