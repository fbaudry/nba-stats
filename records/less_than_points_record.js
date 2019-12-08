/*
    Record du nombre de match avec moins de X pts
 */
const fs = require('fs');
const seasons = JSON.parse(fs.readFileSync('./archives/seasons.json', 'utf8')).slice(1, 15).reverse();

const get_team_result = (game, team, nb_points) => {
    if(game.home_team.name === team) {
        return parseInt(game.home_team.score) < nb_points;
    }

    return parseInt(game.away_team.score) < nb_points;
};


const start = async (team, nb_points) => {
    seasons.forEach(season => {
        let games = JSON.parse(fs.readFileSync('./archives/' + season.name + '/games.json', 'utf8'));

        const team_games = games.filter(game => {
            if(game.home_team.name == team || game.away_team.name == team) {
            return game;
        }

    });

    let counter = [];
    let record = [];
    team_games.forEach(game => {
        let result = get_team_result(game, team, nb_points);

        if(result) {
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