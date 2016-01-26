
$("#singup-icon").on("click", function () {
    //alert($(this).css("left"));
    showhide();
});

function showhide() {
    if ($(".user-manager").css("left") !== "32px") {
        $(".user-manager").animate({
            left: "2em"
        }, 600, function () {
            // Animation complete.
        });
    } else {
        $(".user-manager").animate({
            left: "-17.5em"
        }, 600, function () {
            // Animation complete.
        });

    }
}