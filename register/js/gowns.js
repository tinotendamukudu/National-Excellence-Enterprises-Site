document.addEventListener("touchstart", function () {}, false);
(function ($) {
  "use strict";
  $("span#mgsYear").html(new Date().getFullYear());


  $("#quoteMeForm").on("submit", function (event) {
    event.preventDefault();
    submitForm();
  });
  /*$(function () {
    var randNumber_1 = parseInt(Math.ceil(Math.random() * 15), 10);
    var randNumber_2 = parseInt(Math.ceil(Math.random() * 15), 10);
    humanCheckCaptcha(randNumber_1, randNumber_2);
  });
  function humanCheckCaptcha(randNumber_1, randNumber_2) {
    $("#humanCheckCaptchaBox").html("Solve The Math ");
    $("#firstDigit").html(
      '<input name="mathfirstnum" id="mathfirstnum" class="form-control" type="text" value="' +
        randNumber_1 +
        '" readonly>'
    );
    $("#secondDigit").html(
      '<input name="mathsecondnum" id="mathsecondnum" class="form-control" type="text" value="' +
        randNumber_2 +
        '" readonly>'
    );
  }
  $("#quoteMeForm")
    .validator()
    .on("submit", function (event) {
      if (event.isDefaultPrevented()) {
        formError();
        submitMSG(false, "Please fill in the form properly!");
      } else {
        var mathPart_1 = parseInt($("#mathfirstnum").val(), 10);
        var mathPart_2 = parseInt($("#mathsecondnum").val(), 10);
        var correctMathSolution = parseInt(mathPart_1 + mathPart_2, 10);
        var inputHumanAns = $("#humanCheckCaptchaInput").val();
        if (inputHumanAns == correctMathSolution) {
          event.preventDefault();
          submitForm();
        } else {
          submitMSG(false, "Please solve Human Captcha!!!");
          return false;
        }
      }
    });*/
    function submitForm() {
      var form_data = new FormData($("#quoteMeForm")[0]);
      $("#processing-image").show();
      $("#final-step-buttons").hide();
      $.ajax({
          type: "POST",
          url: "gowns.php",
          data: form_data,
          processData: false,
          contentType: false,
          success: function (text) {
              if ($.trim(text) === "success") {
                  formSuccess();
              } else {
                  formError();
                  submitMSG(false, text);
              }
          },
          complete: function () {
              $("#processing-image").hide();
              $("#final-step-buttons").show();
          },
      });
  }
  
  $(function () {
    $(document).on("change", ":file", function () {
      var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input
          .val()
          .replace(/\\/g, "#")
          .replace(/.*\//, "");
      input.trigger("fileselect", [numFiles, label]);
    });
    $(":file").on("fileselect", function (event, numFiles, label) {
      var input = $(this).parents(".form-group").find(":text"),
        log = numFiles > 1 ? numFiles + " files selected" : label;
      if (input.length) {
        input.val(log);
      } else {
        if (log) alert(log);
      }
    });
  });
  function formSuccess() {
    $("#quoteMeForm")[0].reset();
    submitMSG(true, "Your Message Submitted Successfully!");
  }
  function formError() {
    $(".help-block.with-errors").removeClass("hidden");
  }
  function submitMSG(valid, msg) {
    if (valid) {
      var msgClasses = "h3 text-center text-success";
      $("#final-step-buttons").html(
        '<div class="h3 text-center text-success"> Thank you for your concern. We will get back to you soon!</div>'
      );
    } else {
      var msgClasses = "h3 text-center text-danger";
    }
    $("#mgsContactSubmit").removeClass().addClass(msgClasses).text(msg);
  }
})(jQuery);
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function nextStep2() {
  var reqcategory = $("#reqcategory").val();
  if (reqcategory) {
    $("#section-1 .help-block.with-errors").html("");
    $("#section-1").removeClass("open");
    $("#section-1").addClass("slide-left");
    $("#section-2").removeClass("slide-right");
    $("#section-2").addClass("open");
  } else {
    $("#section-1 .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please Fill the Form Properly</li></ul>'
    );
    $(".validcategory .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please Select Your Category</li></ul>'
    );
  }
}
function previousStep1() {
  $("#section-1").removeClass("slide-left");
  $("#section-1").addClass("open");
  $("#section-2").removeClass("open");
  $("#section-2").addClass("slide-right");
}

function nextStep3() {
  var shoulderwidth = $("#shoulderwidth").val();
  var chestwidth = $("#chestwidth").val();
  var cuff = $("#cuff").val();
  var sleevelength = $("#sleevelength").val();
  var bodylength = $("#bodylength").val();


  // Update display within the same function
  $("#shoulderwidthData").html("<strong>Shoulder Width:</strong> " + shoulderwidth);
  $("#chestwidthData").html("<strong>Chest Width:</strong> " + chestwidth);
  $("#cuffData").html("<strong>Cuff:</strong> " + cuff);
  $("#sleevelengthData").html("<strong>Sleeve Length:</strong> " + sleevelength);
  $("#bodylengthData").html("<strong>Body Length:</strong> " + bodylength);
  

  if (shoulderwidth) $(".validshoulderwidth .help-block.with-errors").html("");
  else
    $(".validshoulderwidth .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please enter Your Shoulder Width</li></ul>'
    );

  if (chestwidth) $(".validchestwidth .help-block.with-errors").html("");
  else
    $(".validchestwidth .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please enter Your Chest Width</li></ul>'
    );

  if (cuff) $(".validcuff .help-block.with-errors").html("");
  else
    $(".validcuff .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please enter Your Cuff Measurement</li></ul>'
    );

  if (sleevelength) $(".validsleevelength .help-block.with-errors").html("");
  else
    $(".validsleevelength .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please enter Your Sleeve Length</li></ul>'
    );

  if (bodylength) $(".validbodylength .help-block.with-errors").html("");
  else
    $(".validbodylength .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please enter Your Body Length</li></ul>'
    );

  if (shoulderwidth && chestwidth && cuff && sleevelength && bodylength) {
    $("#section-2 .help-block.with-errors.mandatory-error").html("");
    $("#section-2").removeClass("open");
    $("#section-2").addClass("slide-left");
    $("#section-3").removeClass("slide-right");
    $("#section-3").addClass("open");
  } else {
    $("#section-2 .help-block.with-errors.mandatory-error").html(
      '<ul class="list-unstyled"><li>Please Fill the Form Properly</li></ul>'
    );
  }
}

function previousStep2() {
  $("#section-2").removeClass("slide-left");
  $("#section-2").addClass("open");
  $("#section-3").removeClass("open");
  $("#section-3").addClass("slide-right");
}
function nextStep4() {
  var fname = $("#fname").val();
  var lname = $("#lname").val();
  var gender = $("#gender").val();
  var address = $("#address").val();
  var email = $("#email").val();
  var phone = $("#phone").val();
  var validemail = isEmail(email);
  if (fname) $(".validfname .help-block.with-errors").html("");
  else
    $(".validfname .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please enter First Name</li></ul>'
    );
  if (lname) $(".validlname .help-block.with-errors").html("");
  else
    $(".validlname .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please enter Last Name</li></ul>'
    );
  if (gender) $(".validgender .help-block.with-errors").html("");
  else
    $(".validgender .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please Select Gender</li></ul>'
    );
  if (address) $(".validaddress .help-block.with-errors").html("");
  else
    $(".validaddress .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please enter Address</li></ul>'
    );
  if (validemail) $(".validemail .help-block.with-errors").html("");
  else
    $(".validemail .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please enter valid email</li></ul>'
    );
  var filter =
    /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
  if (filter.test(phone)) {
    $(".validphone .help-block.with-errors").html("");
    var validphone = 1;
  } else {
    $(".validphone .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please enter valid Phone</li></ul>'
    );
    var validphone = 0;
  }
  if (
    fname.length > 0 &&
    fname &&
    lname.length > 0 &&
    lname &&
    gender &&
    address.length > 0 &&
    address &&
    validemail &&
    phone.length > 4 &&
    validphone > 0
  ) {
    $("#section-3 .help-block.with-errors.mandatory-error").html("");
    $("#section-3").removeClass("open");
    $("#section-3").addClass("slide-left");
    $("#section-4").removeClass("slide-right");
    $("#section-4").addClass("open");
  } else {
    $("#section-3 .help-block.with-errors.mandatory-error").html(
      '<ul class="list-unstyled"><li>Please Fill the Form Properly</li></ul>'
    );
  }
}
function previousStep3() {
  $("#section-3").removeClass("slide-left");
  $("#section-3").addClass("open");
  $("#section-4").removeClass("open");
  $("#section-4").addClass("slide-right");
}
function nextStep5() {
  var reqcategory = $("#reqcategory").val();
  var fname = $("#fname").val();
  var lname = $("#lname").val();
  var gender = $("#gender").val();
  var address = $("#address").val();
  var email = $("#email").val();
  var phone = $("#phone").val();
  var attachedFile = $("#attachedFile").val();
  var additionalinfo = $("#additionalinfo").val().replace(/\n/g, "<br>");

  $("#categoryData").html("<strong>Selected Categories:</strong> " + reqcategory);
  $("#firstNameData").html("<strong>First Name:</strong> " + fname);
  $("#lastNameData").html("<strong>Last Name:</strong> " + lname);
  $("#genderData").html("<strong>Gender:</strong> " + gender);
  $("#addressData").html("<strong>Address:</strong> " + address);
  $("#emailaddressData").html("<strong>email:</strong> " + email);
  $("#phoneData").html("<strong>Phone:</strong> " + phone);
  $("#additionalinfoData").html(
    "<strong>Additional Info:</strong><br> " + additionalinfo
  );
  if (additionalinfo.length > 0 && additionalinfo)
    $(".validreqdetails .help-block.with-errors").html("");
  else
    $(".validreqdetails .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please Provide Requirement Details</li></ul>'
    );
  if ($("#aggre").is(":checked"))
    $(".validagree .help-block.with-errors").html("");
  else
    $(".validagree .help-block.with-errors").html(
      '<ul class="list-unstyled"><li>Please Agree with terms &amp; conditions</li></ul>'
    );
  if (
    additionalinfo.length > 0 &&
    additionalinfo &&
    $("#aggre").is(":checked")
  ) {
    $("#section-4 .help-block.with-errors.mandatory-error").html("");
    $("#section-4").removeClass("open");
    $("#section-4").addClass("slide-left");
    $("#section-5").removeClass("slide-right");
    $("#section-5").addClass("open");
  } else {
    $("#section-4 .help-block.with-errors.mandatory-error").html(
      '<ul class="list-unstyled"><li>Please Fill the Form Properly</li></ul>'
    );
  }
}
function previousStep4() {
  $("#section-4").removeClass("slide-left");
  $("#section-4").addClass("open");
  $("#section-5").removeClass("open");
  $("#section-5").addClass("slide-right");
}
