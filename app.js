var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var currPage = 'welcomePage';
var food_remain = 50;
var monsters;
var color1;
var color2;
var color3;
var upkey;
var downkey;
var rightkey;
var leftkey;
var randomBall = 0;
var balls = [food_remain - (Math.floor(food_remain * 0.3) + Math.floor(food_remain * 0.1)), Math.floor(food_remain * 0.3), Math.floor(food_remain * 0.1)]
    // var settings = {}
var users = [
    ['k', 'k']
];
//heyyy
var time_limit;
var pacman_direction = 1;

$(document).ready(function() {
    context = canvas.getContext("2d");
    Start();
});

function StartGame() {
    board = new Array();
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var pacman_remain = 1;
    start_time = new Date();
    var obsticals = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9), Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)]


    for (var i = 0; i < 10; i++) {
        board[i] = new Array();
        for (var j = 0; j < 10; j++) {
            if (
                (i == obsticals[0] && j == obsticals[1]) ||
                (i == obsticals[2] && j == obsticals[3])
            ) {
                board[i][j] = 4;
                let randomDirection = Math.floor(Math.random() * 3) + 1
                if (randomDirection == 1 && i > 0) { board[i - 1][j] = 4 } else if (randomDirection == 2 && j < 9) { board[i][j + 1] = 4 }
                //  else if (randomDirection == 3 && i < 9) { board[i + 1][j] = 4 } 
                else if (randomDirection == 4 && j > 0) { board[i][j - 1] = 4 }
                continue;
            } else {
                var randomNum = Math.random();
                if (randomNum <= (1.0 * food_remain) / cnt) {
                    food_remain--;
                    randomBall = getNextBall();
                    if (randomBall == 0) board[i][j] = 1;
                    else if (randomBall == 1) board[i][j] = 3;
                    else if (randomBall == 2) board[i][j] = 5;
                    balls[randomBall]--;

                    // board[i][j] = 1;
                } else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
                    shape.i = i;
                    shape.j = j;
                    pacman_remain--;
                    board[i][j] = 2;
                } else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    while (food_remain > 0) {
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }
    keysDown = {};
    document.addEventListener(
        "keydown",
        function(e) {
            keysDown[e.keyCode] = true;
        },
        false
    );
    document.addEventListener(
        "keyup",
        function(e) {
            keysDown[e.keyCode] = false;
        },
        false
    );
    interval = setInterval(UpdatePosition, 250);
}

function getNextBall() {
    if (randomBall == 2) randomBall = 0;
    if (balls[randomBall] == 0) {
        if (randomBall < 2) randomBall++;
        else randomBall = 0;
        return getNextBall()

    } else {
        randomBall++;

        return randomBall;
    }

}

function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * 9 + 1);
    var j = Math.floor(Math.random() * 9 + 1);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * 9 + 1);
        j = Math.floor(Math.random() * 9 + 1);
    }
    return [i, j];
}

function GetKeyPressed() { // fix direction with letters!!!!
    if (keysDown[upkey]) { //left
        return 1;
    }
    if (keysDown[downkey]) { //right
        return 2;
    }
    if (keysDown[leftkey]) { //up
        return 3;
    }
    if (keysDown[rightkey]) { //down
        return 4;
    }
}

function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var center = new Object();
            center.x = i * 60 + 30;
            center.y = j * 60 + 30;
            if (board[i][j] == 2) { //pacman
                context.beginPath();
                context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 1) { //balls
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = color1; //color
                context.fill();

            } else if (board[i][j] == 3) { //balls
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = color2; //color
                context.fill();
            } else if (board[i][j] == 5) { //balls
                context.beginPath();
                context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
                context.fillStyle = color3; //color
                context.fill();
            } else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x - 30, center.y - 30, 60, 60);
                context.fillStyle = "grey"; //color
                context.fill();
            }
        }
    }
}

function UpdatePosition() {
    board[shape.i][shape.j] = 0;
    var x = GetKeyPressed();
    if (x == 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) { //right
            shape.j--;

        }
    }
    if (x == 2) {
        if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) { //left
            shape.j++;
        }
    }
    if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) { //down
            shape.i--;
        }
    }
    if (x == 4) {
        if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) { //up
            shape.i++;
        }
    }
    if (board[shape.i][shape.j] == 1) {
        score += 5;
    } else if (board[shape.i][shape.j] == 3) {
        score += 15;
    }
    if (board[shape.i][shape.j] == 5) {
        score += 25;
    }
    board[shape.i][shape.j] = 2;
    document.getElementById("lblScore").value = score;
    var currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (score >= 100 || time_elapsed >= time_limit) {
        window.clearInterval(interval);
        window.alert("Game completed");
        return;
    } else {
        Draw();
    }
}

