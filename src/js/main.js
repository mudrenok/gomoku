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