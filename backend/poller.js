var logger = require( './logger.js' ).logger;
var db = require( './db.js' );
var voters = require( './voters.js' );
var config = require( './config.js' );

class poller{
    constructor(){
        this.pollWinner = '';
    }

    pollAudienceWinner(roundId){
        voters.getAllVoters().then((res) => {
            if (res.length != 0){
                logger.info( 'Selecting winner from ' + res.length + ' voters' )
                var selection = Math.floor( Math.random() * res.length );
                logger.info( 'Winner is ' + res[ selection ] );
                this.pollWinner = res[ selection ];
            } else {
                logger.error( 'There are no voters');
            }
        }).catch((err)=>{logger.error( 'Cannot get voters ' + err)});
    }

    getPollWinner(){
        return this.pollWinner;
    }
}

module.exports.poller = poller;
