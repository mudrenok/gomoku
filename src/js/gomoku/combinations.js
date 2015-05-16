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