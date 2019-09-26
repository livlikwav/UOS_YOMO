var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// displayName,email도 받아와야해
var adduser = function(req, res) {
	console.log('user 모듈 안에 있는 adduser 호출됨.');

	var database = req.app.get('database');

	var paramId = req.param('id');
	var paramPassword = req.param('password');
	var paramName = req.param('name');

	if (database) {
		addUser(database, paramId, paramPassword, paramName, function(err, result) {
			if (err) {throw err;}

			if (result) {
				console.dir(result);

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});

				// 뷰 템플레이트를 이용하여 렌더링한 후 전송
				var context = {title:'사용자 추가 성공'};
				req.app.render('adduser', context, function(err, html) {
					if (err) {throw err;}

					console.log("rendered : " + html);

					res.end(html);
				});

			} else {
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h2>사용자 추가  실패</h2>');
				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.end();
	}

};

//사용자를 등록하는 함수
var addUser = function(database, id, password, name, callback) {
	console.log('addUser 호출됨.');

	// UserModel 인스턴스 생성
	var user = new database.UserModel({"id":id, "password":password, "name":name});

	// save()로 저장
	user.save(function(err) {
		if (err) {
			callback(err, null);
			return;
		}

	    console.log("사용자 데이터 추가함.");
	    callback(null, user);

	});
};

var add_firebase_session = function(req, res) {
	console.log('user 모듈 안에 있는 add_firebase_session 호출됨.');

	var nickName = req.param('nickName');
	var email = req.param('email');

  console.log("닉네임 : "+nickName);
  console.log("이메일 : "+email);

};

//module.exports.login = login;
module.exports.add_firebase_session = add_firebase_session;
module.exports.adduser = adduser;
module.exports = router;
