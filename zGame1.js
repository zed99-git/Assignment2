var myGamePiece;
var myObstacles = [];
var myScore;

function startGame() {
    myGamePiece = new component(30, 30, "orange", 100, 150);
    myGamePiece.gravity = 9;
    myScore = new component("30px", "Consolas", "blue", 550, 50, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 780;
        this.canvas.height = 340;
        this.context = this.canvas.getContext("2d"); //built-in object .getContext("2d") in canvas tag, creates drawing object
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context; //draws into canvas
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            displayLoseMessage()
            return;
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 140;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -2;
        myObstacles[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    if (myGameArea.frameNo === 1000) {
        displayWinMessage();
    }
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}

//restart option
function restartGame() {
    clearInterval(myGameArea.interval);
    myGameArea.clear();
    myObstacles = [];
    myGameArea.frameNo = 0;
    myGamePiece.x = 150;
    myGamePiece.y = 150;
    myGamePiece.gravity = 9;
    myGameArea.interval = setInterval(updateGameArea, 20);
}
//when losing
function displayLoseMessage() {
    clearInterval(myGameArea.interval);
    var loseText = new component("30px", "Consolas", "green", 250, 150, "text");
    loseText.text = "You Lose! Restart?";
    loseText.update();
}
//after winning
function displayWinMessage() {
    clearInterval(myGameArea.interval);
    var winText = new component("30px", "Consolas", "green", 300, 150, "text");
    winText.text = "You Win!";
    winText.update();

    var redirectButton = document.createElement("button");
    redirectButton.innerHTML = "Key 1";
    redirectButton.classList.add("key1-button"); //for styling purposes
    redirectButton.onclick = function() {
        redirectToAnotherPage();
    };
    document.body.appendChild(redirectButton);
}

function redirectToAnotherPage() {
    window.location.href = "Key1.html";
}



