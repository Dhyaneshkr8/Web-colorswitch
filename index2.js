
// rotation problem got to check out the width and height when it gets to screen rotation




var bestScoreStorage;
// LINE NO-133
var col;

var level;

var storageBos1;
var storageBos2;

var getBos1;
var getBos2;

var bestOfScore1 = 1;
var bestOfScore2 = 0;

var player;

var valPosition;


document.querySelector(".ruleBook").addEventListener("click", function(){
  var button = new Audio("button.wav");
  button.play();
  document.querySelector(".rules").classList.remove("hide");
  document.querySelector(".ruleBook").classList.add("hide");
  var btn = document.createElement("p");
  btn.innerHTML = "CLICK TO CLOSE";
  btn.style.color = "white";
  document.getElementById("clickbtn").appendChild(btn);
  btn.addEventListener("click", function(){
    var button = new Audio("button.wav");
    button.play();
    document.querySelector(".rules").classList.add("hide");
    btn.classList.add("hide");

    // location.reload();
  });
});



document.querySelector(".level1").addEventListener("click", function() {
  var button = new Audio("button.wav");
  button.play();
  level = 1;
  playerNumbers();
  levelChecker();
});


document.querySelector(".level2").addEventListener("click", function() {
  var button = new Audio("button.wav");
  button.play();
  level = 2;
  playerNumbers();
  levelChecker();

});



function levelChecker() {
  if (level === 1) {
    // col = ["black", "white", "black", "white"];
    col = ["red","blue","red","blue"];
    // var easyBgm = new Audio("Challenge Easy.mp3");
    // easyBgm.play();
    // col = ["#FF0000 ","green","#FF0000 ","green"];

  } else if (level === 2) {
    col = ['#F39', '#3FF', '#FF3', '#A0F'];
    // var hardBgm = new Audio("Challenge Hard.mp3");
    // hardBgm.play();

  } else {
    alert("WRONG CHOICE");

  }
}



function playerNumbers()

{

  document.querySelector(".Level-check").classList.add("hide");
  document.querySelector(".difficulty").innerHTML = "LET 's";


  var x1 = document.createElement("button");
  x1.innerHTML = "PLAY";
  x1.classList.add("level1");
  // var x2 = document.createElement("button");
  // x2.innerHTML = "PAIR";
  // x2.classList.add("level1");

  var division1 = document.getElementsByClassName("solo")[0];
  division1.appendChild(x1);

  // var division2 = document.getElementsByClassName("pair")[0];
  // division2.appendChild(x2);

  x1.addEventListener("click", function() {
    var button = new Audio("button.wav");
    button.play();
    // player = 1;
    x1.classList.add("hide");
    // x2.classList.add("hide");
    document.querySelector(".logo").classList.add("hide");
    gameStarts();
  });


  // x2.addEventListener("click", function() {
  //   var button = new Audio("button.wav");
  //   button.play();
  //   player = 2;
  //   x2.classList.add("hide");
  //   x1.classList.add("hide");
  //   document.querySelector(".logo").classList.add("hide");
  //   gameStarts();
  // });

}

document.querySelector(".pause").addEventListener("click", function(){
  var vict = new Audio("victory.wav");
  vict.play();
  setTimeout(function(){
    alert("            The  Game  is  PAUSED .                   Click  OK  to  Resume .");
  },50);


});






