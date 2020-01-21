/*jslint devel: true */
/* eslint-disable no-console */
/*eslint no-undef: "error"*/
/*eslint-env node*/

/*
 * 설정
 */

module.exports = {
	server_port: 3000,
	db_url: "mongodb+srv://chaegangpower:1234@cluster0-u9rrd.mongodb.net/test?retryWrites=true&w=majority",
	db_schemas: [
	    {file:'./user_schema', collection:'users3', schemaName:'UserSchema', modelName:'UserModel'},
			{file:'./club_schema', collection:'clubs', schemaName:'ClubSchema', modelName:'ClubModel'},
			{file:'./event_schema', collection:'events', schemaName:'EventSchema', modelName:'EventModel'}
	],
	route_info: [
	    //===== User =====//

							// user.add_firebase_session
	   // ,{file:'./user', path:'/process/listuser', method:'listuser', type:'post'}			// user.listuser

	    //===== Test =====//
	   // ,{file:'./test', path:'/process/test1', method:'test1', type:'post'}
	]
}
