/**
 * Percentage du nombre de match où l'équipe à domicile mène à la mi-temps et finit par gagner
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

    let counter = {
        home_team_winner: 0,
        home_team_half_time_and_final_time_winner: 0
    };

    games.forEach(game => {
        const winner = get_winner(game);
        const looser = get_looser(game);

        if(winner !== game.home_team) {
            return;
        }

        const winner_score_half_time = parseInt(winner.quarters[0]) + parseInt(winner.quarters[1]);
        const looser_score_half_time = parseInt(looser.quarters[0]) + parseInt(looser.quarters[1]);

        ++counter.home_team_winner;

        if(winner_score_half_time > looser_score_half_time) {
            ++counter.home_team_half_time_and_final_time_winner;
        }
    });

    console.log(counter.home_team_half_time_and_final_time_winner + ' sur ' + counter.home_team_winner + ' (' + (counter.home_team_half_time_and_final_time_winner*100/counter.home_team_winner).toFixed(2) + '%)');
});
