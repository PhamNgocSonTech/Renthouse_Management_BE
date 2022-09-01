const Game = Parse.Object.extend('GameScore');

// function avg game score
Parse.Cloud.define('averageScore', async req => {
    const query = new Parse.Query('GameScore');
    query.equalTo('playerName', req.params.playerName);
    const results = await query.find();
    let sum = 0;
    // ++i tang gia tri bien len 1 va tra ve sau khi tang
    for (let i = 0; i < results.length; ++i) {
      sum += results[i].get('score');
    }
    return sum / results.length;
  });
  
  // function add new game score
  Parse.Cloud.define('addGame', async request =>{
    const game = new Game();
    game.set('score', request.params.score);
    game.set('playerName', request.params.playerName);
    game.set('cheatMode', false);
    const saveGame = await game.save(null, {useMasterKey: true});
    return saveGame;
  })
  
//   function find player by id
  Parse.Cloud.define('findIdByName', async request =>{
    const query = new Parse.Query('GameScore')
    // const game = new Game();
    const player = query.equalTo('playerName', request.params.playerName);
    // game.get('playerName', request.params.playerName);
    const cheatMode = player.get("cheatMode")
    const score = player.get("score")
    alert(`Cheatmode: ${cheatMode} score: ${score}`);
    
    // const saveGame = await game.save(null, {useMasterKey: true});
    // return saveGame.id;
  })