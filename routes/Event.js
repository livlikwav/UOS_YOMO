var express = require('express');
var router = express.Router();


// displayName,email도 받아와야해
var load_event = function(req, res) {
	console.log('Event 모듈 안에 있는 load_event 호출됨.');

	console.log(req.session.nickname);
	console.log(req.session.email);
	console.log(req.param('club'));

	var database = req.app.get('database');
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

//module.exports.login = login;
module.exports.load_event = load_event;
