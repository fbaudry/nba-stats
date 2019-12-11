/**
 * Percentage du nombre de match où l'équipe qui reçoit finit par gagner
 */
const fs = require('fs');

const seasons = JSON.parse(fs.readFileSync('./archives/seasons.json', 'utf8')).slice(1, 16).reverse();

seasons.forEach(season => {
    console.log('---------- ' + season.name + ' ----------');

    const games = JSON.parse(fs.readFileSync('./archives/' + season.name + '/games.json', 'utf8'));

    let counter = 0;

    games.forEach(game => {
        if(game.home_team.score > game.away_team.score) {
            ++counter;
        }
    });

    console.log(counter + ' sur ' + games.length + ' (' + (counter*100/games.length).toFixed(2) + '%)');
});