function switchDivs(divId) {
    $('#' + currPage).hide();
    currPage = divId
    $('#' + divId).show()
}


function hide(divId) {
    $('#' + divId).hide();
}

/* birthDay form */

var Days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // index => month [0-11]
$(document).ready(function() {
    var option = '<option value="day">day</option>';
    var selectedDay = "day";
    for (var i = 1; i <= Days[0]; i++) { //add option days
        option += '<option value="' + i + '">' + i + '</option>';
    }
    $('#day').append(option);
    $('#day').val(selectedDay);

    var option = '<option value="month">month</option>';
    var selectedMon = "month";
    for (var i = 1; i <= 12; i++) {
        option += '<option value="' + i + '">' + i + '</option>';
    }
    $('#month').append(option);
    $('#month').val(selectedMon);

    var option = '<option value="month">month</option>';
    var selectedMon = "month";
    for (var i = 1; i <= 12; i++) {
        option += '<option value="' + i + '">' + i + '</option>';
    }
    $('#month2').append(option);
    $('#month2').val(selectedMon);

    var d = new Date();
    var option = '<option value="year">year</option>';
    selectedYear = "year";
    for (var i = 1930; i <= d.getFullYear(); i++) { // years start i
        option += '<option value="' + i + '">' + i + '</option>';
    }
    $('#year').append(option);
    $('#year').val(selectedYear);
});

function isLeapYear(year) {
    year = parseInt(year);
    if (year % 4 != 0) {
        return false;
    } else if (year % 400 == 0) {
        return true;
    } else if (year % 100 == 0) {
        return false;
    } else {
        return true;
    }
}

function change_year(select) {
    if (isLeapYear($(select).val())) {
        Days[1] = 29;

    } else {
        Days[1] = 28;
    }
    if ($("#month").val() == 2) {
        var day = $('#day');
        var val = $(day).val();
        $(day).empty();
        var option = '<option value="day">day</option>';
        for (var i = 1; i <= Days[1]; i++) { //add option days
            option += '<option value="' + i + '">' + i + '</option>';
        }
        $(day).append(option);
        if (val > Days[month]) {
            val = 1;
        }
        $(day).val(val);
    }
}

function change_month(select) {
    var day = $('#day');
    var val = $(day).val();
    $(day).empty();
    var option = '<option value="day">day</option>';
    var month = parseInt($(select).val()) - 1;
    for (var i = 1; i <= Days[month]; i++) { //add option days
        option += '<option value="' + i + '">' + i + '</option>';
    }
    $(day).append(option);
    if (val > Days[month]) {
        val = 1;
    }
    $(day).val(val);
}

function updateGridDetails() {
    // var upkey = 
    let valid = checkKeyValidation(document.getElementById("up").value, "up")
        // if (!valid) return false;
        // var downkey = ;
    valid = checkKeyValidation(document.getElementById("down").value, "down")
        // if (!valid) return false;
        // var leftkey = document.getElementById("left").value;
    valid = checkKeyValidation(document.getElementById("left").value, "left")
        // if (!valid) return false;
        // var rightkey = document.getElementById("right").value;
    valid = checkKeyValidation(document.getElementById("right").value, "right")
        // if (!valid) return false;
    food_remain = document.getElementById("foodNum").value;
    if (food_remain.length == 0) {
        food_remain = Math.floor(Math.random() * (90 - 50 + 1)) + 50; //change in other functions 
        // alert("number of monsters chosen randomly")
    } else if (food_remain > 90 || food_remain < 50) {
        alert("food is between 50 to 90")
        return false;
    }
    time_limit = document.getElementById("timeLeft").value;
    if (time_limit < 60) {
        alert("minimum time is 60 sec")
        return false;
    }
    monsters = document.getElementById("monstersNum").value;
    if (monsters.length == 0) {
        monsters = Math.floor(Math.random * 4) + 1;
        // alert("number of monsters chosen randomly")
    } else if (monsters > 90 || monsters < 50) {
        // alert("monsters is between 1 to 4")
        return false;
    }
    color1 = document.getElementById("ball1").value;
    color2 = document.getElementById("ball2").value;
    color3 = document.getElementById("ball3").value;
    StartGame()
    switchDivs("gamePage")
    return true;
}

