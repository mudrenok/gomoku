(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by anton on 5/13/2015.
 */

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
    // additional
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

  var findArray = function(first, second){
    var fCount = first.length;
    var sCount = second.length;
    var k;
    for (var i = 0; i <= fCount - sCount; i++)
    {
      k = 0;
      for (var j = 0; j < sCount; j++)
      {
        if (first[i + j] == second[j]) k++;
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
  combinations.valuePosition = function(arr1,  arr2,  arr3,  arr4){
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
/**
 * Created by anton on 5/13/2015.
 */

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

module.exports = function() {

  var gameSize = 5;
  var ring = 1;
  var win = false;
  var cellsCount = 15;
  var curState = Array.matrix(15, 15, 0);
  var complexity = 1;
  var maxPlayer = -1;
  var combinations = initCombinations();
  curState[7][7] = 1;

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
        if (playerVal == 1000000000) win = true;
      }
    }
  };

  var miniMax = function minimax(node, depth, player, parent) {
    if (depth == 0) return heuristic(node, parent);
    var alpha = Number.MIN_VALUE;
    var childs = getChilds(node, player);
    for (var i = 0; i < childs.length; i++) {
      alpha = Math.max(alpha, -minimax(childs[i], depth - 1, -player, node)); // ?? mb need recursive
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
        //console.log(newNode);
        //console.log(oldNode);
        //console.log(i);
        //console.log(j);
        //console.log(oldNode[i][j]);
        //console.log(newNode[i][j]);


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

  getLogic.makeAnswer = function(x,y) {
    curState[x][y] = maxPlayer;
    var answ = [-1, -1];
    var c = getChilds(curState, maxPlayer);
    //console.log('getChilds->',c);
    var maxChild = -1;
    var maxValue = Number.MIN_VALUE;
    for (var k = 0; k < c.length; k++) {
      var curValue = miniMax(c[k], 0, -maxPlayer, curState);
      if (complexity > 1) {
        //var curValue2 = this.miniMax(c[k], this.complexity - 1, -this.maxPlayer, this.curState);
        //use it for more complex game
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
          return answ;
        }
      }
    }
    return answ;
  };

  return getLogic;
};
},{"./combinations":1}],3:[function(require,module,exports){
/**
 * Created by anton on 5/14/2015.
 */



$(document).ready(function(){
  //$('div.boardCol').hover(handleMouseEnter, handleMouseLeave);


  //var sayHello = require('./say-hello');
  //sayHello();
  //sayHello.incudeMe;
  //console.log(includeMe);
  //var initCombinations = require('./gomoku/combinations');
  var initLogic = require('./gomoku/logic');
  var logic = initLogic();
  //var answer1 = logic.makeAnswer(7,6);
  //console.log(answer1); // 6 6
  //var answer2 = logic.makeAnswer(6,7);
  //console.log(answer2); // 5 5
  //var answer3 = logic.makeAnswer(8,8);
  //console.log(answer3); // 5 8
  $("#7-7").addClass("boardCellCross");

  $('div.boardCol').mousedown(handleMouseDown);
  var valueForTest = -1;
  function handleMouseDown(e){
    var cell = $(this);
    var indexes = (cell.children().attr('id')).split("-");


    var answer = logic.makeAnswer(indexes[0],indexes[1]);
    console.log(answer);

    var getedId = '#' +answer[0] + '-' + answer[1];
    console.log(getedId);

    $(getedId).addClass( function(){
      valueForTest *= -1;
      if (valueForTest === 1) {
        return "boardCellCross";
      }
      return "boardCellCircle";
    });

    console.log(indexes);
    cell.children().addClass( function(){
      valueForTest *= -1;
      if (valueForTest === 1) {
        return "boardCellCross";
      }
      return "boardCellCircle";
    });
  }
});
},{"./gomoku/logic":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZ29tb2t1L2NvbWJpbmF0aW9ucy5qcyIsInNyYy9qcy9nb21va3UvbG9naWMuanMiLCJzcmMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGFudG9uIG9uIDUvMTMvMjAxNS5cclxuICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciB3aW4gPSBbWzEsIDEsIDEsIDEsIDFdXTtcclxuICB2YXIgdW5Db3ZlcmVkNCA9IFtbMCwgMSwgMSwgMSwgMSwgMF1dO1xyXG4gIHZhciB1bkNvdmVyZWQzID0gW1xyXG4gICAgWzAsIDEsIDEsIDEsIDAsIDBdLCBbMCwgMCwgMSwgMSwgMSwgMF0sXHJcbiAgICBbMCwgMSwgMCwgMSwgMSwgMF0sIFswLCAxLCAxLCAwLCAxLCAwXVxyXG4gIF07XHJcbiAgdmFyIHVuQ292ZXJlZDIgPSBbXHJcbiAgICBbMCwgMCwgMSwgMSwgMCwgMF0sIFswLCAxLCAwLCAxLCAwLCAwXSxcclxuICAgIFswLCAwLCAxLCAwLCAxLCAwXSwgWzAsIDEsIDEsIDAsIDAsIDBdLFxyXG4gICAgWzAsIDAsIDAsIDEsIDEsIDBdLCBbMCwgMSwgMCwgMCwgMSwgMF1cclxuICBdO1xyXG4gIHZhciBjb3ZlcmVkNCA9IFtcclxuICAgIFstMSwgMSwgMCwgMSwgMSwgMV0sIFstMSwgMSwgMSwgMCwgMSwgMV0sXHJcbiAgICBbLTEsIDEsIDEsIDEsIDAsIDFdLCBbLTEsIDEsIDEsIDEsIDEsIDBdLFxyXG4gICAgWzAsIDEsIDEsIDEsIDEsIC0xXSwgWzEsIDAsIDEsIDEsIDEsIC0xXSxcclxuICAgIFsxLCAxLCAwLCAxLCAxLCAtMV0sIFsxLCAxLCAxLCAwLCAxLCAtMV1cclxuICBdO1xyXG4gIHZhciBjb3ZlcmVkMyA9IFtcclxuICAgIFstMSwgMSwgMSwgMSwgMCwgMF0sIFstMSwgMSwgMSwgMCwgMSwgMF0sXHJcbiAgICBbLTEsIDEsIDAsIDEsIDEsIDBdLCBbMCwgMCwgMSwgMSwgMSwgLTFdLFxyXG4gICAgWzAsIDEsIDAsIDEsIDEsIC0xXSwgWzAsIDEsIDEsIDAsIDEsIC0xXSxcclxuICAgIC8vIGFkZGl0aW9uYWxcclxuICAgIFstMSwgMSwgMCwgMSwgMCwgMSwgLTFdLCBbLTEsIDAsIDEsIDEsIDEsIDAsIC0xXSxcclxuICAgIFstMSwgMSwgMSwgMCwgMCwgMSwgLTFdLCBbLTEsIDEsIDAsIDAsIDEsIDEsIC0xXVxyXG4gIF07XHJcblxyXG4gIChmdW5jdGlvbigpIHsgLy9hZGQgc2FtZSBjb21iaW5hdGlvbnMgZm9yIGFub3RoZXIgcGxheWVyXHJcbiAgICB2YXIgYWxsQ29tYm9zID0gW3dpbiwgdW5Db3ZlcmVkNCwgdW5Db3ZlcmVkMywgdW5Db3ZlcmVkMiwgY292ZXJlZDQsIGNvdmVyZWQzXTtcclxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgYWxsQ29tYm9zLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgIHZhciB0ZW1wID0gW107XHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYWxsQ29tYm9zW2tdLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgdmFyIHRtcCA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsQ29tYm9zW2tdW2pdLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgdG1wW2ldID0gLWFsbENvbWJvc1trXVtqXVtpXTtcclxuICAgICAgICB0ZW1wLnB1c2godG1wKTtcclxuICAgICAgfVxyXG4gICAgICBmb3IgKHZhciBtID0gMDsgbSA8IHRlbXAubGVuZ3RoOyBtKyspIHtcclxuICAgICAgICBhbGxDb21ib3Nba10ucHVzaCh0ZW1wW21dKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0oKSk7XHJcblxyXG4gIHZhciB2YWx1ZUNvbWJvID0gZnVuY3Rpb24odywgdTIsIHUzLCB1NCwgYzMsIGM0KSB7XHJcbiAgICBpZiAodyA+IDApICAgICAgICAgICAgcmV0dXJuIDEwMDAwMDAwMDA7XHJcbiAgICBpZiAodTQgPiAwKSAgICAgICAgICAgcmV0dXJuIDEwMDAwMDAwMDtcclxuICAgIGlmIChjNCA+IDEpICAgICAgICAgICByZXR1cm4gMTAwMDAwMDA7XHJcbiAgICBpZiAodTMgPiAwICYmIGM0ID4gMCkgcmV0dXJuIDEwMDAwMDA7XHJcbiAgICBpZiAodTMgPiAxKSAgICAgICAgICAgcmV0dXJuIDEwMDAwMDtcclxuXHJcbiAgICBpZiAodTMgPT0gMSkge1xyXG4gICAgICBpZiAodTIgPT0gMykgICAgICAgIHJldHVybiA0MDAwMDtcclxuICAgICAgaWYgKHUyID09IDIpICAgICAgICByZXR1cm4gMzgwMDA7XHJcbiAgICAgIGlmICh1MiA9PSAxKSAgICAgICAgcmV0dXJuIDM1MDAwO1xyXG4gICAgICByZXR1cm4gMzQ1MDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYzQgPT0gMSkge1xyXG4gICAgICBpZiAodTIgPT0gMykgICAgICAgIHJldHVybiA0NTAwO1xyXG4gICAgICBpZiAodTIgPT0gMikgICAgICAgIHJldHVybiA0MjAwO1xyXG4gICAgICBpZiAodTIgPT0gMSkgICAgICAgIHJldHVybiA0MTAwO1xyXG4gICAgICByZXR1cm4gNDA1MDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYzMgPT0gMSkge1xyXG4gICAgICBpZiAodTIgPT0gMykgICAgICAgIHJldHVybiAzNDAwO1xyXG4gICAgICBpZiAodTIgPT0gMikgICAgICAgIHJldHVybiAzMzAwO1xyXG4gICAgICBpZiAodTIgPT0gMSkgICAgICAgIHJldHVybiAzMTAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjMyA9PSAyKSB7XHJcbiAgICAgIGlmICh1MiA9PSAyKSAgICAgICAgcmV0dXJuIDMwMDA7XHJcbiAgICAgIGlmICh1MiA9PSAxKSAgICAgICAgcmV0dXJuIDI5MDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGMzID09IDMpIHtcclxuICAgICAgaWYgKHUyID09IDEpICAgICAgICByZXR1cm4gMjgwMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodTIgPT0gNCkgICAgICAgICAgcmV0dXJuIDI3MDA7XHJcbiAgICBpZiAodTIgPT0gMykgICAgICAgICAgcmV0dXJuIDI1MDA7XHJcbiAgICBpZiAodTIgPT0gMikgICAgICAgICAgcmV0dXJuIDIwMDA7XHJcbiAgICBpZiAodTIgPT0gMSkgICAgICAgICAgcmV0dXJuIDEwMDA7XHJcbiAgICByZXR1cm4gMDtcclxuICB9O1xyXG5cclxuICB2YXIgZmluZEFycmF5ID0gZnVuY3Rpb24oZmlyc3QsIHNlY29uZCl7XHJcbiAgICB2YXIgZkNvdW50ID0gZmlyc3QubGVuZ3RoO1xyXG4gICAgdmFyIHNDb3VudCA9IHNlY29uZC5sZW5ndGg7XHJcbiAgICB2YXIgaztcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGZDb3VudCAtIHNDb3VudDsgaSsrKVxyXG4gICAge1xyXG4gICAgICBrID0gMDtcclxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzQ291bnQ7IGorKylcclxuICAgICAge1xyXG4gICAgICAgIGlmIChmaXJzdFtpICsgal0gPT0gc2Vjb25kW2pdKSBrKys7XHJcbiAgICAgICAgZWxzZSBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBpZiAoayA9PSBzQ291bnQpIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIHZhciBpc0FueUluQXJyYXlzID0gZnVuY3Rpb24oY29tYm9zLCBhcnIpe1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21ib3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGZpbmRBcnJheShhcnIsIGNvbWJvc1tpXSkpIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIHZhciBjb21iaW5hdGlvbnMgPSB7fTtcclxuICBjb21iaW5hdGlvbnMudmFsdWVQb3NpdGlvbiA9IGZ1bmN0aW9uKGFycjEsICBhcnIyLCAgYXJyMywgIGFycjQpe1xyXG4gICAgdmFyIHcgPSAwLCB1MiA9IDAsIHUzID0gMCwgdTQgPSAwLCBjMyA9IDAsIGM0ID0gMDtcclxuICAgIHZhciBhbGxBcnIgPSBbYXJyMSwgIGFycjIsICBhcnIzLCAgYXJyNF07XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbEFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoaXNBbnlJbkFycmF5cyh3aW4sIGFsbEFycltpXSkpIHtcclxuICAgICAgICB3Kys7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGlzQW55SW5BcnJheXMoY292ZXJlZDQsIGFsbEFycltpXSkpIHtcclxuICAgICAgICBjNCsrO1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc0FueUluQXJyYXlzKGNvdmVyZWQzLCBhbGxBcnJbaV0pKSB7XHJcbiAgICAgICAgYzMrKztcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNBbnlJbkFycmF5cyh1bkNvdmVyZWQ0LCBhbGxBcnJbaV0pKSB7XHJcbiAgICAgICAgdTQrKztcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNBbnlJbkFycmF5cyh1bkNvdmVyZWQzLCBhbGxBcnJbaV0pKSB7XHJcbiAgICAgICAgdTMrKztcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXNBbnlJbkFycmF5cyh1bkNvdmVyZWQyLCBhbGxBcnJbaV0pKSB7XHJcbiAgICAgICAgdTIrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHZhbHVlQ29tYm8odywgdTIsIHUzLCB1NCwgYzMsIGM0KTtcclxuICB9O1xyXG4gIHJldHVybiBjb21iaW5hdGlvbnM7XHJcbn07IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgYW50b24gb24gNS8xMy8yMDE1LlxyXG4gKi9cclxuXHJcbkFycmF5Lm1hdHJpeCA9IGZ1bmN0aW9uKG0sbixpbml0aWFsKSB7XHJcbiAgdmFyIGEsIGksIGosIG1hdCA9IFtdO1xyXG4gIGZvciAoaSA9IDA7IGkgPCBtOyBpKyspIHtcclxuICAgIGEgPSBbXTtcclxuICAgIGZvciAoaiA9IDA7IGogPCBuOyBqKyspIHtcclxuICAgICAgYVtqXSA9IGluaXRpYWw7XHJcbiAgICB9XHJcbiAgICBtYXRbaV0gPSBhO1xyXG4gIH1cclxuICByZXR1cm4gbWF0O1xyXG59O1xyXG5cclxudmFyIGluaXRDb21iaW5hdGlvbnMgPSByZXF1aXJlKCcuL2NvbWJpbmF0aW9ucycpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgdmFyIGdhbWVTaXplID0gNTtcclxuICB2YXIgcmluZyA9IDE7XHJcbiAgdmFyIHdpbiA9IGZhbHNlO1xyXG4gIHZhciBjZWxsc0NvdW50ID0gMTU7XHJcbiAgdmFyIGN1clN0YXRlID0gQXJyYXkubWF0cml4KDE1LCAxNSwgMCk7XHJcbiAgdmFyIGNvbXBsZXhpdHkgPSAxO1xyXG4gIHZhciBtYXhQbGF5ZXIgPSAtMTtcclxuICB2YXIgY29tYmluYXRpb25zID0gaW5pdENvbWJpbmF0aW9ucygpO1xyXG4gIGN1clN0YXRlWzddWzddID0gMTtcclxuXHJcbiAgdmFyIGNoZWNrV2luID0gZnVuY3Rpb24oKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNlbGxzQ291bnQ7IGkrKykge1xyXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNlbGxzQ291bnQ7IGorKykge1xyXG4gICAgICAgIGlmIChjdXJTdGF0ZVtpXVtqXSA9PSAwKSBjb250aW51ZTtcclxuICAgICAgICB2YXIgcGxheWVyVmFsID0gY29tYmluYXRpb25zLnZhbHVlUG9zaXRpb24oXHJcbiAgICAgICAgICBnZXRDb21ibyhjdXJTdGF0ZSwgY3VyU3RhdGVbaV1bal0sIGksIGosIDEsIDApLFxyXG4gICAgICAgICAgZ2V0Q29tYm8oY3VyU3RhdGUsIGN1clN0YXRlW2ldW2pdLCBpLCBqLCAwLCAxKSxcclxuICAgICAgICAgIGdldENvbWJvKGN1clN0YXRlLCBjdXJTdGF0ZVtpXVtqXSwgaSwgaiwgMSwgMSksXHJcbiAgICAgICAgICBnZXRDb21ibyhjdXJTdGF0ZSwgY3VyU3RhdGVbaV1bal0sIGksIGosIDEsIC0xKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHBsYXllclZhbCA9PSAxMDAwMDAwMDAwKSB3aW4gPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdmFyIG1pbmlNYXggPSBmdW5jdGlvbiBtaW5pbWF4KG5vZGUsIGRlcHRoLCBwbGF5ZXIsIHBhcmVudCkge1xyXG4gICAgaWYgKGRlcHRoID09IDApIHJldHVybiBoZXVyaXN0aWMobm9kZSwgcGFyZW50KTtcclxuICAgIHZhciBhbHBoYSA9IE51bWJlci5NSU5fVkFMVUU7XHJcbiAgICB2YXIgY2hpbGRzID0gZ2V0Q2hpbGRzKG5vZGUsIHBsYXllcik7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBhbHBoYSA9IE1hdGgubWF4KGFscGhhLCAtbWluaW1heChjaGlsZHNbaV0sIGRlcHRoIC0gMSwgLXBsYXllciwgbm9kZSkpOyAvLyA/PyBtYiBuZWVkIHJlY3Vyc2l2ZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFscGhhO1xyXG4gIH07XHJcblxyXG4gIHZhciBpc0FsbFNhdGlzZnkgPSBmdW5jdGlvbiAoY2FuZGlkYXRlcywgcG9pbnRYLCBwb2ludFkpIHtcclxuICAgIHZhciBjb3VudGVyID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FuZGlkYXRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAocG9pbnRYICE9IGNhbmRpZGF0ZXNbaV1bMF0gfHwgcG9pbnRZICE9IGNhbmRpZGF0ZXNbaV1bMV0pIGNvdW50ZXIrKztcclxuICAgIH1cclxuICAgIHJldHVybiBjb3VudGVyID09IGNhbmRpZGF0ZXMubGVuZ3RoO1xyXG4gIH07XHJcblxyXG4gIHZhciBnZXRDaGlsZHMgPSBmdW5jdGlvbihwYXJlbnQsIHBsYXllcikge1xyXG4gICAgdmFyIGNoaWxkcmVuID0gW107XHJcbiAgICB2YXIgY2FuZGlkYXRlcyA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjZWxsc0NvdW50OyBpKyspIHtcclxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjZWxsc0NvdW50OyBqKyspIHtcclxuICAgICAgICBpZiAocGFyZW50W2ldW2pdICE9IDApIHtcclxuICAgICAgICAgIGZvciAodmFyIGsgPSBpIC0gcmluZzsgayA8PSBpICsgcmluZzsgaysrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGwgPSBqIC0gcmluZzsgbCA8PSBqICsgcmluZzsgbCsrKSB7XHJcbiAgICAgICAgICAgICAgaWYgKGsgPj0gMCAmJiBsID49IDAgJiYgayA8IGNlbGxzQ291bnQgJiYgbCA8IGNlbGxzQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJlbnRba11bbF0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICB2YXIgY3VyUG9pbnQgPSBbaywgbF07XHJcbiAgICAgICAgICAgICAgICAgIHZhciBmbGFnID0gaXNBbGxTYXRpc2Z5KGNhbmRpZGF0ZXMsIGN1clBvaW50WzBdLCBjdXJQb2ludFsxXSk7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChmbGFnKSBjYW5kaWRhdGVzLnB1c2goY3VyUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZm9yICh2YXIgZiA9IDA7IGYgPCBjYW5kaWRhdGVzLmxlbmd0aDsgZisrKSB7XHJcbiAgICAgIHZhciB0bXAgPSBBcnJheS5tYXRyaXgoY2VsbHNDb3VudCwgY2VsbHNDb3VudCwgMCk7XHJcbiAgICAgIGZvciAodmFyIG0gPSAwOyBtIDwgY2VsbHNDb3VudDsgbSsrKSB7XHJcbiAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBjZWxsc0NvdW50OyBuKyspIHtcclxuICAgICAgICAgIHRtcFttXVtuXSA9IHBhcmVudFttXVtuXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdG1wW2NhbmRpZGF0ZXNbZl1bMF1dW2NhbmRpZGF0ZXNbZl1bMV1dID0gLXBsYXllcjtcclxuICAgICAgY2hpbGRyZW4ucHVzaCh0bXApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNoaWxkcmVuO1xyXG4gIH07XHJcblxyXG4gIHZhciBnZXRDb21ibyA9IGZ1bmN0aW9uKG5vZGUsIGN1clBsYXllciwgaSwgaiwgZHgsIGR5KSB7XHJcbiAgICB2YXIgY29tYm8gPSBbY3VyUGxheWVyXTtcclxuICAgIGZvciAodmFyIG0gPSAxOyBtIDwgZ2FtZVNpemU7IG0rKykge1xyXG4gICAgICB2YXIgbmV4dFgxID0gaSAtIGR4ICogbTtcclxuICAgICAgdmFyIG5leHRZMSA9IGogLSBkeSAqIG07XHJcbiAgICAgIGlmIChuZXh0WDEgPj0gY2VsbHNDb3VudCB8fCBuZXh0WTEgPj0gY2VsbHNDb3VudCB8fCBuZXh0WDEgPCAwIHx8IG5leHRZMSA8IDApIGJyZWFrO1xyXG4gICAgICB2YXIgbmV4dDEgPSBub2RlW25leHRYMV1bbmV4dFkxXTtcclxuICAgICAgaWYgKG5vZGVbbmV4dFgxXVtuZXh0WTFdID09IC1jdXJQbGF5ZXIpIHtcclxuICAgICAgICBjb21iby51bnNoaWZ0KG5leHQxKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjb21iby51bnNoaWZ0KG5leHQxKTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKHZhciBrID0gMTsgayA8IGdhbWVTaXplOyBrKyspIHtcclxuICAgICAgdmFyIG5leHRYID0gaSArIGR4ICogaztcclxuICAgICAgdmFyIG5leHRZID0gaiArIGR5ICogaztcclxuICAgICAgaWYgKG5leHRYID49IGNlbGxzQ291bnQgfHwgbmV4dFkgPj0gY2VsbHNDb3VudCB8fCBuZXh0WCA8IDAgfHwgbmV4dFkgPCAwKSBicmVhaztcclxuICAgICAgdmFyIG5leHQgPSBub2RlW25leHRYXVtuZXh0WV07XHJcbiAgICAgIGlmIChuZXh0ID09IC1jdXJQbGF5ZXIpIHtcclxuICAgICAgICBjb21iby5wdXNoKG5leHQpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbWJvLnB1c2gobmV4dCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29tYm87XHJcbiAgfTtcclxuXHJcbiAgdmFyIGhldXJpc3RpYyA9IGZ1bmN0aW9uKG5ld05vZGUsIG9sZE5vZGUpIHtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2VsbHNDb3VudDsgaSsrKSB7XHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2VsbHNDb3VudDsgaisrKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhuZXdOb2RlKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKG9sZE5vZGUpO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coaSk7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhqKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKG9sZE5vZGVbaV1bal0pO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2cobmV3Tm9kZVtpXVtqXSk7XHJcblxyXG5cclxuICAgICAgICBpZiAobmV3Tm9kZVtpXVtqXSAhPSBvbGROb2RlW2ldW2pdKSB7XHJcbiAgICAgICAgICB2YXIgY3VyQ2VsbCA9IG5ld05vZGVbaV1bal07XHJcbiAgICAgICAgICB2YXIgcGxheWVyVmFsID0gY29tYmluYXRpb25zLnZhbHVlUG9zaXRpb24oXHJcbiAgICAgICAgICAgIGdldENvbWJvKG5ld05vZGUsIGN1ckNlbGwsIGksIGosIDEsIDApLFxyXG4gICAgICAgICAgICBnZXRDb21ibyhuZXdOb2RlLCBjdXJDZWxsLCBpLCBqLCAwLCAxKSxcclxuICAgICAgICAgICAgZ2V0Q29tYm8obmV3Tm9kZSwgY3VyQ2VsbCwgaSwgaiwgMSwgMSksXHJcbiAgICAgICAgICAgIGdldENvbWJvKG5ld05vZGUsIGN1ckNlbGwsIGksIGosIDEsIC0xKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIG5ld05vZGVbaV1bal0gPSAtY3VyQ2VsbDtcclxuICAgICAgICAgIHZhciBvcHBvc2l0ZVZhbCA9IGNvbWJpbmF0aW9ucy52YWx1ZVBvc2l0aW9uKFxyXG4gICAgICAgICAgICBnZXRDb21ibyhuZXdOb2RlLCAtY3VyQ2VsbCwgaSwgaiwgMSwgMCksXHJcbiAgICAgICAgICAgIGdldENvbWJvKG5ld05vZGUsIC1jdXJDZWxsLCBpLCBqLCAwLCAxKSxcclxuICAgICAgICAgICAgZ2V0Q29tYm8obmV3Tm9kZSwgLWN1ckNlbGwsIGksIGosIDEsIDEpLFxyXG4gICAgICAgICAgICBnZXRDb21ibyhuZXdOb2RlLCAtY3VyQ2VsbCwgaSwgaiwgMSwgLTEpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgbmV3Tm9kZVtpXVtqXSA9IC1jdXJDZWxsO1xyXG4gICAgICAgICAgcmV0dXJuIDIgKiBwbGF5ZXJWYWwgKyBvcHBvc2l0ZVZhbDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG4gIH07XHJcblxyXG5cclxuICB2YXIgZ2V0TG9naWMgPSB7fTtcclxuXHJcbiAgZ2V0TG9naWMubWFrZUFuc3dlciA9IGZ1bmN0aW9uKHgseSkge1xyXG4gICAgY3VyU3RhdGVbeF1beV0gPSBtYXhQbGF5ZXI7XHJcbiAgICB2YXIgYW5zdyA9IFstMSwgLTFdO1xyXG4gICAgdmFyIGMgPSBnZXRDaGlsZHMoY3VyU3RhdGUsIG1heFBsYXllcik7XHJcbiAgICAvL2NvbnNvbGUubG9nKCdnZXRDaGlsZHMtPicsYyk7XHJcbiAgICB2YXIgbWF4Q2hpbGQgPSAtMTtcclxuICAgIHZhciBtYXhWYWx1ZSA9IE51bWJlci5NSU5fVkFMVUU7XHJcbiAgICBmb3IgKHZhciBrID0gMDsgayA8IGMubGVuZ3RoOyBrKyspIHtcclxuICAgICAgdmFyIGN1clZhbHVlID0gbWluaU1heChjW2tdLCAwLCAtbWF4UGxheWVyLCBjdXJTdGF0ZSk7XHJcbiAgICAgIGlmIChjb21wbGV4aXR5ID4gMSkge1xyXG4gICAgICAgIC8vdmFyIGN1clZhbHVlMiA9IHRoaXMubWluaU1heChjW2tdLCB0aGlzLmNvbXBsZXhpdHkgLSAxLCAtdGhpcy5tYXhQbGF5ZXIsIHRoaXMuY3VyU3RhdGUpO1xyXG4gICAgICAgIC8vdXNlIGl0IGZvciBtb3JlIGNvbXBsZXggZ2FtZVxyXG4gICAgICB9XHJcbiAgICAgIGlmIChtYXhWYWx1ZSA8IGN1clZhbHVlKSB7XHJcbiAgICAgICAgbWF4VmFsdWUgPSBjdXJWYWx1ZTtcclxuICAgICAgICBtYXhDaGlsZCA9IGs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2VsbHNDb3VudDsgaSsrKSB7XHJcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2VsbHNDb3VudDsgaisrKSB7XHJcbiAgICAgICAgaWYgKGNbbWF4Q2hpbGRdW2ldW2pdICE9IGN1clN0YXRlW2ldW2pdKSB7XHJcbiAgICAgICAgICBhbnN3WzBdID0gaTtcclxuICAgICAgICAgIGFuc3dbMV0gPSBqO1xyXG4gICAgICAgICAgY3VyU3RhdGVbYW5zd1swXV1bYW5zd1sxXV0gPSAtbWF4UGxheWVyO1xyXG4gICAgICAgICAgY2hlY2tXaW4oKTtcclxuICAgICAgICAgIHJldHVybiBhbnN3O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFuc3c7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIGdldExvZ2ljO1xyXG59OyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGFudG9uIG9uIDUvMTQvMjAxNS5cclxuICovXHJcblxyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgLy8kKCdkaXYuYm9hcmRDb2wnKS5ob3ZlcihoYW5kbGVNb3VzZUVudGVyLCBoYW5kbGVNb3VzZUxlYXZlKTtcclxuXHJcblxyXG4gIC8vdmFyIHNheUhlbGxvID0gcmVxdWlyZSgnLi9zYXktaGVsbG8nKTtcclxuICAvL3NheUhlbGxvKCk7XHJcbiAgLy9zYXlIZWxsby5pbmN1ZGVNZTtcclxuICAvL2NvbnNvbGUubG9nKGluY2x1ZGVNZSk7XHJcbiAgLy92YXIgaW5pdENvbWJpbmF0aW9ucyA9IHJlcXVpcmUoJy4vZ29tb2t1L2NvbWJpbmF0aW9ucycpO1xyXG4gIHZhciBpbml0TG9naWMgPSByZXF1aXJlKCcuL2dvbW9rdS9sb2dpYycpO1xyXG4gIHZhciBsb2dpYyA9IGluaXRMb2dpYygpO1xyXG4gIC8vdmFyIGFuc3dlcjEgPSBsb2dpYy5tYWtlQW5zd2VyKDcsNik7XHJcbiAgLy9jb25zb2xlLmxvZyhhbnN3ZXIxKTsgLy8gNiA2XHJcbiAgLy92YXIgYW5zd2VyMiA9IGxvZ2ljLm1ha2VBbnN3ZXIoNiw3KTtcclxuICAvL2NvbnNvbGUubG9nKGFuc3dlcjIpOyAvLyA1IDVcclxuICAvL3ZhciBhbnN3ZXIzID0gbG9naWMubWFrZUFuc3dlcig4LDgpO1xyXG4gIC8vY29uc29sZS5sb2coYW5zd2VyMyk7IC8vIDUgOFxyXG4gICQoXCIjNy03XCIpLmFkZENsYXNzKFwiYm9hcmRDZWxsQ3Jvc3NcIik7XHJcblxyXG4gICQoJ2Rpdi5ib2FyZENvbCcpLm1vdXNlZG93bihoYW5kbGVNb3VzZURvd24pO1xyXG4gIHZhciB2YWx1ZUZvclRlc3QgPSAtMTtcclxuICBmdW5jdGlvbiBoYW5kbGVNb3VzZURvd24oZSl7XHJcbiAgICB2YXIgY2VsbCA9ICQodGhpcyk7XHJcbiAgICB2YXIgaW5kZXhlcyA9IChjZWxsLmNoaWxkcmVuKCkuYXR0cignaWQnKSkuc3BsaXQoXCItXCIpO1xyXG5cclxuXHJcbiAgICB2YXIgYW5zd2VyID0gbG9naWMubWFrZUFuc3dlcihpbmRleGVzWzBdLGluZGV4ZXNbMV0pO1xyXG4gICAgY29uc29sZS5sb2coYW5zd2VyKTtcclxuXHJcbiAgICB2YXIgZ2V0ZWRJZCA9ICcjJyArYW5zd2VyWzBdICsgJy0nICsgYW5zd2VyWzFdO1xyXG4gICAgY29uc29sZS5sb2coZ2V0ZWRJZCk7XHJcblxyXG4gICAgJChnZXRlZElkKS5hZGRDbGFzcyggZnVuY3Rpb24oKXtcclxuICAgICAgdmFsdWVGb3JUZXN0ICo9IC0xO1xyXG4gICAgICBpZiAodmFsdWVGb3JUZXN0ID09PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiYm9hcmRDZWxsQ3Jvc3NcIjtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gXCJib2FyZENlbGxDaXJjbGVcIjtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGluZGV4ZXMpO1xyXG4gICAgY2VsbC5jaGlsZHJlbigpLmFkZENsYXNzKCBmdW5jdGlvbigpe1xyXG4gICAgICB2YWx1ZUZvclRlc3QgKj0gLTE7XHJcbiAgICAgIGlmICh2YWx1ZUZvclRlc3QgPT09IDEpIHtcclxuICAgICAgICByZXR1cm4gXCJib2FyZENlbGxDcm9zc1wiO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBcImJvYXJkQ2VsbENpcmNsZVwiO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KTsiXX0=
