/*
    Record du nombre de match avec plus de X pts
 */
const fs = require('fs');
const seasons = JSON.parse(fs.readFileSync('./archives/seasons.json', 'utf8')).slice(1, 15).reverse();

const get_team_result = (game, team, nb_points, quarter_index) => {
    if(game.home_team.name === team) {
        return parseInt(game.home_team.quarters[quarter_index]) < nb_points;
    }

    return parseInt(game.away_team.quarters[quarter_index]) < nb_points;
};


const start = async (team, nb_points, quarter_index) => {
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
            let result = get_team_result(game, team, nb_points, quarter_index);

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