/**
 * Percentage du nombre de match où l'équipe qui mène à la mi-temps finit par gagner
 */
const fs = require('fs');

const seasons = JSON.parse(fs.readFileSync('./archives/seasons.json', 'utf8')).slice(1, 16).reverse();


const get_winner = (game) => {
    if(game.home_team.score > game.away_team.score) {
        return game.home_team;
    }

    return game.away_team;
};

const get_looser = (game) => {
    if(game.home_team.score > game.away_team.score) {
        return game.away_team;
    }

    return game.home_team;
};

seasons.forEach(season => {
    console.log('---------- ' + season.name + ' ----------');

    const games = JSON.parse(fs.readFileSync('./archives/' + season.name + '/games.json', 'utf8'));

    let counter = 0;

    games.forEach(game => {
        const winner = get_winner(game);
        const looser = get_looser(game);

        const winner_score_half_time = parseInt(winner.quarters[0]) + parseInt(winner.quarters[1]);
        const looser_score_half_time = parseInt(looser.quarters[0]) + parseInt(looser.quarters[1]);

        if(winner_score_half_time > looser_score_half_time) {
            ++counter;
        }
    });

    console.log(counter + ' sur ' + games.length + ' (' + (counter*100/games.length).toFixed(2) + '%)');
});
