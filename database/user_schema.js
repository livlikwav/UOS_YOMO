/*jslint devel: true */
/* eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/

/**
 * 모듈에 대해 알아보기
 *
 * UserSchema 객체를 모듈로 만들기
 */

var Schema = {};

Schema.createSchema = function(mongoose) {

	// 스키마 정의
	var UserSchema = mongoose.Schema({
      nickname: {type: String, required: true, unique: false, 'default':''}, // google user로 받음
	    email: {type: String, required: true, unique: false, 'default':''}, // google user로 받음
	    club: {type: String, 'default':'none'}, // 필수는 아님
	    rank: {type: Number, 'default': 3}, // 일반 사용자 : 3, 동아리 장 : 2, 마스터 계정 : 1
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});

	// password를 virtual 메소드로 정의 : MongoDB에 저장되지 않는 편리한 속성임. 특정 속성을 지정하고 set, get 메소드를 정의함

	// 스키마에 모델 인스턴스에서 사용할 수 있는 메소드 추가

	/*
	// 저장 시의 트리거 함수 정의 (password 필드가 유효하지 않으면 에러 발생)
	UserSchema.pre('save', function(err,item) {
    console.log("save 호출 되었습니다.");
		return;
	})
	*/

	// 스키마에 static 메소드 추가
	UserSchema.static('findByEmail', function(email, callback) {
		return this.find({email:email}, callback);
	});

	UserSchema.static('findAll', function(callback) {
		return this.find({}, callback);
	});

	console.log('UserSchema 정의함.');

	return UserSchema;
};

// module.exports에 UserSchema 객체 직접 할당
module.exports = Schema;
