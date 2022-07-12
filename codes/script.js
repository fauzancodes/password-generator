//security
function disable_selection(target) {
    if (typeof target.onselectstart != 'undefined') //IE route
        target.onselectstart = function() {return false;};
    else if (typeof target.style.MozUserSelect != 'undefined') //Firefox route
        target.style.MozUserSelect = 'none';
    else //All other route (ie: Opera)
        target.onmousedown = function() {return false;};
    target.style.cursor = 'default';
}
disable_selection(document.body);

$(document).on("contextmenu", function() {
    return false;
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});
//--------------------

//default parameter
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowercase = "abcdefghijklmnopqrstuvwxyz";
var number = "0123456789";
var special = "#$%&_\/";
//--------------------

//get parameter
var passwordLength, userDefinedCharacters, uppercaseSwitch, lowercaseSwitch, numberSwitch, specialSwitch, generatedPassword, characters;
$("#generatePasswordButton").click(function () {
    passwordLength = $("#passwordLength").val();
    userDefinedCharacters = $("#userDefinedCharacters").val();
    uppercaseSwitch = $("#uppercaseSwitch").prop("checked");
    lowercaseSwitch = $("#lowercaseSwitch").prop("checked");
    numberSwitch = $("#numberSwitch").prop("checked");
    specialSwitch = $("#specialSwitch").prop("checked");

    if (passwordLength > 0) {
        characters = "";
        if (userDefinedCharacters != "") {
            characters += userDefinedCharacters;
        }
        if (uppercaseSwitch != false) {
            characters += uppercase;
        }
        if (lowercaseSwitch != false) {
            characters += lowercase;
        }
        if (numberSwitch != false) {
            characters += number;
        }
        if (specialSwitch != false) {
            characters += special;
        }
        var charactersArray = characters.split("");
        var randomizedArray = [];
        for (var i = 0;i < characters.length;i++) {
            var randomIndex = Math.floor(Math.random() * (characters.length - 0)) + 0;
            var randomCharacter = charactersArray[randomIndex];
            randomizedArray.push(randomCharacter);
        }
        for (var j = 0;j < (characters.length - passwordLength);j++) {
            randomizedArray.pop();
        }
        generatedPassword = randomizedArray.join("");

        $("#generatedPassword").val(generatedPassword);

        //console.log(`Password Length: ${passwordLength}, User Defined Characters: ${userDefinedCharacters}, Uppercase Switch: ${uppercaseSwitch}}, Lowercase Switch: ${lowercaseSwitch}, Number Switch: ${numberSwitch}, Special Switch: ${specialSwitch}, Characters: ${characters}, Generated Password: ${generatedPassword}`);
    }
    else {
        $("#warningModal").find(".modal-body").empty();
        $("#warningModal").find(".modal-body").text("Please fill the Password Length.");
        $("#warningModal").modal("show");
    }
});
$("#resetButton").click(function() {
    $("#passwordLength").val("");
    $("#userDefinedCharacters").val("");
    $("#generatedPassword").val("");
    if($("#uppercaseSwitch").prop("checked") == true) {
        $("#uppercaseSwitch").trigger("click");
    }
    if($("#lowercaseSwitch").prop("checked") == true) {
        $("#lowercaseSwitch").trigger("click");
    }
    if($("#numberSwitch").prop("checked") == true) {
        $("#numberSwitch").trigger("click");
    }
    if($("#specialSwitch").prop("checked") == true) {
        $("#specialSwitch").trigger("click");
    }
});
$("#showPasswordButton").click(function() {
    var passwordType = $("#generatedPassword").attr("type");
    if (passwordType == "password") {
        $(this).children().removeClass("fa-lock");
        $(this).children().addClass("fa-unlock");
        $("#generatedPassword").attr("type","text");
    }
    else if (passwordType == "text") {
        $(this).children().removeClass("fa-unlock");
        $(this).children().addClass("fa-lock");
        $("#generatedPassword").attr("type","password");
    }
});
$("#copyPasswordButton").click(function() {
    var passwordType = $("#generatedPassword").attr("type");
    if (passwordType == "password") {
        $("#generatedPassword").attr("type","text").select();
        document.execCommand("copy");
        $("#generatedPassword").attr("type","password");
    }
    else if (passwordType == "text") {
        $("#generatedPassword").select();
        document.execCommand("copy");
    }
});
function helpModal(helpModalId) {
    $(helpModalId).modal("show");
}
//--------------------
