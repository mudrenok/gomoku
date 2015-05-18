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