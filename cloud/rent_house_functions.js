// const user = new Parse.Object('_User');
const rentHouse = new Parse.Object('RentHouse');
const RentHouse = Parse.Object.extend('RentHouse');
const Room = Parse.Object.extend('Room');

// function add new Rent House no pointer
Parse.Cloud.define('addRentHouse', async req => {
  const rentHouseObj = new Parse.Object('RentHouse');
  rentHouseObj.set('nameRentHouse', req.params.nameRentHouse);
  rentHouseObj.set('address', req.params.address);
  // rentHouseObj.set('price', req.params.price);
  rentHouseObj.set('description', req.params.description);
  rentHouseObj.set('image', req.params.image);
  rentHouseObj.save();
  // const result = await rentHouseObj.save(null, { useMasterkey: true });
  return 'Add RentHouse Successfully';
});

// function change name RentHouse
Parse.Cloud.define('changeRentHouseName', async req => {
  const rentHouseObj = new RentHouse();
  rentHouseObj.id = req.params.objectId;
  rentHouseObj.set('nameRentHouse', req.params.nameRentHouse);
  rentHouseObj.set('address', req.params.address);
  // rentHouseObj.set('price', req.params.price);
  rentHouseObj.set('description', req.params.description);
  rentHouseObj.set('image', req.params.image);
  const saveRentHouse = await rentHouseObj.save(null, { useMasterKey: true });
  return saveRentHouse;
});

// ***function Delete RentHouse by ID (RELEASE)***
Parse.Cloud.define('deleteRentHouseByID', async request => {
  const rentHouseObj = new RentHouse();
  rentHouseObj.id = request.params.objectId;
  await rentHouseObj.destroy({ useMasterKey: true });
  return rentHouseObj;
});

// Function Delete Room Name
Parse.Cloud.define('deleteRentHouseByName', async req => {
  const nameRentHouse = req.params.nameRentHouse;
  const queryRentHouse = new Parse.Query(RentHouse);
  const getRentHouseName = queryRentHouse.equalTo('nameRentHouse', nameRentHouse);
  const data = await getRentHouseName.first();
  data.destroy();
  return data;
});

// ***function set relation RenhouseId for Room (RELEASE)***
Parse.Cloud.define('relationRentId', async req => {
  var queryRentHouse = new Parse.Query('RentHouse');
  var queryRoom = new Parse.Query('Room');
  // get obj RentHouse_Id
  var rentObj = await queryRentHouse.get(req.params.objectId);
  //check name room exists
  queryRoom.equalTo('nameRoom', req.params.nameRoom);
  await queryRoom.first().then(function (obj) {
    // set RentHouse_Id for Room object
    obj.set('rentHouse_Id', rentObj);
    obj.save(null, { useMasterKey: true });
    // console.log(obj.attributes)
  });
  return 'Success Add Relation is RentHouse_Id for Room';
});

// function find RentHouse by ID or Name
Parse.Cloud.define('findRentHouse', async req => {
  var rentHouseObj = new Parse.Query('RentHouse');
  if (req.params.nameRentHouse) {
    rentHouseObj.equalTo('nameRentHouse', req.params.nameRentHouse);
    var obj = await rentHouseObj.first();
  } else {
    var obj = await rentHouseObj.get(req.params.objectId);
  }
  // var json = obj.toJSON();
  // var result = {
  //     nameRentHouse: json.nameRentHouse,
  //     id: json.objectId
  // }
  return obj;
});

// -----------------------------------------------------------------------------------------------------------------

// new function add new Room with pointer to Categories
// Parse.Cloud.define('newAddRentHouse', async req => {
//   const rentHouseObj = new RentHouse();
//   // const categories = new Categories()
//   const roomId = 'Z9nTH8do1h'; /*req.params.objectId*/
//   const nameHouse = req.params.number;
//   const address = req.params.size;
//   const price = req.params.windows;
//   const description = req.params.windows;
//   const image = req.params.image;

//   var query = new Parse.Query('Room');
//   query.equalTo('objectId', roomId /*req.params.id*/);
//   query.first().then(function (objRoom) {
//     console.log(objRoom.attributes);
//     rentHouseObj.set('nameHouse', nameHouse);
//     rentHouseObj.set('address', address);
//     rentHouseObj.set('price', price);
//     rentHouseObj.set('description', description);
//     rentHouseObj.set('image', image);
//     rentHouseObj.set('RentHouse_Id', objRoom);
//     rentHouseObj.save();
//   });
//   return 'Successfully Add Room';
// });

// function add pointer from RenhouseId to RoomId
// new function add new Room with pointer to Categories
// Parse.Cloud.define('addRentIdToRoom', async req => {
//   const room = new Room();
//   const rentHouseObj = new RentHouse();
//   rentHouseObj.id = req.params.objectId;
//   const roomId = 'Z9nTH8do1h';
//   var query = new Parse.Query('Room');
//   query.equalTo('objectId', roomId);
//   query.first().then(function (objRoom) {
//     console.log(objRoom.attributes);
//     room.set('RentHouse_Id', objRoom);
//     room.save();
//   });
//   return 'Successfully Relation ';
// });

// const room = new Parse.Object('Room');

// var RentHouse_Id = 'YB9SLx9pzB'

// const user = new User()
// Parse.Cloud.define('addUser1', async req => {
//   // const user = new Parse.Object('User');
//   // const user = new User()
//   user.set('UserName', req.params.username);
//   user.set('Password', req.params.password);
//   user.set('Email', req.params.email);
//   let result = await user.save();
//   return result;
// });

//   //Reading Object
//   async function retrievePerson() {
//     const query = new Parse.Query("Person");

//     try {
//       const person = await query.get("mhPFDlCahj");
//       const name = person.get("name");
//       const age = person.get("age");

//       alert(`Name: ${name} age: ${age}`);
//     } catch (error) {
//       alert(`Failed to retrieve the object, with error code: ${error.message}`);
//     }
//   }
