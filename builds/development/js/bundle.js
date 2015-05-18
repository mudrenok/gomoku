(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
  var win = [[1, 1, 1, 1, 1]];
  var unCovered4 = [[0, 1, 1, 1, 1, 0]];
  var unCovered3 = [
    [0, 1, 1, 1, 0, 0], [0, 0, 1, 1, 1, 0],
    [0, 1, 0, 1, 1, 0], [0, 1, 1, 0, 1, 0]
  ];
  var unCovered2 = [
    [0, 0, 1, 1, 0, 0], [0, 1, 0, 1, 0, 0],
    [0, 0, 1, 0, 1, 0], [0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0], [0, 1, 0, 0, 1, 0]
  ];
  var covered4 = [
    [-1, 1, 0, 1, 1, 1], [-1, 1, 1, 0, 1, 1],
    [-1, 1, 1, 1, 0, 1], [-1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, -1], [1, 0, 1, 1, 1, -1],
    [1, 1, 0, 1, 1, -1], [1, 1, 1, 0, 1, -1]
  ];
  var covered3 = [
    [-1, 1, 1, 1, 0, 0], [-1, 1, 1, 0, 1, 0],
    [-1, 1, 0, 1, 1, 0], [0, 0, 1, 1, 1, -1],
    [0, 1, 0, 1, 1, -1], [0, 1, 1, 0, 1, -1],
    [-1, 1, 0, 1, 0, 1, -1], [-1, 0, 1, 1, 1, 0, -1],
    [-1, 1, 1, 0, 0, 1, -1], [-1, 1, 0, 0, 1, 1, -1]
  ];

  (function() { //add same combinations for another player
    var allCombos = [win, unCovered4, unCovered3, unCovered2, covered4, covered3];
    for (var k = 0; k < allCombos.length; k++) {
      var temp = [];
      for (var j = 0; j < allCombos[k].length; j++) {
        var tmp = [];
        for (var i = 0; i < allCombos[k][j].length; i++)
          tmp[i] = -allCombos[k][j][i];
        temp.push(tmp);
      }
      for (var m = 0; m < temp.length; m++) {
        allCombos[k].push(temp[m]);
      }
    }
  }());

  var valueCombo = function(w, u2, u3, u4, c3, c4) {
    if (w > 0)            return 1000000000;
    if (u4 > 0)           return 100000000;
    if (c4 > 1)           return 10000000;
    if (u3 > 0 && c4 > 0) return 1000000;
    if (u3 > 1)           return 100000;

    if (u3 == 1) {
      if (u2 == 3)        return 40000;
      if (u2 == 2)        return 38000;
      if (u2 == 1)        return 35000;
      return 3450;
    }

    if (c4 == 1) {
      if (u2 == 3)        return 4500;
      if (u2 == 2)        return 4200;
      if (u2 == 1)        return 4100;
      return 4050;
    }

    if (c3 == 1) {
      if (u2 == 3)        return 3400;
      if (u2 == 2)        return 3300;
      if (u2 == 1)        return 3100;
    }

    if (c3 == 2) {
      if (u2 == 2)        return 3000;
      if (u2 == 1)        return 2900;
    }

    if (c3 == 3) {
      if (u2 == 1)        return 2800;
    }

    if (u2 == 4)          return 2700;
    if (u2 == 3)          return 2500;
    if (u2 == 2)          return 2000;
    if (u2 == 1)          return 1000;
    return 0;
  };

  var findArray = function(arr, inArr){
    var fCount = arr.length;
    var sCount = inArr.length;
    var k;
    for (var i = 0; i <= fCount - sCount; i++)
    {
      k = 0;
      for (var j = 0; j < sCount; j++)
      {
        if (arr[i + j] == inArr[j]) k++;
        else break;
      }
      if (k == sCount) return true;
    }
    return false;
  };

  var isAnyInArrays = function(combos, arr){
    for (var i = 0; i < combos.length; i++) {
      if (findArray(arr, combos[i])) return true;
    }
    return false;
  };

  var combinations = {};
  combinations.winValue = 1000000000;
  combinations.valuePosition = function(arr1,  arr2,  arr3,  arr4){ // 4 directions
    var w = 0, u2 = 0, u3 = 0, u4 = 0, c3 = 0, c4 = 0;
    var allArr = [arr1,  arr2,  arr3,  arr4];
    for (var i = 0; i < allArr.length; i++) {
      if (isAnyInArrays(win, allArr[i])) {
        w++;
        continue;
      }
      if (isAnyInArrays(covered4, allArr[i])) {
        c4++;
        continue;
      }
      if (isAnyInArrays(covered3, allArr[i])) {
        c3++;
        continue;
      }
      if (isAnyInArrays(unCovered4, allArr[i])) {
        u4++;
        continue;
      }
      if (isAnyInArrays(unCovered3, allArr[i])) {
        u3++;
        continue;
      }
      if (isAnyInArrays(unCovered2, allArr[i])) {
        u2++;
      }
    }
    return valueCombo(w, u2, u3, u4, c3, c4);
  };
  return combinations;
};
},{}],2:[function(require,module,exports){
Array.matrix = function(m,n,initial) {
  var a, i, j, mat = [];
  for (i = 0; i < m; i++) {
    a = [];
    for (j = 0; j < n; j++) {
      a[j] = initial;
    }
    mat[i] = a;
  }
  return mat;
};

var initCombinations = require('./combinations');

module.exports = function(player) {
  var gameSize = 5; // 5 in line
  var ring = 1; // ring size around current cells
  var win = false;
  var cellsCount = 15;
  var curState = Array.matrix(15, 15, 0);
  var complexity = 1;
  var maxPlayer = player || -1; // X = 1, O = -1
  var combinations = initCombinations();
  if (maxPlayer === -1) curState[7][7] = 1;

  var checkWin = function() {
    for (var i = 0; i < cellsCount; i++) {
      for (var j = 0; j < cellsCount; j++) {
        if (curState[i][j] == 0) continue;
        var playerVal = combinations.valuePosition(
          getCombo(curState, curState[i][j], i, j, 1, 0),
          getCombo(curState, curState[i][j], i, j, 0, 1),
          getCombo(curState, curState[i][j], i, j, 1, 1),
          getCombo(curState, curState[i][j], i, j, 1, -1)
        );
        if (playerVal === combinations.winValue) {
          win = true;
        }
      }
    }
  };

  var miniMax = function minimax(node, depth, player, parent) {
    if (depth == 0) return heuristic(node, parent);
    var alpha = Number.MIN_VALUE;
    var childs = getChilds(node, player);
    for (var i = 0; i < childs.length; i++) {
      alpha = Math.max(alpha, -minimax(childs[i], depth - 1, -player, node));
    }
    return alpha;
  };

  var isAllSatisfy = function (candidates, pointX, pointY) {
    var counter = 0;
    for (var i = 0; i < candidates.length; i++) {
      if (pointX != candidates[i][0] || pointY != candidates[i][1]) counter++;
    }
    return counter == candidates.length;
  };

  var getChilds = function(parent, player) {
    var children = [];
    var candidates = [];
    for (var i = 0; i < cellsCount; i++) {
      for (var j = 0; j < cellsCount; j++) {
        if (parent[i][j] != 0) {
          for (var k = i - ring; k <= i + ring; k++) {
            for (var l = j - ring; l <= j + ring; l++) {
              if (k >= 0 && l >= 0 && k < cellsCount && l < cellsCount) {
                if (parent[k][l] == 0) {
                  var curPoint = [k, l];
                  var flag = isAllSatisfy(candidates, curPoint[0], curPoint[1]);
                  if (flag) candidates.push(curPoint);
                }
              }
            }
          }
        }
      }
    }
    for (var f = 0; f < candidates.length; f++) {
      var tmp = Array.matrix(cellsCount, cellsCount, 0);
      for (var m = 0; m < cellsCount; m++) {
        for (var n = 0; n < cellsCount; n++) {
          tmp[m][n] = parent[m][n];
        }
      }
      tmp[candidates[f][0]][candidates[f][1]] = -player;
      children.push(tmp);
    }
    return children;
  };

  var getCombo = function(node, curPlayer, i, j, dx, dy) {
    var combo = [curPlayer];
    for (var m = 1; m < gameSize; m++) {
      var nextX1 = i - dx * m;
      var nextY1 = j - dy * m;
      if (nextX1 >= cellsCount || nextY1 >= cellsCount || nextX1 < 0 || nextY1 < 0) break;
      var next1 = node[nextX1][nextY1];
      if (node[nextX1][nextY1] == -curPlayer) {
        combo.unshift(next1);
        break;
      }
      combo.unshift(next1);
    }
    for (var k = 1; k < gameSize; k++) {
      var nextX = i + dx * k;
      var nextY = j + dy * k;
      if (nextX >= cellsCount || nextY >= cellsCount || nextX < 0 || nextY < 0) break;
      var next = node[nextX][nextY];
      if (next == -curPlayer) {
        combo.push(next);
        break;
      }
      combo.push(next);
    }
    return combo;
  };

  var heuristic = function(newNode, oldNode) {
    for (var i = 0; i < cellsCount; i++) {
      for (var j = 0; j < cellsCount; j++) {
        if (newNode[i][j] != oldNode[i][j]) {
          var curCell = newNode[i][j];
          var playerVal = combinations.valuePosition(
            getCombo(newNode, curCell, i, j, 1, 0),
            getCombo(newNode, curCell, i, j, 0, 1),
            getCombo(newNode, curCell, i, j, 1, 1),
            getCombo(newNode, curCell, i, j, 1, -1)
          );
          newNode[i][j] = -curCell;
          var oppositeVal = combinations.valuePosition(
            getCombo(newNode, -curCell, i, j, 1, 0),
            getCombo(newNode, -curCell, i, j, 0, 1),
            getCombo(newNode, -curCell, i, j, 1, 1),
            getCombo(newNode, -curCell, i, j, 1, -1)
          );
          newNode[i][j] = -curCell;
          return 2 * playerVal + oppositeVal;
        }
      }
    }
    return 0;
  };

  var getLogic = {};
  getLogic.winState = "";
  getLogic.makeAnswer = function(x, y) {
    var that = this;
    curState[x][y] = maxPlayer;
    checkWin();
    if (win){
      that.winState = "you win";
      return "";
    }
    var answ = [-1, -1];
    var c = getChilds(curState, maxPlayer);
    var maxChild = -1;
    var maxValue = Number.MIN_VALUE;
    for (var k = 0; k < c.length; k++) {
      var curValue = miniMax(c[k], 0, -maxPlayer, curState);
      if (complexity > 1) {
        //var curValue2 = miniMax(c[k], complexity - 1, -maxPlayer, curState);
        //use it for more complex game!
      }
      if (maxValue < curValue) {
        maxValue = curValue;
        maxChild = k;
      }
    }
    for (var i = 0; i < cellsCount; i++) {
      for (var j = 0; j < cellsCount; j++) {
        if (c[maxChild][i][j] != curState[i][j]) {
          answ[0] = i;
          answ[1] = j;
          curState[answ[0]][answ[1]] = -maxPlayer;
          checkWin();
          if (win){
            that.winState = "you lost";
          }
          return answ;
        }
      }
    }
    return answ;
  };
  return getLogic;
};
},{"./combinations":1}],3:[function(require,module,exports){
$(document).ready(function(){
  var initLogic = require('./gomoku/logic');
  var logic = initLogic();

  $("#7-7").addClass("boardCellCross");
  var currValue = -1; // player - O, computer - X
  var gameOver = false;

  $('div.boardCol').mousedown(handleMouseDown);
  function handleMouseDown(e){
    if(gameOver) return "";
    var cell = $(this);
    if (cell.children().hasClass("boardCellCircle")) return "";
    if (cell.children().hasClass("boardCellCross")) return "";
    var indexes = (cell.children().attr('id')).split("-");
    var answer = logic.makeAnswer(indexes[0],indexes[1]);
    if(answer !== ""){
      var getedId = '#' +answer[0] + '-' + answer[1];
      $(getedId).addClass(deserve());
    } else currValue *= -1;
    cell.children().addClass(deserve());
    function deserve(){
      currValue *= -1;
      if (currValue === 1) {
        return "boardCellCross";
      }
      return "boardCellCircle";
    }
    if (logic.winState !== ""){
      var message = $("#message");
      message.text(logic.winState);
      gameOver = true;
      message.removeClass("looseState");
      if (logic.winState === "you lost"){
        message.addClass("looseState");
      }
    }
  }

  $("#scale-Up").click(handleScale);
  $("#scale-Down").click(handleScale);
  function handleScale(e){
    var value = 100;
    var minValue = 300;
    var delta =  $(this).attr('id').split("-")[1];
    var board = $(".board");
    var controls = $(".controls");
    if (delta === "Up"){
      board.width(board.width() + value);
      board.height(board.height() + value);
      controls.width(controls.width() + value);
      controls.height(controls.height() + value/15);
    }
    if (delta === "Down" && board.width() > minValue){
      board.width(board.width() - value);
      board.height(board.height() - value);
      controls.width(controls.width() - value);
      controls.height(controls.height() - value/15);
    }
  }

  $("#new-O").parent().click(handleNewGame);
  $("#new-X").parent().click(handleNewGame);
  function handleNewGame(e){
    var index = ($(this).children().attr('id')).split("-")[1];
    $(".boardCell").removeClass("boardCellCross boardCellCircle");
    gameOver = false;
    $("#message").text("");
    if (index === "O"){
      logic = initLogic();
      $("#7-7").addClass("boardCellCross");
      currValue = -1;
    }
    if (index === "X"){
      logic = initLogic(1);
      currValue = 1;
    }
    $("#check").prop('checked', false);
  }
});
},{"./gomoku/logic":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZ29tb2t1L2NvbWJpbmF0aW9ucy5qcyIsInNyYy9qcy9nb21va3UvbG9naWMuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciB3aW4gPSBbWzEsIDEsIDEsIDEsIDFdXTtcclxuICB2YXIgdW5Db3ZlcmVkNCA9IFtbMCwgMSwgMSwgMSwgMSwgMF1dO1xyXG4gIHZhciB1bkNvdmVyZWQzID0gW1xyXG4gICAgWzAsIDEsIDEsIDEsIDAsIDBdLCBbMCwgMCwgMSwgMSwgMSwgMF0sXHJcbiAgICBbMCwgMSwgMCwgMSwgMSwgMF0sIFswLCAxLCAxLCAwLCAxLCAwXVxyXG4gIF07XHJcbiAgdmFyIHVuQ292ZXJlZDIgPSBbXHJcbiAgICBbMCwgMCwgMSwgMSwgMCwgMF0sIFswLCAxLCAwLCAxLCAwLCAwXSxcclxuICAgIFswLCAwLCAxLCAwLCAxLCAwXSwgWzAsIDEsIDEsIDAsIDAsIDBdLFxyXG4gICAgWzAsIDAsIDAsIDEsIDEsIDBdLCBbMCwgMSwgMCwgMCwgMSwgMF1cclxuICBdO1xyXG4gIHZhciBjb3ZlcmVkNCA9IFtcclxuICAgIFstMSwgMSwgMCwgMSwgMSwgMV0sIFstMSwgMSwgMSwgMCwgMSwgMV0sXHJcbiAgICBbLTEsIDEsIDEsIDEsIDAsIDFdLCBbLTEsIDEsIDEsIDEsIDEsIDBdLFxyXG4gICAgWzAsIDEsIDEsIDEsIDEsIC0xXSwgWzEsIDAsIDEsIDEsIDEsIC0xXSxcclxuICAgIFsxLCAxLCAwLCAxLCAxLCAtMV0sIFsxLCAxLCAxLCAwLCAxLCAtMV1cclxuICBdO1xyXG4gIHZhciBjb3ZlcmVkMyA9IFtcclxuICAgIFstMSwgMSwgMSwgMSwgMCwgMF0sIFstMSwgMSwgMSwgMCwgMSwgMF0sXHJcbiAgICBbLTEsIDEsIDAsIDEsIDEsIDBdLCBbMCwgMCwgMSwgMSwgMSwgLTFdLFxyXG4gICAgWzAsIDEsIDAsIDEsIDEsIC0xXSwgWzAsIDEsIDEsIDAsIDEsIC0xXSxcclxuICAgIFstMSwgMSwgMCwgMSwgMCwgMSwgLTFdLCBbLTEsIDAsIDEsIDEsIDEsIDAsIC0xXSxcclxuICAgIFstMSwgMSwgMSwgMCwgMCwgMSwgLTFdLCBbLTEsIDEsIDAsIDAsIDEsIDEsIC0xXVxyXG4gIF07XHJcblxyXG4gIChmdW5jdGlvbigpIHsgLy9hZGQgc2FtZSBjb21iaW5hdGlvbnMgZm9yIGFub3RoZXIgcGxheWVyXHJcbiAgICB2YXIgYWxsQ29tYm9zID0gW3dpbiwgdW5Db3ZlcmVkNCwgdW5Db3ZlcmVkMywgdW5Db3ZlcmVkMiwgY292ZXJlZDQsIGNvdmVyZWQzXTtcclxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgYWxsQ29tYm9zLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgIHZhciB0ZW1wID0gW107XHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYWxsQ29tYm9zW2tdLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgdmFyIHRtcCA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsQ29tYm9zW2tdW2pdLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgdG1wW2ldID0gLWFsbENvbWJvc1trXVtqXVtpXTtcclxuICAgICAgICB0ZW1wLnB1c2godG1wKTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKHZhciBtID0gMDsgbSA8IHRlbXAubGVuZ3RoOyBtKyspIHtcclxuICAgICAgICBhbGxDb21ib3Nba10ucHVzaCh0ZW1wW21dKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0oKSk7XHJcblxyXG4gIHZhciB2YWx1ZUNvbWJvID0gZnVuY3Rpb24odywgdTIsIHUzLCB1NCwgYzMsIGM0KSB7XHJcbiAgICBpZiAodyA+IDApICAgICAgICAgICAgcmV0dXJuIDEwMDAwMDAwMDA7XHJcbiAgICBpZiAodTQgPiAwKSAgICAgICAgICAgcmV0dXJuIDEwMDAwMDAwMDtcclxuICAgIGlmIChjNCA+IDEpICAgICAgICAgICByZXR1cm4gMTAwMDAwMDA7XHJcbiAgICBpZiAodTMgPiAwICYmIGM0ID4gMCkgcmV0dXJuIDEwMDAwMDA7XHJcbiAgICBpZiAodTMgPiAxKSAgICAgICAgICAgcmV0dXJuIDEwMDAwMDtcclxuXHJcbiAgICBpZiAodTMgPT0gMSkge1xyXG4gICAgICBpZiAodTIgPT0gMykgICAgICAgIHJldHVybiA0MDAwMDtcclxuICAgICAgaWYgKHUyID09IDIpICAgICAgICByZXR1cm4gMzgwMDA7XHJcbiAgICAgIGlmICh1MiA9PSAxKSAgICAgICAgcmV0dXJuIDM1MDAwO1xyXG4gICAgICByZXR1cm4gMzQ1MDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYzQgPT0gMSkge1xyXG4gICAgICBpZiAodTIgPT0gMykgICAgICAgIHJldHVybiA0NTAwO1xyXG4gICAgICBpZiAodTIgPT0gMikgICAgICAgIHJldHVybiA0MjAwO1xyXG4gICAgICBpZiAodTIgPT0gMSkgICAgICAgIHJldHVybiA0MTAwO1xyXG4gICAgICByZXR1cm4gNDA1MDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYzMgPT0gMSkge1xyXG4gICAgICBpZiAodTIgPT0gMykgICAgICAgIHJldHVybiAzNDAwO1xyXG4gICAgICBpZiAodTIgPT0gMikgICAgICAgIHJldHVybiAzMzAwO1xyXG4gICAgICBpZiAodTIgPT0gMSkgICAgICAgIHJldHVybiAzMTAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjMyA9PSAyKSB7XHJcbiAgICAgIGlmICh1MiA9PSAyKSAgICAgICAgcmV0dXJuIDMwMDA7XHJcbiAgICAgIGlmICh1MiA9PSAxKSAgICAgICAgcmV0dXJuIDI5MDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGMzID09IDMpIHtcclxuICAgICAgaWYgKHUyID09IDEpICAgICAgICByZXR1cm4gMjgwMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodTIgPT0gNCkgICAgICAgICAgcmV0dXJuIDI3MDA7XHJcbiAgICBpZiAodTIgPT0gMykgICAgICAgICAgcmV0dXJuIDI1MDA7XHJcbiAgICBpZiAodTIgPT0gMikgICAgICAgICAgcmV0dXJuIDIwMDA7XHJcbiAgICBpZiAodTIgPT0gMSkgICAgICAgICAgcmV0dXJuIDEwMDA7XHJcbiAgICByZXR1cm4gMDtcclxuICB9O1xyXG5cclxuICB2YXIgZmluZEFycmF5ID0gZnVuY3Rpb24oYXJyLCBpbkFycil7XHJcbiAgICB2YXIgZkNvdW50ID0gYXJyLmxlbmd0aDtcclxuICAgIHZhciBzQ291bnQgPSBpbkFyci5sZW5ndGg7XHJcbiAgICB2YXIgaztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGZDb3VudCAtIHNDb3VudDsgaSsrKVxyXG4gICAge1xyXG4gICAgICBrID0gMDtcclxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzQ291bnQ7IGorKylcclxuICAgICAge1xyXG4gICAgICAgIGlmIChhcnJbaSArIGpdID09IGluQXJyW2pdKSBrKys7XHJcbiAgICAgICAgZWxzZSBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBpZiAoayA9PSBzQ291bnQpIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIHZhciBpc0FueUluQXJyYXlzID0gZnVuY3Rpb24oY29tYm9zLCBhcnIpe1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21ib3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGZpbmRBcnJheShhcnIsIGNvbWJvc1tpXSkpIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIHZhciBjb21iaW5hdGlvbnMgPSB7fTtcclxuICBjb21iaW5hdGlvbnMud2luVmFsdWUgPSAxMDAwMDAwMDAwO1xyXG4gIGNvbWJpbmF0aW9ucy52YWx1ZVBvc2l0aW9uID0gZnVuY3Rpb24oYXJyMSwgIGFycjIsICBhcnIzLCAgYXJyNCl7IC8vIDQgZGlyZWN0aW9uc1xyXG4gICAgdmFyIHcgPSAwLCB1MiA9IDAsIHUzID0gMCwgdTQgPSAwLCBjMyA9IDAsIGM0ID0gMDtcclxuICAgIHZhciBhbGxBcnIgPSBbYXJyMSwgIGFycjIsICBhcnIzLCAgYXJyNF07XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbEFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoaXNBbnlJbkFycmF5cyh3aW4sIGFsbEFycltpXSkpIHtcclxuICAgICAgICB3Kys7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzQW55SW5BcnJheXMoY292ZXJlZDQsIGFsbEFycltpXSkpIHtcclxuICAgICAgICBjNCsrO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc0FueUluQXJyYXlzKGNvdmVyZWQzLCBhbGxBcnJbaV0pKSB7XHJcbiAgICAgICAgYzMrKztcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNBbnlJbkFycmF5cyh1bkNvdmVyZWQ0LCBhbGxBcnJbaV0pKSB7XHJcbiAgICAgICAgdTQrKztcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNBbnlJbkFycmF5cyh1bkNvdmVyZWQzLCBhbGxBcnJbaV0pKSB7XHJcbiAgICAgICAgdTMrKztcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNBbnlJbkFycmF5cyh1bkNvdmVyZWQyLCBhbGxBcnJbaV0pKSB7XHJcbiAgICAgICAgdTIrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlQ29tYm8odywgdTIsIHUzLCB1NCwgYzMsIGM0KTtcclxuICB9O1xyXG4gIHJldHVybiBjb21iaW5hdGlvbnM7XHJcbn07IiwiQXJyYXkubWF0cml4ID0gZnVuY3Rpb24obSxuLGluaXRpYWwpIHtcclxuICB2YXIgYSwgaSwgaiwgbWF0ID0gW107XHJcbiAgZm9yIChpID0gMDsgaSA8IG07IGkrKykge1xyXG4gICAgYSA9IFtdO1xyXG4gICAgZm9yIChqID0gMDsgaiA8IG47IGorKykge1xyXG4gICAgICBhW2pdID0gaW5pdGlhbDtcclxuICAgIH1cclxuICAgIG1hdFtpXSA9IGE7XHJcbiAgfVxyXG4gIHJldHVybiBtYXQ7XHJcbn07XHJcblxyXG52YXIgaW5pdENvbWJpbmF0aW9ucyA9IHJlcXVpcmUoJy4vY29tYmluYXRpb25zJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHBsYXllcikge1xyXG4gIHZhciBnYW1lU2l6ZSA9IDU7IC8vIDUgaW4gbGluZVxyXG4gIHZhciByaW5nID0gMTsgLy8gcmluZyBzaXplIGFyb3VuZCBjdXJyZW50IGNlbGxzXHJcbiAgdmFyIHdpbiA9IGZhbHNlO1xyXG4gIHZhciBjZWxsc0NvdW50ID0gMTU7XHJcbiAgdmFyIGN1clN0YXRlID0gQXJyYXkubWF0cml4KDE1LCAxNSwgMCk7XHJcbiAgdmFyIGNvbXBsZXhpdHkgPSAxO1xyXG4gIHZhciBtYXhQbGF5ZXIgPSBwbGF5ZXIgfHwgLTE7IC8vIFggPSAxLCBPID0gLTFcclxuICB2YXIgY29tYmluYXRpb25zID0gaW5pdENvbWJpbmF0aW9ucygpO1xyXG4gIGlmIChtYXhQbGF5ZXIgPT09IC0xKSBjdXJTdGF0ZVs3XVs3XSA9IDE7XHJcblxyXG4gIHZhciBjaGVja1dpbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxsc0NvdW50OyBpKyspIHtcclxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjZWxsc0NvdW50OyBqKyspIHtcclxuICAgICAgICBpZiAoY3VyU3RhdGVbaV1bal0gPT0gMCkgY29udGludWU7XHJcbiAgICAgICAgdmFyIHBsYXllclZhbCA9IGNvbWJpbmF0aW9ucy52YWx1ZVBvc2l0aW9uKFxyXG4gICAgICAgICAgZ2V0Q29tYm8oY3VyU3RhdGUsIGN1clN0YXRlW2ldW2pdLCBpLCBqLCAxLCAwKSxcclxuICAgICAgICAgIGdldENvbWJvKGN1clN0YXRlLCBjdXJTdGF0ZVtpXVtqXSwgaSwgaiwgMCwgMSksXHJcbiAgICAgICAgICBnZXRDb21ibyhjdXJTdGF0ZSwgY3VyU3RhdGVbaV1bal0sIGksIGosIDEsIDEpLFxyXG4gICAgICAgICAgZ2V0Q29tYm8oY3VyU3RhdGUsIGN1clN0YXRlW2ldW2pdLCBpLCBqLCAxLCAtMSlcclxuICAgICAgICApO1xyXG4gICAgICAgIGlmIChwbGF5ZXJWYWwgPT09IGNvbWJpbmF0aW9ucy53aW5WYWx1ZSkge1xyXG4gICAgICAgICAgd2luID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICB2YXIgbWluaU1heCA9IGZ1bmN0aW9uIG1pbmltYXgobm9kZSwgZGVwdGgsIHBsYXllciwgcGFyZW50KSB7XHJcbiAgICBpZiAoZGVwdGggPT0gMCkgcmV0dXJuIGhldXJpc3RpYyhub2RlLCBwYXJlbnQpO1xyXG4gICAgdmFyIGFscGhhID0gTnVtYmVyLk1JTl9WQUxVRTtcclxuICAgIHZhciBjaGlsZHMgPSBnZXRDaGlsZHMobm9kZSwgcGxheWVyKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGFscGhhID0gTWF0aC5tYXgoYWxwaGEsIC1taW5pbWF4KGNoaWxkc1tpXSwgZGVwdGggLSAxLCAtcGxheWVyLCBub2RlKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWxwaGE7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGlzQWxsU2F0aXNmeSA9IGZ1bmN0aW9uIChjYW5kaWRhdGVzLCBwb2ludFgsIHBvaW50WSkge1xyXG4gICAgdmFyIGNvdW50ZXIgPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYW5kaWRhdGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChwb2ludFggIT0gY2FuZGlkYXRlc1tpXVswXSB8fCBwb2ludFkgIT0gY2FuZGlkYXRlc1tpXVsxXSkgY291bnRlcisrO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvdW50ZXIgPT0gY2FuZGlkYXRlcy5sZW5ndGg7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGdldENoaWxkcyA9IGZ1bmN0aW9uKHBhcmVudCwgcGxheWVyKSB7XHJcbiAgICB2YXIgY2hpbGRyZW4gPSBbXTtcclxuICAgIHZhciBjYW5kaWRhdGVzID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNlbGxzQ291bnQ7IGkrKykge1xyXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNlbGxzQ291bnQ7IGorKykge1xyXG4gICAgICAgIGlmIChwYXJlbnRbaV1bal0gIT0gMCkge1xyXG4gICAgICAgICAgZm9yICh2YXIgayA9IGkgLSByaW5nOyBrIDw9IGkgKyByaW5nOyBrKyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgbCA9IGogLSByaW5nOyBsIDw9IGogKyByaW5nOyBsKyspIHtcclxuICAgICAgICAgICAgICBpZiAoayA+PSAwICYmIGwgPj0gMCAmJiBrIDwgY2VsbHNDb3VudCAmJiBsIDwgY2VsbHNDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudFtrXVtsXSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgIHZhciBjdXJQb2ludCA9IFtrLCBsXTtcclxuICAgICAgICAgICAgICAgICAgdmFyIGZsYWcgPSBpc0FsbFNhdGlzZnkoY2FuZGlkYXRlcywgY3VyUG9pbnRbMF0sIGN1clBvaW50WzFdKTtcclxuICAgICAgICAgICAgICAgICAgaWYgKGZsYWcpIGNhbmRpZGF0ZXMucHVzaChjdXJQb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBmID0gMDsgZiA8IGNhbmRpZGF0ZXMubGVuZ3RoOyBmKyspIHtcclxuICAgICAgdmFyIHRtcCA9IEFycmF5Lm1hdHJpeChjZWxsc0NvdW50LCBjZWxsc0NvdW50LCAwKTtcclxuICAgICAgZm9yICh2YXIgbSA9IDA7IG0gPCBjZWxsc0NvdW50OyBtKyspIHtcclxuICAgICAgICBmb3IgKHZhciBuID0gMDsgbiA8IGNlbGxzQ291bnQ7IG4rKykge1xyXG4gICAgICAgICAgdG1wW21dW25dID0gcGFyZW50W21dW25dO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0bXBbY2FuZGlkYXRlc1tmXVswXV1bY2FuZGlkYXRlc1tmXVsxXV0gPSAtcGxheWVyO1xyXG4gICAgICBjaGlsZHJlbi5wdXNoKHRtcCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hpbGRyZW47XHJcbiAgfTtcclxuXHJcbiAgdmFyIGdldENvbWJvID0gZnVuY3Rpb24obm9kZSwgY3VyUGxheWVyLCBpLCBqLCBkeCwgZHkpIHtcclxuICAgIHZhciBjb21ibyA9IFtjdXJQbGF5ZXJdO1xyXG4gICAgZm9yICh2YXIgbSA9IDE7IG0gPCBnYW1lU2l6ZTsgbSsrKSB7XHJcbiAgICAgIHZhciBuZXh0WDEgPSBpIC0gZHggKiBtO1xyXG4gICAgICB2YXIgbmV4dFkxID0gaiAtIGR5ICogbTtcclxuICAgICAgaWYgKG5leHRYMSA+PSBjZWxsc0NvdW50IHx8IG5leHRZMSA+PSBjZWxsc0NvdW50IHx8IG5leHRYMSA8IDAgfHwgbmV4dFkxIDwgMCkgYnJlYWs7XHJcbiAgICAgIHZhciBuZXh0MSA9IG5vZGVbbmV4dFgxXVtuZXh0WTFdO1xyXG4gICAgICBpZiAobm9kZVtuZXh0WDFdW25leHRZMV0gPT0gLWN1clBsYXllcikge1xyXG4gICAgICAgIGNvbWJvLnVuc2hpZnQobmV4dDEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbWJvLnVuc2hpZnQobmV4dDEpO1xyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgayA9IDE7IGsgPCBnYW1lU2l6ZTsgaysrKSB7XHJcbiAgICAgIHZhciBuZXh0WCA9IGkgKyBkeCAqIGs7XHJcbiAgICAgIHZhciBuZXh0WSA9IGogKyBkeSAqIGs7XHJcbiAgICAgIGlmIChuZXh0WCA+PSBjZWxsc0NvdW50IHx8IG5leHRZID49IGNlbGxzQ291bnQgfHwgbmV4dFggPCAwIHx8IG5leHRZIDwgMCkgYnJlYWs7XHJcbiAgICAgIHZhciBuZXh0ID0gbm9kZVtuZXh0WF1bbmV4dFldO1xyXG4gICAgICBpZiAobmV4dCA9PSAtY3VyUGxheWVyKSB7XHJcbiAgICAgICAgY29tYm8ucHVzaChuZXh0KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjb21iby5wdXNoKG5leHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNvbWJvO1xyXG4gIH07XHJcblxyXG4gIHZhciBoZXVyaXN0aWMgPSBmdW5jdGlvbihuZXdOb2RlLCBvbGROb2RlKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNlbGxzQ291bnQ7IGkrKykge1xyXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNlbGxzQ291bnQ7IGorKykge1xyXG4gICAgICAgIGlmIChuZXdOb2RlW2ldW2pdICE9IG9sZE5vZGVbaV1bal0pIHtcclxuICAgICAgICAgIHZhciBjdXJDZWxsID0gbmV3Tm9kZVtpXVtqXTtcclxuICAgICAgICAgIHZhciBwbGF5ZXJWYWwgPSBjb21iaW5hdGlvbnMudmFsdWVQb3NpdGlvbihcclxuICAgICAgICAgICAgZ2V0Q29tYm8obmV3Tm9kZSwgY3VyQ2VsbCwgaSwgaiwgMSwgMCksXHJcbiAgICAgICAgICAgIGdldENvbWJvKG5ld05vZGUsIGN1ckNlbGwsIGksIGosIDAsIDEpLFxyXG4gICAgICAgICAgICBnZXRDb21ibyhuZXdOb2RlLCBjdXJDZWxsLCBpLCBqLCAxLCAxKSxcclxuICAgICAgICAgICAgZ2V0Q29tYm8obmV3Tm9kZSwgY3VyQ2VsbCwgaSwgaiwgMSwgLTEpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgbmV3Tm9kZVtpXVtqXSA9IC1jdXJDZWxsO1xyXG4gICAgICAgICAgdmFyIG9wcG9zaXRlVmFsID0gY29tYmluYXRpb25zLnZhbHVlUG9zaXRpb24oXHJcbiAgICAgICAgICAgIGdldENvbWJvKG5ld05vZGUsIC1jdXJDZWxsLCBpLCBqLCAxLCAwKSxcclxuICAgICAgICAgICAgZ2V0Q29tYm8obmV3Tm9kZSwgLWN1ckNlbGwsIGksIGosIDAsIDEpLFxyXG4gICAgICAgICAgICBnZXRDb21ibyhuZXdOb2RlLCAtY3VyQ2VsbCwgaSwgaiwgMSwgMSksXHJcbiAgICAgICAgICAgIGdldENvbWJvKG5ld05vZGUsIC1jdXJDZWxsLCBpLCBqLCAxLCAtMSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBuZXdOb2RlW2ldW2pdID0gLWN1ckNlbGw7XHJcbiAgICAgICAgICByZXR1cm4gMiAqIHBsYXllclZhbCArIG9wcG9zaXRlVmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbiAgfTtcclxuXHJcbiAgdmFyIGdldExvZ2ljID0ge307XHJcbiAgZ2V0TG9naWMud2luU3RhdGUgPSBcIlwiO1xyXG4gIGdldExvZ2ljLm1ha2VBbnN3ZXIgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICBjdXJTdGF0ZVt4XVt5XSA9IG1heFBsYXllcjtcclxuICAgIGNoZWNrV2luKCk7XHJcbiAgICBpZiAod2luKXtcclxuICAgICAgdGhhdC53aW5TdGF0ZSA9IFwieW91IHdpblwiO1xyXG4gICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIHZhciBhbnN3ID0gWy0xLCAtMV07XHJcbiAgICB2YXIgYyA9IGdldENoaWxkcyhjdXJTdGF0ZSwgbWF4UGxheWVyKTtcclxuICAgIHZhciBtYXhDaGlsZCA9IC0xO1xyXG4gICAgdmFyIG1heFZhbHVlID0gTnVtYmVyLk1JTl9WQUxVRTtcclxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgYy5sZW5ndGg7IGsrKykge1xyXG4gICAgICB2YXIgY3VyVmFsdWUgPSBtaW5pTWF4KGNba10sIDAsIC1tYXhQbGF5ZXIsIGN1clN0YXRlKTtcclxuICAgICAgaWYgKGNvbXBsZXhpdHkgPiAxKSB7XHJcbiAgICAgICAgLy92YXIgY3VyVmFsdWUyID0gbWluaU1heChjW2tdLCBjb21wbGV4aXR5IC0gMSwgLW1heFBsYXllciwgY3VyU3RhdGUpO1xyXG4gICAgICAgIC8vdXNlIGl0IGZvciBtb3JlIGNvbXBsZXggZ2FtZSFcclxuICAgICAgfVxyXG4gICAgICBpZiAobWF4VmFsdWUgPCBjdXJWYWx1ZSkge1xyXG4gICAgICAgIG1heFZhbHVlID0gY3VyVmFsdWU7XHJcbiAgICAgICAgbWF4Q2hpbGQgPSBrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNlbGxzQ291bnQ7IGkrKykge1xyXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNlbGxzQ291bnQ7IGorKykge1xyXG4gICAgICAgIGlmIChjW21heENoaWxkXVtpXVtqXSAhPSBjdXJTdGF0ZVtpXVtqXSkge1xyXG4gICAgICAgICAgYW5zd1swXSA9IGk7XHJcbiAgICAgICAgICBhbnN3WzFdID0gajtcclxuICAgICAgICAgIGN1clN0YXRlW2Fuc3dbMF1dW2Fuc3dbMV1dID0gLW1heFBsYXllcjtcclxuICAgICAgICAgIGNoZWNrV2luKCk7XHJcbiAgICAgICAgICBpZiAod2luKXtcclxuICAgICAgICAgICAgdGhhdC53aW5TdGF0ZSA9IFwieW91IGxvc3RcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBhbnN3O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFuc3c7XHJcbiAgfTtcclxuICByZXR1cm4gZ2V0TG9naWM7XHJcbn07IiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICB2YXIgaW5pdExvZ2ljID0gcmVxdWlyZSgnLi9nb21va3UvbG9naWMnKTtcclxuICB2YXIgbG9naWMgPSBpbml0TG9naWMoKTtcclxuXHJcbiAgJChcIiM3LTdcIikuYWRkQ2xhc3MoXCJib2FyZENlbGxDcm9zc1wiKTtcclxuICB2YXIgY3VyclZhbHVlID0gLTE7IC8vIHBsYXllciAtIE8sIGNvbXB1dGVyIC0gWFxyXG4gIHZhciBnYW1lT3ZlciA9IGZhbHNlO1xyXG5cclxuICAkKCdkaXYuYm9hcmRDb2wnKS5tb3VzZWRvd24oaGFuZGxlTW91c2VEb3duKTtcclxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZSl7XHJcbiAgICBpZihnYW1lT3ZlcikgcmV0dXJuIFwiXCI7XHJcbiAgICB2YXIgY2VsbCA9ICQodGhpcyk7XHJcbiAgICBpZiAoY2VsbC5jaGlsZHJlbigpLmhhc0NsYXNzKFwiYm9hcmRDZWxsQ2lyY2xlXCIpKSByZXR1cm4gXCJcIjtcclxuICAgIGlmIChjZWxsLmNoaWxkcmVuKCkuaGFzQ2xhc3MoXCJib2FyZENlbGxDcm9zc1wiKSkgcmV0dXJuIFwiXCI7XHJcbiAgICB2YXIgaW5kZXhlcyA9IChjZWxsLmNoaWxkcmVuKCkuYXR0cignaWQnKSkuc3BsaXQoXCItXCIpO1xyXG4gICAgdmFyIGFuc3dlciA9IGxvZ2ljLm1ha2VBbnN3ZXIoaW5kZXhlc1swXSxpbmRleGVzWzFdKTtcclxuICAgIGlmKGFuc3dlciAhPT0gXCJcIil7XHJcbiAgICAgIHZhciBnZXRlZElkID0gJyMnICthbnN3ZXJbMF0gKyAnLScgKyBhbnN3ZXJbMV07XHJcbiAgICAgICQoZ2V0ZWRJZCkuYWRkQ2xhc3MoZGVzZXJ2ZSgpKTtcclxuICAgIH0gZWxzZSBjdXJyVmFsdWUgKj0gLTE7XHJcbiAgICBjZWxsLmNoaWxkcmVuKCkuYWRkQ2xhc3MoZGVzZXJ2ZSgpKTtcclxuICAgIGZ1bmN0aW9uIGRlc2VydmUoKXtcclxuICAgICAgY3VyclZhbHVlICo9IC0xO1xyXG4gICAgICBpZiAoY3VyclZhbHVlID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiYm9hcmRDZWxsQ3Jvc3NcIjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gXCJib2FyZENlbGxDaXJjbGVcIjtcclxuICAgIH1cclxuICAgIGlmIChsb2dpYy53aW5TdGF0ZSAhPT0gXCJcIil7XHJcbiAgICAgIHZhciBtZXNzYWdlID0gJChcIiNtZXNzYWdlXCIpO1xyXG4gICAgICBtZXNzYWdlLnRleHQobG9naWMud2luU3RhdGUpO1xyXG4gICAgICBnYW1lT3ZlciA9IHRydWU7XHJcbiAgICAgIG1lc3NhZ2UucmVtb3ZlQ2xhc3MoXCJsb29zZVN0YXRlXCIpO1xyXG4gICAgICBpZiAobG9naWMud2luU3RhdGUgPT09IFwieW91IGxvc3RcIil7XHJcbiAgICAgICAgbWVzc2FnZS5hZGRDbGFzcyhcImxvb3NlU3RhdGVcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gICQoXCIjc2NhbGUtVXBcIikuY2xpY2soaGFuZGxlU2NhbGUpO1xyXG4gICQoXCIjc2NhbGUtRG93blwiKS5jbGljayhoYW5kbGVTY2FsZSk7XHJcbiAgZnVuY3Rpb24gaGFuZGxlU2NhbGUoZSl7XHJcbiAgICB2YXIgdmFsdWUgPSAxMDA7XHJcbiAgICB2YXIgbWluVmFsdWUgPSAzMDA7XHJcbiAgICB2YXIgZGVsdGEgPSAgJCh0aGlzKS5hdHRyKCdpZCcpLnNwbGl0KFwiLVwiKVsxXTtcclxuICAgIHZhciBib2FyZCA9ICQoXCIuYm9hcmRcIik7XHJcbiAgICB2YXIgY29udHJvbHMgPSAkKFwiLmNvbnRyb2xzXCIpO1xyXG4gICAgaWYgKGRlbHRhID09PSBcIlVwXCIpe1xyXG4gICAgICBib2FyZC53aWR0aChib2FyZC53aWR0aCgpICsgdmFsdWUpO1xyXG4gICAgICBib2FyZC5oZWlnaHQoYm9hcmQuaGVpZ2h0KCkgKyB2YWx1ZSk7XHJcbiAgICAgIGNvbnRyb2xzLndpZHRoKGNvbnRyb2xzLndpZHRoKCkgKyB2YWx1ZSk7XHJcbiAgICAgIGNvbnRyb2xzLmhlaWdodChjb250cm9scy5oZWlnaHQoKSArIHZhbHVlLzE1KTtcclxuICAgIH1cclxuICAgIGlmIChkZWx0YSA9PT0gXCJEb3duXCIgJiYgYm9hcmQud2lkdGgoKSA+IG1pblZhbHVlKXtcclxuICAgICAgYm9hcmQud2lkdGgoYm9hcmQud2lkdGgoKSAtIHZhbHVlKTtcclxuICAgICAgYm9hcmQuaGVpZ2h0KGJvYXJkLmhlaWdodCgpIC0gdmFsdWUpO1xyXG4gICAgICBjb250cm9scy53aWR0aChjb250cm9scy53aWR0aCgpIC0gdmFsdWUpO1xyXG4gICAgICBjb250cm9scy5oZWlnaHQoY29udHJvbHMuaGVpZ2h0KCkgLSB2YWx1ZS8xNSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAkKFwiI25ldy1PXCIpLnBhcmVudCgpLmNsaWNrKGhhbmRsZU5ld0dhbWUpO1xyXG4gICQoXCIjbmV3LVhcIikucGFyZW50KCkuY2xpY2soaGFuZGxlTmV3R2FtZSk7XHJcbiAgZnVuY3Rpb24gaGFuZGxlTmV3R2FtZShlKXtcclxuICAgIHZhciBpbmRleCA9ICgkKHRoaXMpLmNoaWxkcmVuKCkuYXR0cignaWQnKSkuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgJChcIi5ib2FyZENlbGxcIikucmVtb3ZlQ2xhc3MoXCJib2FyZENlbGxDcm9zcyBib2FyZENlbGxDaXJjbGVcIik7XHJcbiAgICBnYW1lT3ZlciA9IGZhbHNlO1xyXG4gICAgJChcIiNtZXNzYWdlXCIpLnRleHQoXCJcIik7XHJcbiAgICBpZiAoaW5kZXggPT09IFwiT1wiKXtcclxuICAgICAgbG9naWMgPSBpbml0TG9naWMoKTtcclxuICAgICAgJChcIiM3LTdcIikuYWRkQ2xhc3MoXCJib2FyZENlbGxDcm9zc1wiKTtcclxuICAgICAgY3VyclZhbHVlID0gLTE7XHJcbiAgICB9XHJcbiAgICBpZiAoaW5kZXggPT09IFwiWFwiKXtcclxuICAgICAgbG9naWMgPSBpbml0TG9naWMoMSk7XHJcbiAgICAgIGN1cnJWYWx1ZSA9IDE7XHJcbiAgICB9XHJcbiAgICAkKFwiI2NoZWNrXCIpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XHJcbiAgfVxyXG59KTsiXX0=
