var express = require('express');
var router = express.Router();
var listRouter = require('./list');
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
  var today = new Date();
  var shift_mon=2;
  // 달력 얼만큼 옮겼는지
  today= new Date(today.getFullYear(),today.getMonth()-shift_mon,1);
  var first = new Date(today.getFullYear(),today.getMonth(),1);
  var end = new Date(today.getFullYear(),today.getMonth()+1,0);

  console.log(first+today+end);

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
    lines++;
  }
  // 현재 달의 날짜들
  for(var j=1;j<=end.getDate();j++){
    days.push(j);
  }
  // 다음 달의 날짜들
  if(end.getDay()!=0){
    console.log(end.getDay());
    for(var j=1;j<=7-(end.getDay()+1);j++){
      days.push(j);
    }
    lines++;
  }
  lines=lines+4;
  var month;
  var year;
  console.log(days);
//////////////////////////////////////



////////이벤트 출력 ///////////////////////
  var event_array = new Array();
      // 이벤트 로딩 //

      // 여기에 디비에서 이벤트 받아오는 구문 넣으면 됨

      /////////////////
  for(var i =0;i<5;i++){
    var str=moment(events[i].start,"YYYY-MM-DDTHH:mm");
    var end=moment(events[i].end,"YYYY-MM-DDTHH:mm");
    str_d=str.format("DD");
    end_d=end.format("DD");
    str_d*=1;
    end_d*=1;
    // *=1 을해주는 이유는 string을 number형으로 바꾸기 위해

    // 이벤트에서 시간 파싱해서 number형으로 바꿈
    // 이거이제 연산해서 ejs로보낸담에 ejs에서
    // css에 있는 grid-column grid-row 동적으로 수정해주면 완벽
    event_array[i]={str:str_d,end:end_d,event_title:events[i].title};
    console.log(event_array);
  }
<<<<<<< HEAD:routes/calendar2.js
/////////////////////////////////////////////
  res.render('calendar', { title: 'Express' ,event_array:event_array, days: days , lines: lines ,month:today.getMonth()+1, year:today.getFullYear()});
=======

  res.render('calendar', { title: '시립 요모 : 시립대 요번주 모하나' ,event_array:event_array });
>>>>>>> f6bdcb22309a8eb75d79a35e0fcc4211e224d7ab:routes/calendar.js
});

module.exports = router;



//이거 나중에 디비연동으로 때울꺼임
var events=[{
        "_id": 1,
        "title": "거래처 미팅",
        "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
        "start": "2019-05-11T09:30",
        "end": "2019-05-13T15:00",
        "type": "카테고리1",
        "username": "다현",
        "backgroundColor": "#D25565",
        "textColor": "#ffffff",
        "allDay": false
      }, {
        "_id": 2,
        "title": "치과예약",
        "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
        "start": "2019-05-10T12:30",
        "end": "2019-05-15T15:30",
        "type": "카테고리1",
        "username": "나연",
        "backgroundColor": "#9775fa",
        "textColor": "#ffffff",
        "allDay": false
      }, {
        "_id": 3,
        "title": "철수 생일",
        "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
        "start": "2019-05-11",
        "end": "2019-05-11",
        "type": "카테고리2",
        "username": "다현",
        "backgroundColor": "#ffa94d",
        "textColor": "#ffffff",
        "allDay": true
      }, {
        "_id": 4,
        "title": "멜론 만기",
        "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
        "start": "2019-05-11",
        "end": "2019-05-12",
        "type": "카테고리2",
        "username": "지효",
        "backgroundColor": "#74c0fc",
        "textColor": "#ffffff",
        "allDay": true
      }, {
        "_id": 5,
        "title": "청약 입금",
        "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
        "start": "2019-05-08",
        "end": "2019-05-08",
        "type": "카테고리3",
        "username": "지효",
        "backgroundColor": "#f06595",
        "textColor": "#ffffff",
        "allDay": true
      }, {
        "_id": 6,
        "title": "카드값 납부",
        "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
        "start": "2019-05-14",
        "end": "2019-05-14",
        "type": "카테고리2",
        "username": "사나",
        "backgroundColor": "#63e6be",
        "textColor": "#ffffff",
        "allDay": true
      }, {
        "_id": 7,
        "title": "휴가",
        "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
        "start": "2019-05-18",
        "end": "2019-05-20",
        "type": "카테고리4",
        "username": "사나",
        "backgroundColor": "#a9e34b",
        "textColor": "#ffffff",
        "allDay": true
      },{
        "_id": 8,
        "title": "세차예약",
        "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
        "start": "2019-05-24T09:00",
        "end": "2019-05-24T10:00",
        "type": "카테고리3",
        "username": "정연",
        "backgroundColor": "#4d638c",
        "textColor": "#ffffff",
        "allDay": false
      },{
        "_id": 9,
        "title": "출장",
        "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
        "start": "2019-05-28",
        "end": "2019-05-31",
        "type": "카테고리3",
        "username": "정연",
        "backgroundColor": "#495057",
        "textColor": "#ffffff",
        "allDay": true
      },{
        "_id": 10,
        "title": "접수 기간",
        "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
        "start": "2019-05-15",
        "end": "2019-05-22",
        "type": "카테고리2",
        "username": "다현",
        "backgroundColor": "#9775fa",
        "textColor": "#ffffff",
        "allDay": true
      }]
;
