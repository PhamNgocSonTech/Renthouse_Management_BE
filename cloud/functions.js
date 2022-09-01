Parse.Cloud.define('hello', req => {
  req.log.info(req);
  return 'Hi';
});

Parse.Cloud.define('asyncFunction', async req => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  req.log.info(req);
  return 'Hi async';
});

Parse.Cloud.beforeSave('Test', () => {
  throw new Parse.Error(9001, 'Saving test objects is not available.');
});


// -----------------------------------------------------------------------------------------------------------------

// Parse.Cloud.beforeSave(Parse.User, async(req) => {
//   if (!req.object.existed()){
//       const userCount = await new Parse.Query('Statistics').equalTo('name', 'user_count').first({useMasterKey: true});
//       userCount.increment('count');
//       userCount.save(null, {useMasterKey: true});
//   }});

// // Saving your First Data Object on Back4App
// Parse.Cloud.define('addRentHouse', async req => {
//   const person = new Parse.Object('RentHouse');
//   person.set('name', 'Son');
//   person.set('address', "SG");
//     let result = await person.save();
//     return result
    
// });

 // function avg game score
//  Parse.Cloud.define('averageScore', async req => {
//   const query = new Parse.Query('GameScore');
//   query.equalTo('playerName', req.params.playerName);
//   const results = await query.find();
//   let sum = 0;
//   // ++i tang gia tri bien len 1 va tra ve sau khi tang
//   for (let i = 0; i < results.length; ++i) {
//     sum += results[i].get('score');
//   }
//   return sum / results.length;
// });

// // function add new game score
// const Game = Parse.Object.extend('GameScore');
// Parse.Cloud.define('addGame', async request =>{
//   const game = new Game();
//   game.set('score', request.params.score);
//   game.set('playerName', request.params.playerName);
//   game.set('cheatMode', false);
//   const saveGame = await game.save(null, {useMasterKey: true});
//   return saveGame;
// })


// Parse.Cloud.define('findIdByName', async request =>{
//   const game = new Game();
//   game.set('playerName', request.params.playerName);
//   const saveGame = await game.save(null, {useMasterKey: true});
//   return saveGame.id;
// })
