/**
 * Created by anton on 5/13/2015.
 */
//logic.curState[7][7] = 1;

var logic = game();
var answer1 = logic.makeAnswer(7,6);
console.log(answer1); // 6 6
var answer2 = logic.makeAnswer(6,7);
console.log(answer2); // 5 5
var answer3 = logic.makeAnswer(8,8);
console.log(answer3); // 5 8


var logic2 = game();
var answer12 = logic2.makeAnswer(7,6);
console.log(answer12); // 6 6
var answer22 = logic2.makeAnswer(6,7);
console.log(answer22); // 5 5
var answer32 = logic2.makeAnswer(8,8);
console.log(answer32); // 5 8
var answer42 = logic2.makeAnswer(9,9);
console.log(answer42); // 5 8