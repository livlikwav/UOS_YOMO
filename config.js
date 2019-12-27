/*jslint devel: true */
/* eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/

/*
 * 설정
 */

module.exports = {
	server_port: 3000,
	db_url: 'mongodb+srv://chaegangpower:1234@cluster0-u9rrd.mongodb.net/test?retryWrites=true&w=majority',
	db_schemas: [
	    {file:'./user_schema', collection:'users3', schemaName:'UserSchema', modelName:'UserModel'}
	],
	route_info: [
	    //===== User =====//
	    {file:'./users', path:'/process/adduser', method:'adduser', type:'post'}				// user.adduser
			,{file:'./users', path:'/process/check', method:'check', type:'post'}				// user.check yomo계정인지 확인해
			,{file:'./users', path:'/process/add_firebase_session', method:'add_firebase_session', type:'post'}
							// user.add_firebase_session
	   // ,{file:'./user', path:'/process/listuser', method:'listuser', type:'post'}			// user.listuser

	    //===== Test =====//
	   // ,{file:'./test', path:'/process/test1', method:'test1', type:'post'}
	]
}
