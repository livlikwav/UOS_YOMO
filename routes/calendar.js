var express = require('express');
var router = express.Router();
var listRouter = require('./list');
var eventRouter = require('./Event');
var database=require('../model/database');
var util=require('util');
/////////////////
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
/////////////jquery 연동////////////////

var moment = require('moment');

router.use('/list', listRouter);
/* GET home page. */
router.get('/', function(req, res, next) {
  ///////현재 달력 출력//////////////
  var shift=req.param('shift');
  if(shift==undefined)
    shift=0;
  shift*=1;
  var today = new Date();
  // 몇달 옮겼는지
  today= new Date(today.getFullYear(),today.getMonth()+shift,1);
  var first = new Date(today.getFullYear(),today.getMonth(),1);
  var end = new Date(today.getFullYear(),today.getMonth()+1,0);

  //전달 날짜
  var lastday= new Date(today.getFullYear(),today.getMonth(),0);
  lastdate= lastday.getDate();
  var days=new Array();
  var lines=0;
  // 이전 달의 날짜들
  if(first.getDay()!=1){
    for(i=0;i<=lastday.getDay()-1;i++){
      days.push(lastdate-lastday.getDay()+i);
    }
  }
  // 현재 달의 날짜들
  for(var j=1;j<=end.getDate();j++){
    days.push(j);
  }
  // 다음 달의 날짜들
  if(end.getDay()!=0){
    for(var j=1;j<=8-(end.getDay()+1);j++){
      days.push(j);
    }
  }
  lines=days.length/7;
  var month;
  var year;
//////////////////////////////////////

  var events;
  var event_array=new Array();
////////이벤트 출력 ///////////////////////);
  database['EventModel'].findByClub('YOMO',function(err,data){
    if(err!=null)
      console.log(err);
    else{
      events=data;
      events.forEach(function(content,i,arr){

        var str=moment(events[i].start,"YYYY-MM-DDTHH:mm");
        var end=moment(events[i].end,"YYYY-MM-DDTHH:mm");
        if(str.format("MM")*1!=today.getMonth()+1)
          return;
        str_d=str.format("DD");
        end_d=end.format("DD");
        str_d*=1;
        end_d*=1;
        // *=1 을해주는 이유는 string을 number형으로 바꾸기 위해
        // 이벤트에서 시간 파싱해서 number형으로 바꿈
        // 이거이제 연산해서 ejs로보낸담에 ejs에서
        // css에 있는 grid-column grid-row 동적으로 수정해주면 완벽

        event_array[i]={start:str_d,end:end_d,event_title:events[i].title};
        console.log(event_array);
      });
    }
    res.render('calendar', { title: '시립대 요즘뭐하지? YOMO' ,event_array:event_array, days: days ,shift:shift, lines: lines ,month:today.getMonth()+1, year:today.getFullYear()});
  });
});

module.exports = router;



//이거 나중에 디비연동으로 때울꺼임
