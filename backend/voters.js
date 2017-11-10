var db = require( './db.js' );
var logger = require( './logger.js' ).logger;

var codePattern = new RegExp( '^[a-zA-Z]{8}$', '' );
var votePattern = new RegExp( '^[0-9]{1,}$', '' );
var pnbrPattern = new RegExp( '^[0-9]{11}$', '' );

function isRegistration( text ) {
	return codePattern.test( text );
}

function isVote( text ) {
	return votePattern.test( text );
}

function addUser( number, code ) {
	var regKey = code.toUpperCase();
	db.runQuery( 'INSERT INTO voters(phone_number, reg_key) VALUES( ?, ? )', [ number, regKey ])
		.then(db.runQuery( 'UPDATE reg_key SET used = 1 WHERE reg_key = ?', regKey))
}

function getAllVoters() {
	return db.runQuery( 'SELECT phone_number FROM voters', []).then((result) => {return result.map(x => x['phone_number'])});
}

module.exports.addUser = addUser;
module.exports.isRegistration = isRegistration;
module.exports.isVote = isVote;
module.exports.getAllVoters = getAllVoters;
