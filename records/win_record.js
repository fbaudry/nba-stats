/*
    Record du nombre de victoire d'affilées d'une équipe
 */
const fs = require('fs');
const seasons = JSON.parse(fs.readFileSync('./archives/seasons.json', 'utf8')).slice(1, 15).reverse();

const get_team_result = (game, team) => {
    if(game.home_team.name === team) {
        return game.home_team.score > game.away_team.score ? 'W' : 'L';
    }

    return game.away_team.score > game.home_team.score ? 'W' : 'L';
};


const start = async (team) => {
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
        let result = get_team_result(game, team);

    if('W' === result) {
        counter.push(game);
        if(counter.length > record.length) { record = counter; }
        return;
    }

    if('L' === result) {
        counter = [];
    }
});

    console.log(season.name);
    console.log('record : ' + record.length);
    console.log(record);
    console.log('-----------------------');
});
};

module.exports.start = start;