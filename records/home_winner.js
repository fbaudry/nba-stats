/*
    Record du nombre de matchs gagnés à domicile
 */
const fs = require('fs');
const seasons = JSON.parse(fs.readFileSync('./archives/seasons.json', 'utf8')).slice(1, 15).reverse();


const start = async (team) => {
    seasons.forEach(season => {
        let games = JSON.parse(fs.readFileSync('./archives/' + season.name + '/games.json', 'utf8'));

        const team_games = games.filter(game => {
            if(game.home_team.name == team) {
                return game;
            }
        });

        let counter = [];
        let record = [];
        team_games.forEach(game => {
            if(game.home_team.score > game.away_team.score) {
                counter.push(game);
                if(counter.length > record.length) { record = counter; }
                return;
            }

            counter = [];
        });

        console.log(season.name);
        console.log('record : ' + record.length);
        console.log('-----------------------');
    });
};

module.exports.start = start;