function displayKeyCode(event, number) {
    if (number == 1) {
        id = "up";
        upkey = event.keyCode;
    } else if (number == 2) {
        id = "down";
        downkey = event.keyCode
    } else if (number == 3) {
        id = "left";
        leftkey = event.keyCode;
    } else if (number == 4) {
        id = "right";
        rightkey = event.keyCode;
    }
    document.getElementById(id).value = event.key;
    // var char = event.which || event.keyCode;


}

function randomize() {
    upkey = 38;
    downkey = 40
    leftkey = 37;
    rightkey = 39;
    food_remain = Math.floor(Math.random() * (90 - 50 + 1)) + 50; //change in other functions 
    monsters = Math.floor(Math.random * 4) + 1;
    color1 = getRandomColor();
    color2 = getRandomColor();
    color3 = getRandomColor();
    StartGame()
    switchDivs("gamePage")
    return true;

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function checkKeyValidation(key, role) {
    if (key.length == 1) {
        // if((/[0-9a-zA-Z]+$/).test(key))
        // if (role == 'up') upkey = getKeyCode(key)
        // else if (role == 'down') downkey = getKeyCode(key)
        // else if (role == 'left') leftkey = getKeyCode(key)
        // else if (role == 'right') rightkey = getKeyCode(key)
        // if (role == 'up') upkey = String.fromCharCode(key)
        // else if (role == 'down') downkey = String.fromCharCode(key)
        // else if (role == 'left') leftkey = String.fromCharCode(key)
        // else if (role == 'right') rightkey = String.fromCharCode(key)
        // return true;
    } //check with non letters input
    else if (key.length == 0) {
        // alert("defult key chosen for " + role + " key");
        if (role == 'up') upkey = 38
        else if (role == 'down') downkey = 40
        else if (role == 'left') leftkey = 37
        else if (role == 'right') rightkey = 39
        return true;

    } else {}
    //  alert("invalid output for " + role + " key")};
    return false;
}

function getKeyCode(char) {

    var keyCode = char.charCodeAt(0);
    if (keyCode > 90) { // 90 is keyCode for 'z'
        return keyCode - 32;
    }
    return keyCode;
}

// additional rules of form validation

$.validator.addMethod("validPassword", function(value) {
    return /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{6,}$/.test(value);
});

$.validator.addMethod("validName", function(value) {
    return /^[a-zA-Z]+$/.test(value);
});

$.validator.addMethod("passwordMatch", function() {
    let username = $('#uname').val();
    let password = $('#pass').val();

    let validUserName = "";
    let validPassword = "";
    for (var i = 0; i < users.length; i++) {
        if (users[i][0] == username) {
            validUserName = users[i][0];

            if (users[i][1] == password) {
                validPassword = users[i][1];
                break;
            }
        }
    }
    if (validUserName != "") {
        if (password == "") {
            return false;

        } else if (validPassword == "") {
            return false;

        } else {
            return true;
        }
    } else {
        return false;
    }
});


//forms validation 
$(document).ready(function() {

    //register
    $("#registerForm").validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true,
                minlength: 6,
                validPassword: true,
            },
            fullName: {
                required: true,
                validName: true,
            },
            email: {
                required: true,
                email: true,
            }
        },


        messages: {
            username: "Please enter username",
            password: {
                required: "Please enter a password",
                minlength: "Password must consist at least 6 characters",
                validPassword: "Please enter a valid password"
            },
            fullName: {
                required: "Please enter your full name",
                validName: "Name can only consist alphabetic chars"
            },
            email: {
                required: "Please enter your Email",
                email: "Please enter valid Email",
            },
        },

        submitHandler: function() {
            //add user to users array

            let username = $('#username').val();
            let password = $('#password').val();

            users.push([username, password]);

            switchDivs("loginPage");
        }


    });

    //Login
    $("#loginForm").validate({
        rules: {
            uname: {
                required: true
            },
            pass: {
                required: true,
                passwordMatch: true,
            },
        },

        messages: {
            uname: "Please enter username",
            pass: {
                required: "Please enter a password",
                passwordMatch: "Incorrect password"
            },
        },

        submitHandler: function() {
            switchDivs('settingsPage');
        }
    });
});


function displayKeyCode(event, number) {
    if (number == 1) id = "up";
    else if (number == 2) id = "down";
    else if (number == 3) id = "left";
    else if (number == 4) id = "right";
    document.getElementById(id).value = event.key;
    // var char = event.which || event.keyCode;

}