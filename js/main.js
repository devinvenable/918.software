$(document).ready(function () {
  $(document).on("click", ".div-buttons", function () {
    if (!$(".div-918").hasClass("shrink_logo")) {
      $(".div-918").addClass("shrink_logo");
    }
    $(".fill1").empty();
    $(".fill1").append($(".about_us").clone(true, true));
  });
});