function gameStarts()
{
  document.querySelector(".logo").classList.add("hide");
  document.querySelector(".pause").classList.remove("hide");
  document.querySelector(".ruleBook").classList.add("hide");
  document.querySelector(".rules").classList.add("hide");
  document.querySelector(".footerBox").classList.add("hide");
  document.querySelector(".difficulty").classList.add("hide");


if (level == 1)
{
  var bGM = new Audio("EasyBGM.mp3");
  bGM.play();
  bGM.loop = true;
}
else
{
  var bGM = new Audio("HardBGM.mp3");
  bGM.play();
  bGM.loop = true;
}





  $(function() {

    // setting new-background

    $('body').css('background-color', 'rgb(35,35,35)');

    // variables declaration

    var FPS = 60;
    var T = TT = 0;
    var W = _W = 360;
    var H = _H = 512;
    var score = 0;
    var camY = 0;
    var died = false;

    // canvas context

    var canvas = $('<canvas>');
    var c = canvas[0].getContext('2d');



  var dim = {
    w: $(window).width(),
    h: $(window).height()
  };

  // setting the height

  $(canvas).attr({
    'width': W,
    'height': H
  });

  _H = dim.h;
  _W = dim.h * W / H;

  // game-play in landscape
  // screen rotation

  if (W / H > dim.w / dim.h) {
    _W = dim.w;
    _H = dim.w * H / W;
  };





  $(canvas).css({

    'position': 'absolute',
    'top': (dim.h - _H) / 2,
    'left': (dim.w - _W) / 2,
    'width': _W,
    'height': _H

  });





    // new-component of canvas in body

    $('body').append(canvas);

    // to draw circles for coloring

    // doubt
    var dCircle = function(coords, radius, color) {
      c.beginPath();
      c.fillStyle = color;
      c.arc(coords.x, coords.y, radius, 0, 2 * Math.PI);
      c.fill();
    };

    // To set up the coordinates for circle obstacle

    var coord = function(dx, dy) {
      return {
        x: dx,
        y: H + camY - dy
      };
    };

    // select the color

    var gCol = function(index) {
      var n = index;
      return col[n % 4];
    };

    // doubt

    var rRange = function(x1, x2) {
      return x1 + Math.random() * (x2 - x1);
    };

    // used to check on the direction of rotation of the obstacles (clockwise or anti-clockwise)

    var choose = function() {
      return arguments[Math.floor(arguments.length * Math.random())];
    };

    // selecting random color

    var rCol = function() {
      return col[Math.floor(4 * Math.random())];
    };

    // Repeating certain function

    var repeat = function(func, rep) {
      for (var _rep = 0; _rep < rep; _rep++) {
        func();
      };
    };

// doubt

    var getDots = function(xy1, xy2) {
      return {
        d: Math.sqrt(Math.pow(xy1.x - xy2.x, 2) + Math.pow(xy1.y - xy2.y, 2)),
        a: Math.atan2(xy1.y - xy2.y, xy2.x - xy1.x)
      };
    };

// when we hit the obstacle        GAME OVER

    var die = function() {
      bGM.pause();
      died = true;
      var dieBgm = new Audio("breakball1.wav");
      dieBgm.play();
      repeat(function() {
        newParticle(p.x, p.y + 5);
      }, 14);
      TT = 1;
    };

// Sending random numbers for 1 - 4 for colors

    var colIndex = Math.floor(4 * Math.random());

// To set the ball in its initial position with some random color

    var p = {
      x: W / 2,
      y: H / 4,
      r: 10,
      c: gCol(colIndex),
      spd: 0,
      spdMax: 6,
      acc: 0
    };

// Empty array

    var objects = [];

// doubt

    var newObject = function(x, y, r, c) {
      var o = {
        x: x,
        y: y,
        r: r,
        c: c,
        t: 0,
        destroyed: false
      };

      o.move = function() {};

      o.draw = function() {
        dCircle(coord(o.x, o.y), o.r, o.c);
      };

      o.destroy = function() {
        o.destroyed = true;
      };

      o.update = function() {
        o.move();
        o.draw();
        if (o.y + 100 < camY) {
          o.destroy();
        };
        o.t++;
      };

      objects.push(o);
      return o;
    };

// doubt

    var modAng = function(x) {
      var y = x;
      while (y < 0) {
        y += Math.PI * 2;
      };
      return y % (Math.PI * 2);
    };

// for obstacles

    var obstacles = {
      n: 0,
      sep: 350
    };

// Speed of the bouncer

    var cspd = 1;

// For the horizontal 8 obstacle part 1

    var new8 = function(y, ang, dir, col) {
      var o8 = newObject(W / 2, 100 + obstacles.sep * y, 10, gCol(col));
      o8.cx = o8.x;
      o8.cy = o8.y;
      o8.rad8 = 80;
      o8.d = dir;
      o8.a = ang;
      o8.move = function() {
        with(o8) {
          x = cx + 1.5 * rad8 * Math.cos(a);
          y = cy + 0.7 * rad8 * Math.sin(2 * a);
          a += d * 0.02;
        };
        if (!died && p.c != o8.c && getDots(coord(p.x, p.y), coord(o8.x, o8.y)).d < p.r + o8.r) {
          die();
        };
      };
    };

// For the horizontal 8 obstacle part 2 .This calls out the above obstacle function

    var newW8 = function(y) {
      var ddir = choose(-1, 1);
      for (var i = 0; i < Math.PI * 2; i += Math.PI * 2 / 20) {
        new8(y, i, ddir, Math.floor(8 * (i / (Math.PI * 2))));
      };
    };

// For the circular obstacle

    var newC1 = function(y, rad, ospd, dir) {
      var c1 = newObject(W / 2, 100 + obstacles.sep * y, rad, Math.floor(4 * Math.random()));
      c1.angle = Math.PI * 2 * Math.floor(4 * Math.random());
      c1.spd = dir * cspd * ospd;
      c1.w = c1.r * 15 / 100;
      c1.draw = function() {
        var co = coord(c1.x, c1.y);
        c.lineWidth = c1.w;
        for (var j = 0; j < 4; j++) {
          c.beginPath();
          c.strokeStyle = gCol(j + c1.c);
          var a = modAng(c1.angle + Math.PI / 2 * j);
          var a2 = modAng(a + Math.PI / 2);
          if (gCol(j + c1.c) != p.c && !died) {
            var dots = getDots(co, coord(p.x, p.y));
            if (dots.d + p.r > c1.r - c1.w / 2 && dots.d - p.r < c1.r + c1.w / 2) {
              var pa = modAng(-dots.a);
              if (pa > a && pa < a2) {
                die();
              };
            };
          };
          c.arc(co.x, co.y, c1.r, a, a2);
          c.stroke();
        };
        c1.angle += c1.spd * Math.PI / 180;
      };
    };



// reopening the new particle

    var newParticle = function(x, y) {
      var part = newObject(x, y, 5, rCol());
      part.g = 0.6;
      part.hspd = rRange(-10, 10);
      part.vspd = rRange(10, 20);
      part.move = function() {
        with(part) {
          vspd -= g;
          x += hspd;
          y += vspd;
          if (x < 0 || x > W) {
            hspd *= -1;
          };
          if (y < camY) {
            destroy();
          };
        };
      };
    };

// switching over of the colors in between

    var newSwitch = function(n) {
      var sw = newObject(W / 2, 100 + obstacles.sep * n + obstacles.sep / 2, 15, 'white');
      sw.move = function() {
        if (getDots({
            x: sw.x,
            y: sw.y
          }, {
            x: p.x,
            y: p.y
          }).d < p.r + sw.r) {
          p.c = gCol(++colIndex);
          var colorChange = new Audio("star.wav");
          colorChange.play();
          sw.destroy();
        };
      };

      sw.draw = function() {
        var co = coord(sw.x, sw.y);
        for (var i = 0; i < 4; i++) {
          var a = i * Math.PI / 2;
          c.fillStyle = col[i];
          c.beginPath();
          c.lineTo(co.x, co.y);
          c.arc(co.x, co.y, sw.r, a, a + Math.PI / 2);
          c.lineTo(co.x, co.y);
          c.fill();
        };
      };
    };

// score star

    var newStar = function(n) {
      var st = newObject(W / 2, 100 + obstacles.sep * n, 15, '#DDD');
      st.score = choose(1, 1, 1, 1, 1, 1, 1);
      st.a = 0;
      st.rs = st.r;
      st.move = function() {
        if (getDots({
            x: p.x,
            y: p.y
          }, {
            x: st.x,
            y: st.y
          }).d < st.r) {
          score += st.score;
          var scored = new Audio("colorswitch.wav");
          scored.play();
          st.destroy();
        };
        st.r = st.rs + 1.2 * Math.sin((st.a++) / 180 * Math.PI * 4);
      };
      st.draw = function() {
        dStar(st.x, st.y, st.r, 0, st.c, 1, st.score == 1);
      };
    };

// doubt

    var dStar = function(x, y, r1, ang, col, alpha, outline) {
      var co = coord(x, y);
      c.fillStyle = col;
      c.strokeStyle = col;
      c.lineWidth = 2;

      // changing
      c.globalAlpha = 1;
      c.beginPath();
      for (var j = 0; j <= 5; j++) {
        var a1 = j * Math.PI * 2 / 5 - Math.PI / 2 - ang;
        var a2 = a1 + Math.PI / 5;
        var r2 = r1 * 0.5;
        c.lineTo(co.x + r1 * Math.cos(a1), co.y + r1 * Math.sin(a1));
        c.lineTo(co.x + r2 * Math.cos(a2), co.y + r2 * Math.sin(a2));
      };
      if (outline) {
        c.fill();
      } else {
        c.stroke();
      };
      c.globalAlpha = 1;
    };
    p.yy = p.y;

// by default clicked shld be false, and if tap on the screen the it becomes true

    var clicked = false;

// when tap on the screen

    $(canvas).click(function() {
      var click = new Audio("jump.wav");
      click.play();
      clicked = true;
    });



    setInterval(function() {
      // the canvas coloring
      c.fillStyle = '#222';
      c.fillRect(0, 0, W, H);
      c.fillStyle = '#FFF';
      c.font = '30px Arial';
      c.textAlign = 'left';
      c.fillText(score, 10, 30);
      c.font = '50px Arial';
      c.textAlign = 'center';
      c.fillText('COLOR', W / 2, coord(0, 250).y);
      c.fillText('SWITCH', W / 2, coord(0, 200).y);
      while (obstacles.n < 2 + Math.floor(camY / obstacles.sep)) {
        obstacles.n += 1;
        switch (choose(0, 0, 0, 1, 1, 2, 2, 2)) {
          case 0:
            newC1(obstacles.n, choose(100, 100, 70), 1, choose(-1, 1));
            break;
          case 1:
            newC1(obstacles.n, 100, 2 / 3, 1);
            newC1(obstacles.n, 70, 1, -1);
            break;
          case 2:
            newW8(obstacles.n);
            break;
        };
        newSwitch(obstacles.n);
        newStar(obstacles.n);
        cspd *= 1.05;
      };



      if (!died) {
        if (clicked) {
          p.spd = p.spdMax;
          if (p.acc == 0) {
            p.spd *= 1.2;
            p.acc = -0.3;
          };
        };
        with(p) {
          spd = Math.max(spd + acc, -spdMax);
          y = Math.max(y + spd, yy);
          if (y < camY) {
            die();
          };
          dCircle(coord(x, y), r, c);
        };
      };



      for (var i in objects) {
        objects[i].update();
      };



      for (var i = objects.length - 1; i >= 0; i--) {
        if (objects[i].destroyed) {
          objects.splice(i, 1);
        };
      };



      camY = Math.max(camY, p.y - 250);
      T += TT;



      if (T > 70) {
        // c.globalAlpha = 0.7;
        c.fillStyle = 'rgb(35,35,35)';
        c.fillRect(0, 0, W, H);
        // c.globalAlpha = 1;
        c.fillStyle = '#000';
        c.strokeStyle = '#EEE';
        c.lineWidth = 2;
        document.querySelector(".pause").classList.add("hide");

        c.fillStyle = "white";
        c.fillText('GAME OVER', W / 2, H / 5);
        c.fillStyle = 'rgb(35,35,35)';

        c.strokeText('SCORE', W / 2, H / 3);
        c.fillStyle = "white";
        scoreCompare(score, level);
        c.strokeText(score, W / 2, H / 3 + 60);

        c.fillStyle = 'rgb(35,35,35)';

        c.strokeText('BEST SCORE', W / 2, H / 2 + 50);
        c.fillStyle = "white";
        if (level == 1) {
          c.strokeText(bestOfScore1, W / 2, H / 2 + 120);

        } else if (level == 2) {
          c.strokeText(bestOfScore2, W / 2, H / 2 + 120);

        }
        c.font = "20px Arial";

        c.fillText("TAP TO RESTART", W/2 , H/2 + 230);




        if (clicked) {
          document.querySelector(".pause").classList.remove("hide");
          bGM.play();
          score = 0;
          T = 0;
          TT = 0;
          camY = 0;
          cspd = 1;
          died = false;
          p.y = H * 1 / 4;
          p.acc = 0;
          p.spd = 0;
          objects = [];
          obstacles.n = 0;
        };
      };
      clicked = false;
    }, 1000 / FPS);
  });

}



function scoreCompare(score, level) {
  if (level == 1) {
    if (score > bestOfScore1) {
      bestOfScore1 = score;
    }
  }
  if (level == 2) {
    if (score > bestOfScore2) {
      bestOfScore2 = score;
    }
  }

  localStorage.setItem('storageBos1', bestOfScore1);
  localStorage.setItem('storageBos2', bestOfScore2);

}

getBos1 = localStorage.getItem('storageBos1');
getBos2 = localStorage.getItem('storageBos2');

bestOfScore1 = getBos1;
bestOfScore2 = getBos2;
