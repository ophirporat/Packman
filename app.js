var context;
var shape = new Object();
var board;
var board_size = 20
var score;
var pac_color;
var start_time;
var time_elapsed;
var pacman_interval;
var monsters_interval;
var currPage = 'welcomePage';
var food_remain = 50;
var monstersAmount;
var color1;
var color2;
var color3;
var upkey;
var downkey;
var rightkey;
var leftkey;
var userNameInGame;
var randomBall = 0;
var balls = [food_remain - (Math.floor(food_remain * 0.3) + Math.floor(food_remain * 0.1)), Math.floor(food_remain * 0.3), Math.floor(food_remain * 0.1)]
    // var monsters =  
var users = [
    ['k', 'k']
];
var last_direction = 4;
var time_limit;
// var pacman_direction = 1;
var x; //position
var monsters;
var monsters_positions;
var food_settings;
var center = new Object();
var audio = new Audio('sounds/Pac-Man-Theme-Song.mp3');
var userNameInGame;
var cell_height;
var cell_width;
var object_radius;
var pacman_lives = 5;
var positions = [
    [1, 1],
    [1, board_size - 2],
    [board_size - 2, board_size - 2],
    [board_size - 2, 1]
];


$(document).ready(function() {
    context = canvas.getContext("2d");
    // StartGame();
});

function initialGamePage() {
    document.getElementById('username_game').innerHTML = "Hello, " + userNameInGame;
    document.getElementById('game_duration').innerHTML = "Game duration : " + time_limit;
    document.getElementById('food_amount').innerHTML = "Food amount : " + food_remain;
    document.getElementById('food_colors').innerHTML = "Food colors : ";
    document.getElementById('monsters_amount').innerHTML = "Monsters amount : " + monstersAmount;
    document.getElementById('lives').innerHTML = "Lives : " + pacman_lives;

    audio.play(); //#TODO: make the music stop when div change

}

function initialGameBoard() {
    board = new Array();
    cell_height = canvas.height / board_size;
    cell_width = canvas.width / board_size;

    for (var i = 0; i < board_size; i++) {
        board[i] = new Array();
        for (var j = 0; j < board_size; j++) {
            board[i][j] = 0;
        }
    }
}


