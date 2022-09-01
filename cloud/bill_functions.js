const User = Parse.Object.extend('_User');
const Room = Parse.Object.extend('Room');
const Bill = Parse.Object.extend('Bill');

// function Set Categories_ID for RentHouse
Parse.Cloud.define('addBillRelation', async req => {
  var bill = new Bill();
  var queryRoom = new Parse.Query('Room');
  var queryUser = new Parse.Query('_User');
  var queryBill = new Parse.Query('Bill');

  // get obj RentHouse_Id
  var room_Id = req.params.room_Id;
  queryUser.contains('room_Id', room_Id);
  //check name room exists
  var username = queryUser.equalTo('username', req.params.username);
  await queryBill.first().then(function (obj) {
    // set RentHouse_Id for Room object
    obj.set('username', username);
    obj.set('room_Id', room_Id);
    obj.save(null, { useMasterKey: true });
    console.log(obj.attributes);
  });
  return 'Success Categories_ID for RentHouse';
});


// function add biil new version 
Parse.Cloud.define('addBill', async req => {
  const queryUser = new Parse.Query(Parse.User);
  const fullname = req.params.fullName;
  const phone = req.params.phone;
  const email = req.params.email;
  const paymentMethod = req.params.paymentMethod;
  const room_Id = req.params.room_Id;
  const user_Id = req.params.user_Id;
  //query user
  queryUser.equalTo('objectId', user_Id);
  const objUser = await queryUser.first();
  const bill = new Bill();
  //query room
  var queryRoom = new Parse.Query('Room');
  queryRoom.equalTo('objectId', room_Id);
  const objBill = queryRoom.first().then(function (obj) {
    // console.log(obj.attributes);

    bill.set('fullname', fullname);
    bill.set('email', email);
    bill.set('phone', phone);
    bill.set('paymentMethod', paymentMethod );
    bill.set('isPaid', false);
    bill.set('room_Id', obj);
    bill.set('user_Id', objUser);
    bill.save();
    // return bill
  });
  
  return objUser;
});

Parse.Cloud.define('getBillById', async req => {
  var queryBill = new Parse.Query('Bill');
  var obj = await queryBill.get(req.params.objectId);
  return obj;
})

//function add bill old version
// Parse.Cloud.define('addBill', async req => {
//   const queryUser = new Parse.Query(Parse.User);

//   const bill = new Bill();
//   const fullname = req.params.fullname;
//   const phone = req.params.phone;
//   const email = req.params.email;
//   const room_Id = req.params.room_Id;
//   var queryRoom = new Parse.Query('Room');
//   //query
//   queryRoom.equalTo('objectId', room_Id);
//   queryRoom.first().then(function (obj) {
//     // console.log(obj.attributes);

//     bill.set('fullname', fullname);
//     bill.set('email', email);
//     bill.set('phone', phone);
//     bill.set('room_Id', obj);
//     bill.save();
//   });
//   return 'Created order successfully!!';
// });
