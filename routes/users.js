var express = require('express');
var router = express.Router();


// displayName,email도 받아와야해
var adduser = function(req, res) {
	console.log('user 모듈 안에 있는 adduser 호출됨.');

	console.log(req.session.nickname);
	console.log(req.session.email);
	console.log(req.param('club'));

	var database = req.app.get('database');

  var paramNickname=req.session.nickname;
  var paramEmail=req.session.email;
	var paramClub = req.param('club');

	if (database) {
		addUser(database, paramNickname, paramEmail, paramClub, function(err, result) {
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
var addUser = function(database, nickname, email, club, callback) {
	console.log('addUser 호출됨.');

	// UserModel 인스턴스 생성
	var user = new database.UserModel({"nickname":nickname, "email":email, "club":club});
	// save()로 저장
	user.save(function(err) {
		if (err) {
			callback(err, null);
			return;
		}

	    console.log("YOMO 사용자 데이터 추가함.");
	    callback(null, user);

	});
};

var add_firebase_session = function(req, res) {
	console.log('user 모듈 안에 있는 add_firebase_session 호출됨.');
  console.log(req.body);
	req.session.nickname=req.body.nickname;
	req.session.email=req.body.email;
	req.session.club='';
	console.log("req.session.nickname : "+req.session.nickname);
	console.log("req.session.email : "+req.session.email);
  res.end();

};

var check = function(req, res){
	console.log('user 모듈 안에 있는 adduser 호출됨.');

	console.log("닉네임이 뭐야"+req.session.nickname);
	console.log("이메일이 뭐야"+req.session.email);

	var database = req.app.get('database');

  var paramNickname=req.session.nickname;
  var paramEmail=req.session.email;

	console.log("세션 받아온 정보 닉네임 "+paramNickname);
	console.log("세션 받아온 정보 이메일 "+paramEmail);

	if(database){
		authUser(database, paramEmail, function(err, result) {
			if(err){throw err;}

			if (result) {
				console.dir(result);

				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});

				// 뷰 템플레이트를 이용하여 렌더링한 후 전송
				var context = {title:'로그인 성공'};
				req.app.render('login_success', context, function(err, html) {
					if (err) {throw err;}
					console.log("rendered : " + html);
					res.end(html);
				})
			}
			else{
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});

				// 뷰 템플레이트를 이용하여 렌더링한 후 전송
				var context = {title:'로그인 실패'};
				req.app.render('login_failed', context, function(err, html) {
					if (err) {throw err;}
					console.log("rendered : " + html);
					res.end(html);
				})
			}
		})
	}
};

var authUser = function(database, email, callback) {
	console.log('authUser 호출됨.');

	// 1. 아이디를 이용해 검색
	database.UserModel.findByEmail(email, function(err, results) {
		if (err) {
			callback(err, null);
			return;
		}

		console.log('이메일 [%s]로 사용자 검색결과', email);
		console.dir(results);

		if (results.length > 0) {
			console.log('일치하는 사용자 찾음.');
			callback(null, results);
		} else {
			console.log("일치하는 사용자를 찾지 못함.");
	    callback(null, null);
		}
	});
}


//module.exports.login = login;
module.exports.add_firebase_session = add_firebase_session;
module.exports.check = check;
module.exports.adduser = adduser;
