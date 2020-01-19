var express = require('express');
var router = express.Router();
/////////////////
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
/////////////jquery 연동////////////////
var moment = require('moment');




    // 이벤트 로딩
var events=[{
        "_id": 1,
        "title": "RAH 즉석 댄스 공연",
        "description": "배봉탕에서 즉석 댄스 공연이 있습니다. 많이들 놀러오세요!",
        "start": "2019-05-11T09:30",
        "end": "2019-05-13T15:00",
        "type": "카테고리1",
        "username": "RAH",
        "backgroundColor": "#D25565",
        "textColor": "#ffffff",
        "allDay": false,
        "filename": "sample1.img"
      }, {
        "_id": 2,
        "title": "알림 알고리즘 대회",
        "description": "DIV1, DIV2 나눠서 진행합니다. 많이 참여해 주세요",
        "start": "2019-05-10T12:30",
        "end": "2019-05-15T15:30",
        "type": "카테고리1",
        "username": "알림",
        "backgroundColor": "#9775fa",
        "textColor": "#ffffff",
        "allDay": false,
        "filename": "sample2.img"
      }, {
        "_id": 3,
        "title": "3학년 수강신청",
        "description": "5월 11일은 3학년 수강신청일입니다.",
        "start": "2019-05-11T10:00",
        "end": "2019-05-11T23:59",
        "type": "카테고리2",
        "username": "학교관리자",
        "backgroundColor": "#ffa94d",
        "textColor": "#ffffff",
        "allDay": true,
        "filename": "sample3.img"
      }, {
        "_id": 4,
        "title": "CCC 깜짝 붕어빵 선물",
        "description": "11일과 12일 중앙도서관 앞에서 붕어빵 행사를 진행합니다.",
        "start": "2019-05-11T12:30",
        "end": "2019-05-12T13:00",
        "type": "카테고리2",
        "username": "CCC",
        "backgroundColor": "#74c0fc",
        "textColor": "#ffffff",
        "allDay": true,
        "filename": "sample4.img"
      }, {
        "_id": 5,
        "title": "청약 입금",
        "description": "주택 청약 입금할 날짜입니다.",
        "start": "2019-05-08",
        "end": "2019-05-08",
        "type": "카테고리3",
        "username": "지효",
        "backgroundColor": "#f06595",
        "textColor": "#ffffff",
        "allDay": true,
        "filename": "sample5.img"
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
        "allDay": true,
        "filename": "sample6.img"
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
        "allDay": true,
        "filename": "sample7.img"
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
        "allDay": false,
        "filename": "sample8.img"
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
        "allDay": true,
        "filename": "sample9.img"
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
        "allDay": true,
        "filename": "sample10.img"
      }]
;

    




module.exports = router;    
    
//이거 나중에 디비연동으로 때울꺼임
router.get('/', function(req, res,  next) {
  var date=req.param('date');
  
  var event_array = new Array();    
  for(var i =0;i<5;i++){
    
  var str=moment(events[i].start,"YYYY-MM-DDTHH:mm");
  var end=moment(events[i].end,"YYYY-MM-DDTHH:mm");
  str_d=str.format("DD");
  end_d=end.format("DD");
  str_h = str.format("HH");
  str_m = str.format("mm");
  end_h = end.format("HH");
  end_m = end.format("mm");
  //str_h*=1;
  //str_m*=1;
  //end_h*=1;
  //end_m*=1;
  str_d*=1;
  end_d*=1;
  // *=1 을해주는 이유는 string을 number형으로 바꾸기 위해

  // 이벤트에서 시간 파싱해서 number형으로 바꿈
  // 이거이제 연산해서 ejs로보낸담에 ejs에서
  // css에 있는 grid-column grid-row 동적으로 수정해주면 완벽
  event_array[i]={str:str_d,end:end_d,event_title:events[i].title, description:events[i].description , filename:events[i].filename, str_h:str_h, str_m:str_m, end_h:end_h, end_m:end_m, username:events[i].username};
  console.log(event_array);
  
}
    
    
    
  res.render('list' , {date :date, event_array :event_array});
});
    
    
    
    

