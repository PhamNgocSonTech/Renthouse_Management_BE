const { query } = require("express");

const room = Parse.Object.extend('Room');
const User = Parse.Object.extend('_User');
const Role = Parse.Object.extend('_Role');
const user = new Parse.User();
// const role = new Parse.Role();


Parse.Cloud.define('changeUsername', async req => {
    const userObj = new User();
    userObj.id = req.params.objectId
    userObj.set('username', req.params.username)
    const saveUser = await userObj.save(null, {useMasterKey:true})
    return saveUser
});

//function delete user by ID
Parse.Cloud.define('deleteUserByID', async req => {
  const objUser = new User();
  objUser.id = req.params.objectId;
  await objUser.destroy({ useMasterKey: true });
  return objUser;
});

//function delete user by ID
Parse.Cloud.define('deleteUserByName', async req => {
  const queryUsername = new Parse.Query('_User');
  const getUsername = queryUsername.equalTo('username', req.params.username);
  const itemDel = await getUsername.first();
  itemDel.destroy();
  return itemDel;
});

// function update user with Room_Id
Parse.Cloud.define('updateOrderRoomForUser', async req => {
  var queryRoom = new Parse.Query(room);
  var queryUser = new Parse.Query(user);
  // get obj room by id
  var roomObj = await queryRoom.get(req.params.objectId);
  //check username
  queryUser.equalTo('username', req.params.username);
  //update room obj at user obj
  await queryUser.first().then(function (obj) {
    obj.set('room_Id', roomObj);
    obj.save(null, { useMasterKey: true });
    console.log(obj.attributes)
  });
  return 'Success Update Order Room For User';
});

//function find user by name or id
Parse.Cloud.define('findUser', async req => {
  var queryUsername = new Parse.Query('_User');
  if (req.params.username) {
    queryUsername.equalTo('username', req.params.username);
    var result = await queryUsername.first();
  } else {
    var result = await queryUsername.get(req.params.objectId);
  }
  return result;
});


//function find user by name or id
Parse.Cloud.define('deleteUser', async req => {
  var objUser = new Parse.Query('_User');
  if (req.params.username) {
    objUser.equalTo('username', req.params.username);
    var result = await objUser.first();
    result.destroy()  

  } else {
    // var result = await objUser.get(req.params.objectId);
    // objUser.id = req.params.objectId;
    result = await objUser.destroy({ useMasterKey: true });
  }
  return result;
});

Parse.Cloud.define('setUserWithRole', async req => {
  var queryRole = new Parse.Query('_Role');
  var queryUser = new Parse.Query('_User');

  // get obj role by id
  queryRole.equalTo('objectId', req.params.objectId)
  var role_Id = await queryRole.first()

  // console.log('CHECK RoleID',role_Id);
  //check username
  queryUser.equalTo('username', req.params.username);
  //update role for user
  const data = await queryUser.first().then(function (obj) {
    obj.set('role_Id', role_Id);
    obj.save(null, { useMasterKey: true });
    console.log(obj.attributes)
    return obj.attributes
  });
  return data;
});

// Parse.Cloud.define('UserWithRole', async request => {
//   const usersQuery = new Parse.Query(Parse.User);
//   const users = await usersQuery.find({ useMasterKey: true });
//   return await Promise.all(
//     users.map(async user => {
//       const rolesQuery = new Parse.Query(Parse.Role);
//       rolesQuery.equalTo('Guest', user);
//       const roles = await rolesQuery.find({ useMasterKey: true });
//       return {
//         name: user.get('name'),
//         roles,
//         email: user.get('email'),
//       };
//     })
//   );
// });
// -----------------------------------------------------------------------------------------------------------------

// function for login
// Parse.Cloud.define('loginChinh', async req => {
//   var username = req.params.username;
//   var email = req.params.email;
//   var password = req.params.password;
//   // user.save();
//   user.logIn(username, password).then(
//     function (user) {
//       var rs = console.log('Login Success', user /*Parse.User.current()*/);
//       return rs;
//     },
//     function error(err) {
//       var err = console.log('Login Failed !!!');
//       return err;
//     }
//   );
// });

// function check user in DB => login => add role 
// Parse.Cloud.define('login', async request => {
//   // const userQuery = new Parse.Query(user)
//   const username = request.params.username;
//   const password = request.params.password;

//   let userQuery = await Parse.User.logIn(username, password);
//   if (userQuery) {
//     let roleQuery = new Parse.Query(Parse.Role);
//     roleQuery.equalTo('name', 'PublicRead');
//     let role = await roleQuery.first();
//     if (role) role.getUsers().add(userQuery);
//     role.save();
//   }
//   // return role;
// });



// function login can't work
// Parse.Cloud.define('login', async (req, res) => {
//   if (!req.params.username || !req.params.password) res.error('email/password is required');
//   const userQuery = new Parse.Query(Parse.User);
//   const roleQuery = new Parse.Query(Parse.Role);

//       const user = await Parse.User.logIn(req.params.username, req.params.password);
//       const userRoleQuery = user.relation(Parse.Role).query();

//       const role = await userRoleQuery.find();

//       res.success(role)

// });

// Parse.Cloud.define('getUsers', async request => {
//   const queryUser = new Parse.Query(User);
//   const getUsers = await queryUser.get(request.params.objectId, { useMasterKey: true });
//   return getUsers;
// });

// Parse.Cloud.define('listUsers', async request => {
//   const queryUser = new Parse.Query(User);
//   const listUsers = await queryUser.find({ useMasterKey: true });
//   return listUsers;
// });

// Parse.Cloud.define('signup2', async req => {
//   var username = req.params.username;
//   var email = req.params.email;
//   var password = req.params.password;
//   var phone = req.params.phone;

//   if(phone ==  null) throw 'phone not empty!!!'
//   user.set('username', username);
//   user.set('password', password);
//   user.set('email', email);
//   user.set('phone', phone);
//   const saveUser = await user.signUp(null, {useMasterKey: true})
//   return saveUser;
// user.save();
// user.signUp().then(
//   function success(user) {
//     const saveUser = await user.signUp(null, {useMasterKey: true})
//     // var rs = console.log('Signup success', user);
//     return saveUser;
//   },
//   function error(err) {
//     var err = console.log('Error');
//     return err;
//   }
// );
// });

// function add new User
// Parse.Cloud.define('addUser', async req => {
// var query = new Parse.Query('RentHouse');
// query.equalTo('objectId', RentHouse_Id)
// query.first().then(function (objRenthouse) {
// console.log(obj.attributes)
// user.set('RentHouse_Id', objRenthouse);
// var Room_Id = 'E9F8mhcNUt'
// var query = new Parse.Query('Room');
// query.equalTo('objectId', Room_Id)
// query.first().then(function (obj) {
// console.log(obj.attributes)
// user.set('room_Id', obj);
//   user.set('username', req.params.username);
//   user.set('password', req.params.password);
//   user.set('email', req.params.email);
//   user.set('phone', req.params.phone);
//   user.save();
//   // });
//   return 'Succesfully Add User';
// });