function StartGame() {

    initialGameBoard();
    score = 0;
    pac_color = "yellow";
    var cnt = 100;
    var pacman_remain = 1;
    start_time = new Date();
    // var obsticals = [Math.floor(Math.random() * 9), Math.floor(Math.random() * 9), Math.floor(Math.random() * 9), Math.floor(Math.random() * 9)]
    create_monsters()
    initialGamePage();
    createWalls();
    for (var i = 0; i < board_size - 1; i++) {
        for (var j = 0; j < board_size - 1; j++) {
            var randomNum = Math.random();
            if (board[i][j] != 4) {
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
    food_remain = food_settings
        // was monsters positions
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
    pacman_interval = setInterval(UpdatePacmanPosition, 100);
    monsters_interval = setInterval(UpdateMonstersPosition, 500);
}

function createWalls() {

    for (var i = 0; i < board_size; i++) {
        for (var j = 0; j < board_size; j++) {
            if (i == 0 || i == (board_size - 1) || j == 0 || j == (board_size - 1)) {
                board[i][j] = 4
            }
        }
    }

    // board[1][5] = 4;
    board[1][8] = 4;
    board[2][2] = 4;
    board[2][3] = 4;
    board[2][5] = 4;
    // board[2][7] = 4;
    // board[2][8] = 4;
    // board[2][9] = 4;
    board[3][2] = 4;
    board[3][5] = 4;
    board[3][6] = 4;
    board[3][7] = 4;
    board[3][8] = 4;
    // board[3][9] = 4;
    board[4][5] = 4;
    // board[4][6] = 4;
    // board[4][8] = 4;
    board[5][2] = 4;
    board[5][3] = 4;
    board[5][5] = 4;
    // board[5][6] = 4;
    // board[5][7] = 4;
    board[5][8] = 4;
    board[5][9] = 4;
    board[6][3] = 4;
    board[6][5] = 4;
    // board[6][7] = 4;
    // board[7][2] = 4;
    board[7][3] = 4;
    // board[7][4] = 4;
    // board[7][5] = 4;
    // board[7][6] = 4;
    board[7][7] = 4;
    board[7][8] = 4;
    // board[7][9] = 4;
    board[8][3] = 4;
    // board[8][4] = 4;
    board[8][5] = 4;
    // board[8][6] = 4;
    // board[8][7] = 4;
    board[8][8] = 4;
    // board[8][9] = 4;
    board[9][1] = 4;
    // board[9][2] = 4;
    board[9][3] = 4;
    // board[9][5] = 4;
    // board[9][6] = 4;
    // board[9][7] = 4;
    board[9][8] = 4;
    // board[9][9] = 4;

    // board[10][13] = 4;

    for (var i = 1; i < board_size / 2; i++) {
        let index = 1;
        for (var j = 10; j < board_size - 1; j++) {
            board[i][j] = board[i][j - index];
            index += 2;
        }
    }

    let index = 1;
    for (var i = board_size / 2; i < board_size - 1; i++) {
        for (var j = 0; j < board_size - 1; j++) {
            board[i][j] = board[i - index][j];
        }
        index += 2;
    }

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

// function findRandomCell(board) {
//     var i = Math.floor(Math.random() * 9 + 1);
//     var j = Math.floor(Math.random() * 9 + 1);
//     while (board[i][j] == 2 || board[i][j] == 4) {
//         i = Math.floor(Math.random() * 9 + 1);
//         j = Math.floor(Math.random() * 9 + 1);
//     }
//     return [i, j];
// }

function findRandomEmptyCell(board) {
    var i = Math.floor(Math.random() * (board_size - 1) + 1);
    var j = Math.floor(Math.random() * (board_size - 1) + 1);
    while (board[i][j] != 0) {
        i = Math.floor(Math.random() * (board_size) + 1);
        j = Math.floor(Math.random() * (board_size) + 1);
    }
    return [i, j];
}

function GetKeyPressed() {
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
    object_radius = Math.min(cell_height, cell_width);
    for (var i = 0; i < board_size; i++) {
        for (var j = 0; j < board_size; j++) {

            center.x = (i + 0.5) * cell_width;
            center.y = (j + 0.5) * cell_height;
            if (board[i][j] == 2) { //pacman
                draw_pacman(x, center);
            } else if (board[i][j] == 1) { //balls
                context.beginPath();
                context.arc(center.x, center.y, object_radius / 6, 0, 2 * Math.PI); // circle
                context.fillStyle = color1; //color
                context.fill();
            } else if (board[i][j] == 3) { //balls
                context.beginPath();
                context.arc(center.x, center.y, object_radius / 6, 0, 2 * Math.PI); // circle
                context.fillStyle = color2; //color
                context.fill();
            } else if (board[i][j] == 5) { //balls
                context.beginPath();
                context.arc(center.x, center.y, object_radius / 6, 0, 2 * Math.PI); // circle
                context.fillStyle = color3; //color
                context.fill();
            } else if (board[i][j] == 4) { //wall
                context.beginPath();
                context.rect(center.x - cell_width / 2, center.y - cell_height / 2, object_radius, object_radius);
                context.fillStyle = "grey"; //color
                context.fill();
            }

        }
    }
    for (u = 0; u < monstersAmount; u++) {
        draw_monster(u)
    }

}

function getMonsterIndex(i, j) {

    for (var k = 0; k < monsters.length; k++) {
        if (monsters[k].x == i && monsters[k].y == j) return k;
    }
    return -1

    // for (var k = 0; k < monsters_positions.length; k++) {
    //     if (monsters_positions[k][0] == i && monsters_positions[k][1] == j) return k;
    // }
}

function draw_monster(monster_index) { //put a picture
    let monster = monsters[monster_index];
    // context.drawImage(monster.image, monster.x - cell_width / 2, monster.y - cell_height / 2, cell_width / 1.2, cell_height / 1.2);
    context.drawImage(monsters[monster_index].image, cell_height * monsters[monster_index].x, cell_width * monsters[monster_index].y, cell_height, cell_width)
}

function draw_pacman(direction, center) {
    context.beginPath();
    if (direction == undefined) {
        direction = last_direction;
    }
    if (direction == 2) { //down
        context.arc(center.x, center.y, object_radius / 2, 0.65 * Math.PI, -1.65 * Math.PI);
        last_direction = 2;
    } else if (direction == 3) { //left
        context.arc(center.x, center.y, object_radius / 2, 1.15 * Math.PI, -1.15 * Math.PI); ///
        last_direction = 3;
    } else if (direction == 4) { //right
        context.arc(center.x, center.y, object_radius / 2, 0.15 * Math.PI, 1.85 * Math.PI); ///
        last_direction = 4;
    } else if (direction == 1) { //up
        context.arc(center.x, center.y, object_radius / 2, 1.65 * Math.PI, 1.35 * Math.PI);
        last_direction = 1;
    }

    context.lineTo(center.x, center.y);
    context.fillStyle = pac_color;
    context.fill();
    // eye  
    context.beginPath();
    if (direction == 2) {
        context.arc(center.x + 10, center.y + 5, object_radius / 20, 0, 2 * Math.PI);
    } else if (direction == 3) {
        context.arc(center.x - 5, center.y - 10, object_radius / 20, 0, 2 * Math.PI);
    } else if (direction == 4) {
        context.arc(center.x + 5, center.y - 10, object_radius / 20, 0, 2 * Math.PI);
    } else if (direction == 1) {
        context.arc(center.x + 10, center.y - 5, object_radius / 20, 0, 2 * Math.PI);
        // circle
    }
    context.fillStyle = "black"; //color
    context.fill();
}

function create_monsters() {
    monsters = new Array(monstersAmount);

    for (var i = 0; i < monstersAmount; i++) {
        monsters[i] = new Object();
        cell = positions[i];
        monsters[i].x = cell[0];
        monsters[i].y = cell[1];
        monsters[i].image = new Image();
        monsters[i].image.src = "images/monster" + (i + 1) + ".jpg";
    }


}


function UpdatePacmanPosition() {
    board[shape.i][shape.j] = 0;
    x = GetKeyPressed();
    if (x == 1) {
        if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) { //up
            shape.j--;
            console.log("direction 1")
        }
    }
    if (x == 2) {
        if (shape.j < (board_size - 1) && board[shape.i][shape.j + 1] != 4) { //down
            shape.j++;
            console.log("direction 2")
        }
    }
    if (x == 3) {
        if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) { //left
            shape.i--;
            console.log("direction 3")
        }
    }
    if (x == 4) {
        if (shape.i < (board_size - 1) && board[shape.i + 1][shape.j] != 4) { //right
            shape.i++;
            console.log("direction 4")
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

    //game over- time is up
    if (time_elapsed >= time_limit) {
        Draw();
        window.clearInterval(pacman_interval);
        window.clearInterval(monsters_interval);
        if (score < 100) {
            window.alert("You are better than " + score + " points!");
        } else {
            window.alert("Winner!!!")
        }
    } else {
        Draw();
    }
}

function getMonsterDirection(monsterIndex) { //decide which direction to go according to pacman and update position in board
    // monster_position = monsters_positions[monsterIndex];
    // monster_x = monster_position[0];
    // monster_y = monster_position[1];
    let monster = monsters[monsterIndex]
    let direction = new Array()

    //check if monster in the same col with pacman
    if ((monster.y > shape.j) && (board[monster.x][monster.y - 1] != 4)) {
        direction.push(1) // go up
    }
    if ((monster.y < shape.j) && (board[monster.x][monster.y + 1] != 4)) {
        direction.push(2) //go down
    }
    //check if monster in the same row with pacman
    if ((monster.x > shape.i) && (board[monster.x - 1][monster.y] != 4)) {
        direction.push(3) // go left
    }
    if ((monster.x < shape.i) && board[monster.x + 1][monster.y] != 4) {
        direction.push(4) //go right
    }
    var randomNum = Math.floor(Math.random() * (direction.length - 1 + 1))
    return direction[randomNum];


}

function UpdateMonstersPosition() {
    for (var i = 0; i < monstersAmount; i++) {
        let direction = getMonsterDirection(i);
        // let yPosition = monsters_positions[i][1];
        // let xPosition = monsters_positions[i][0];
        let monster = monsters[i];
        if (monster.x == shape.i && monster.y == shape.j) {
            killPacman()
            Draw();

            return;
        }
        if (direction == 1) { //up
            monster.y--;
            // // monster_board[monster.x][monster.y - 1] = 6;
            // monster_board[monster.x][monster.y] = 0;

        }
        if (direction == 2) { //down
            // monster_board[monster.x][monster.y + 1] = 6;
            // monster_board[monster.x][monster.y] = 0;
            monster.y++;
        }
        if (direction == 3) { //left
            // monster_board[monster.x - 1][monster.y] = 6;
            // monster_board[monster.x][monster.y] = 0;
            monster.x--;
        }
        if (direction == 4) { //right
            // monster_board[monster.x + 1][monster.y] = 6;
            // monster_board[monster.x][monster.y] = 0;
            monster.x++;
        }
        // monsters_positions[i] = (monster.x, monster.y);


    }
    Draw();


}

function killPacman() {
    window.clearInterval(pacman_interval);
    window.clearInterval(monsters_interval);
    if (score > 9) score -= 10;
    if (pacman_lives > 0) {
        pacman_lives--;
        alert("Got you!! You have " + pacman_lives + " more lives")
        continueGame()
            //TODO: place pacman and monsters

    } else {
        alert("Loser!")

    }
    audio.pause();
}

function continueGame() {
    for (var i = 0; i < monstersAmount; i++) {
        cell = positions[i];
        monsters[i].x = cell[0];
        monsters[i].y = cell[1];
    }
    board[shape.i][shape.j] = 0;
    new_position = findRandomEmptyCellForPacman(board)
    shape.i = new_position[0]
    shape.j = new_position[1]
    board[shape.i][shape.j] = 2
    pacman_interval = setInterval(UpdatePacmanPosition, 100);
    monsters_interval = setInterval(UpdateMonstersPosition, 500);
    Draw()
}

function findRandomEmptyCellForPacman(board) {
    var i = Math.floor(Math.random() * (board_size - 2) + 1);
    var j = Math.floor(Math.random() * (board_size - 2) + 1);
    while (board[i][j] == 4) {
        i = Math.floor(Math.random() * (board_size - 2) + 1);
        j = Math.floor(Math.random() * (board_size - 2) + 1);
    }
    return [i, j];
}

function switchDivs(divId) {
    $('#' + currPage).hide();
    // $('#' + currPage)[0].reset();
    currPage = divId
    $('#' + divId).show();
}


function hide(divId) {
    $('#' + divId).hide();
}

/* birthDay form */

// var Days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // index => month [0-11]
// $(document).ready(function() {
//     var option = '<option value="day">day</option>';
//     var selectedDay = "day";
//     for (var i = 1; i <= Days[0]; i++) { //add option days
//         option += '<option value="' + i + '">' + i + '</option>';
//     }
//     $('#day').append(option);
//     $('#day').val(selectedDay);

//     var option = '<option value="month">month</option>';
//     var selectedMon = "month";
//     for (var i = 1; i <= 12; i++) {
//         option += '<option value="' + i + '">' + i + '</option>';
//     }
//     $('#month').append(option);
//     $('#month').val(selectedMon);

//     var option = '<option value="month">month</option>';
//     var selectedMon = "month";
//     for (var i = 1; i <= 12; i++) {
//         option += '<option value="' + i + '">' + i + '</option>';
//     }
//     $('#month2').append(option);
//     $('#month2').val(selectedMon);

//     var d = new Date();
//     var option = '<option value="year">year</option>';
//     selectedYear = "year";
//     for (var i = 1930; i <= d.getFullYear(); i++) { // years start i
//         option += '<option value="' + i + '">' + i + '</option>';
//     }
//     $('#year').append(option);
//     $('#year').val(selectedYear);
// });

// function isLeapYear(year) {
//     year = parseInt(year);
//     if (year % 4 != 0) {
//         return false;
//     } else if (year % 400 == 0) {
//         return true;
//     } else if (year % 100 == 0) {
//         return false;
//     } else {
//         return true;
//     }
// }

// function change_year(select) {
//     if (isLeapYear($(select).val())) {
//         Days[1] = 29;

//     } else {
//         Days[1] = 28;
//     }
//     if ($("#month").val() == 2) {
//         var day = $('#day');
//         var val = $(day).val();
//         $(day).empty();
//         var option = '<option value="day">day</option>';
//         for (var i = 1; i <= Days[1]; i++) { //add option days
//             option += '<option value="' + i + '">' + i + '</option>';
//         }
//         $(day).append(option);
//         if (val > Days[month]) {
//             val = 1;
//         }
//         $(day).val(val);
//     }
// }

// function change_month(select) {
//     var day = $('#day');
//     var val = $(day).val();
//     $(day).empty();
//     var option = '<option value="day">day</option>';
//     var month = parseInt($(select).val()) - 1;
//     for (var i = 1; i <= Days[month]; i++) { //add option days
//         option += '<option value="' + i + '">' + i + '</option>';
//     }
//     $(day).append(option);
//     if (val > Days[month]) {
//         val = 1;
//     }
//     $(day).val(val);
// }

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
    food_settings = food_remain
    time_limit = document.getElementById("timeLeft").value;
    if (time_limit < 60) {
        time_limit = 60;
        // alert("minimum time is 60 sec")
        // return false;
    }
    monstersAmount = document.getElementById("monsters").value;
    if (monstersAmount.length == 0) {
        monstersAmount = Math.floor(Math.random * 4) + 1;
        // alert("number of monsters chosen randomly")
    }
    // } else if (monstersAmount > 90 || monstersAmount < 50) {
    //     // alert("monsters is between 1 to 4")
    //     return false;
    // }
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
    food_settings = food_remain
    monstersAmount = Math.floor(Math.random() * 4) + 1;
    color1 = getRandomColor();
    color2 = getRandomColor();
    color3 = getRandomColor();
    time_limit = 60;
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

// function getKeyCode(char) {

//     var keyCode = char.charCodeAt(0);
//     if (keyCode > 90) { // 90 is keyCode for 'z'
//         return keyCode - 32;
//     }
//     return keyCode;
// }

// additional rules of form validation

$.validator.addMethod("validPassword", function(value) {
    return /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{6,}$/.test(value);
});

$.validator.addMethod("validName", function(value) {
    return /^[a-zA-Z ]+$/.test(value);
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
        errorClass: 'errors',
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
            },
            birthday: {
                required: true,
            },

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
            birthday: {
                required: "Please enter your birth date",
            },
        },

        submitHandler: function() {
            //add user to users array

            let username = $('#username').val();
            let password = $('#password').val();

            users.push([username, password]);

            switchDivs("loginPage");
            $('#registerForm')[0].reset();


        }


    });

    //Login
    $("#loginForm").validate({
        errorClass: 'errors',
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
            userNameInGame = $('#uname').val();
            switchDivs('settingsPage');
            $('#loginForm')[0].reset();

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

function show(div) {
    $('#' + div).show();
}

//ABOUT
// Get the modal
$("#aboutPage").ready(function() {

    var modal = document.getElementById("myModal");

    // // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal

    btn.onclick = function() {
            modal.style.display = "block";
        }
        // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    $(window).keydown(function(event) {
        if (event.keyCode == 27) {
            modal.style.display = "none";
        }
    });
});