const Room = Parse.Object.extend('Room');
const RentHouse = Parse.Object.extend('RentHouse');
const Categories = Parse.Object.extend('Categories');

// function add new Room with relation RentHouse_Id
Parse.Cloud.define('addRoom', async req => {
  const room = new Parse.Object('Room');
  // const roomName = req.params.name;
  // const roomSize = req.params.size;
  const windows = req.params.windows;
  room.set('nameRoom', req.params.nameRoom);
  room.set('price', req.params.price);
  room.set('sizeRoom', req.params.sizeRoom);
  room.set('windows', windows);
  room.set('image', req.params.image);

  room.save();
  return 'Successfully Add Room';
});

// Function Delete Room By ID
Parse.Cloud.define('deleteRoomById', async request => {
  const roomObj = new Room();
  roomObj.id = request.params.objectId;
  await roomObj.destroy({ useMasterKey: true });
  return 'Successfully', roomObj;
});

// Function Delete Room Name
Parse.Cloud.define('deleteRoomByName', async req => {
  const nameRoom = req.params.nameRoom;
  const queryRoom = new Parse.Query(Room);
  const getRoomName = queryRoom.equalTo('nameRoom', nameRoom);
  const data = await getRoomName.first();
  // data.destroy();
  data.destroy().then(
    myObj => {},
    error => {
      console.log('Error:' + error);
    }
  );
  return data;
});

// function count room object
Parse.Cloud.define('countRoomx', async req => {
  const arr = [];
  const queryRoom = new Parse.Query(Room);
  var queryRentHouse = new Parse.Query('RentHouse');

  // const queryRentHouse = new Parse.Query(RentHouse);
  const rentId = req.params.rentHouse_Id; /*'PsVsi8qdn9'*/ /**/
  queryRoom.contains('rentHouse_Id', rentId);
  const elements1 = queryRoom.count();
  await queryRentHouse.first().then(function (obj) {
    // set RentHouse_Id for Room object
    obj.set('roomCount', elements1);
    obj.save(null, { useMasterKey: true });
    console.log(obj.attributes);
  });
  // arr.push(elements1);
  return elements1;

  // queryRoom.count().then(function (counts) {
  //   console.log('RentHouseId: ' + rentId + ' have ' + counts + ' room');
  // });
});

Parse.Cloud.define('changeRoomByID', async req => {
  const roomObj = new Room();
  roomObj.id = req.params.objectId;
  roomObj.set('nameRoom', req.params.nameRoom);
  const saveRoom = await roomObj.save(null, { useMasterKey: true });
  return saveRoom;
});

Parse.Cloud.define('findRoom', async req => {
  var queryRoom = new Parse.Query('Room');
  if (req.params.nameRoom) {
    queryRoom.equalTo('nameRoom', req.params.nameRoom);
    var obj = await queryRoom.first();
  } else {
    var obj = await queryRoom.get(req.params.objectId);
  }
  return obj;


  

  // var json = obj.toJSON();
  // var result = {
  //     nameRentHouse: json.nameRentHouse,
  //     id: json.objectId
  // }

  // -----------------------------------------------------------------------------------------------------------------
  // Function Find Id By Room Num
  // Parse.Cloud.define('findRoomByName', async request => {
  //   const nameRoom = request.params.nameRoom;
  //   var query = new Parse.Query('Room');
  //   var roomQuery = query.equalTo('nameRoom', nameRoom);
  //   query.include('rentHouse_Id');
  //   const result = await roomQuery.find();
  //   return result;
  // });
});

// function get room by categories_Id
Parse.Cloud.define('getRentHouseByCategory', async req => {
  const cateId = req.params.objectId;

  var queryCate = new Parse.Query('Categories');
  queryCate.equalTo('objectId', cateId);
  const cateObj = await queryCate.first();
  console.log('object Cate', cateObj);

  var queryRenthouse = new Parse.Query('RentHouse');
  queryRenthouse.equalTo('category_Id', cateObj);
  queryRenthouse.include('type');
  queryRenthouse.include('rentHouse_Id');
  const data = await queryRenthouse.find();
  console.log('data', data);
  return data;
});


// Parse.Cloud.define('addRentIdToRoom', async req => {
//   const room = new Room();
//   const rentHouse_Id = 'kR7157m4Bf'/*req.params.objectId*/
//     var query = new Parse.Query('RentHouse');
//     query.equalTo('objectId', rentHouse_Id /*req.params.id*/);
//     query.first().then(function (objRentId) {
//       console.log(objRentId.attributes);
//       room.set('RentHouse_Id', objRentId);
//       room.save();
//   });
//   return 'Successfully relation RentHouse_ID to Room';
// });

// // new function add new Room with pointer to Categories
// Parse.Cloud.define('addCategoryToRoom', async req => {
//   const room = new Room();
//   // const rentHouse = new RentHouse()
//   // rentHouse.id = request.params.objectId;
//   const categories = 'FqlsV9Wjyu'/*req.params.objectId*/
//   // rentHouse = query.equalTo('RoomNumber', roomNumber);

//   var query = new Parse.Query('Categories');
//   query.equalTo('objectId', categories /*req.params.id*/);
//   query.first().then(function (objCate) {
//     console.log(objCate.attributes);
//     room.set('Categories_Id', objCate);
//     room.save();
//   });
//   return 'Successfully relation Category to Room';
// });

// Parse.Cloud.define('create-new-room',  req => {
//   const room = new Room();
//   const name = req.params.name
//   var q = new Parse.Query("RentHouse");
//   q.equalTo('objectId', 'VEKZbIMrDP');
//   q.first().then(function (obj) {
//     console.log(obj.attributes)
//     room.set("parent", obj)
//    var a = room.set("name" , name)
//     console.log(a)
//      room.save();
//     })

//   return 'ok';
// });

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

// //function add new Room with relation categories
// Parse.Cloud.define('newAddRoom', async req => {
//     const room = new Room();
//     // const categories = new Categories()
//     const categories = 'Nv9q03xgBa'/*req.params.objectId*/
//     const roomNumber = req.params.number;
//     const roomSize = req.params.size;
//     const windows = req.params.windows;
//     var query = new Parse.Query('Categories');
//     query.equalTo('objectId', categories /*req.params.id*/);
//     query.first().then(function (objCate) {
//       console.log(objCate.attributes);
//       room.set('Categories_Id', objCate);
//       room.set('RoomNumber', roomNumber);
//       room.set('RoomSize', roomSize);
//       room.set('Windows', windows);
//       room.save();
//     });
//     return 'Successfully Add Room';
// });
// });
