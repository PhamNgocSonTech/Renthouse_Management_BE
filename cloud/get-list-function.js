const User = Parse.Object.extend('_User');
const Room = Parse.Object.extend('Room');
const RentHouse = Parse.Object.extend('RentHouse');
const Categories = Parse.Object.extend('Categories');
const Bill = Parse.Object.extend('Bill');

const user = new Parse.User();



// function get list all Users
  Parse.Cloud.define('listUsers', async request => {
    const queryUser = new Parse.Query(User);
    const listUsers = await queryUser.find({ useMasterKey: true });
    return listUsers;
  });

  // function get list all Rooms
  Parse.Cloud.define('listRoom', async request => {
    const queryRoom = new Parse.Query(Room);
    const listRoom = await queryRoom.find({ useMasterKey: true });
    return listRoom;
  });

   // function get list all RentHouse
   Parse.Cloud.define('listRentHouse', async request => {
    const queryRentHouse = new Parse.Query(RentHouse);
    const listRentHouse = await queryRentHouse.find({ useMasterKey: true });
    return listRentHouse;
  });

   // function get list all Categories
   Parse.Cloud.define('listCategories', async request => {
    const queryCate = new Parse.Query(Categories);
    const listCate = await queryCate.find({ useMasterKey: true });
    return listCate;
  });

    // function get list all Bill
    Parse.Cloud.define('listBill', async request => {
      const queryBill = new Parse.Query(Bill);
      const listBill = await queryCate.find({ useMasterKey: true });
      return listBill;
    });

// -----------------------------------------------------------------------------------------------------------------
// function get User by ID
// Parse.Cloud.define('getUsers', async request => {
//     const queryUser = new Parse.Query(User);
//     const getUsers = await queryUser.get(request.params.objectId, { useMasterKey: true });
//     return getUsers;
//   });

  //function get user by id
// Parse.Cloud.define('getUserById', async req => {
//     var queryUser = new Parse.Query(user);
//     // return full User's data
//     queryUser.include('room');
//     var roomObj = await queryUser.get(req.params.objectId);
//     return roomObj;
//     // var Json = roomObj.toJSON();
//     // var result = {
//     //     username: Json.username,
//     //     phone: Json.phone,
//     //     room: Json.room_Id
  
//     //     }
//     //   return result
//   });