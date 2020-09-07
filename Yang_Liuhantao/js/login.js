function loadsignin() {
    var background = document.getElementsByClassName("modal-backdrop");
    var signin_interface = document.getElementsByClassName("signin");

    // console.log(background);
    console.log(signin_interface);
    for (var i = 0; i < background.length; i++){
        background[i].style.display = "block";
    }

    for (var i = 0; i < signin_interface.length; i++){
        signin_interface[i].style.display = "block";
    }
}

function exitsign() {
    var background = document.getElementsByClassName("modal-backdrop");
    var signin_interface = document.getElementsByClassName("rl-modal");

    // console.log(background);
    // console.log(signin_interface);
    for (var i = 0; i < background.length; i++){
        background[i].style.display = "none";
    }

    for (var i = 0; i < signin_interface.length; i++){
        signin_interface[i].style.display = "none";
    }
}