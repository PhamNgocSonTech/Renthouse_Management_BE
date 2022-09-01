const User = Parse.Object.extend('_User');
const user = new Parse.User();

Parse.Cloud.define('authorizedUserTest', function (request, response) {
  if (!request.params.username) {
    //response.error('no username');
    response.error(request.params);
  }

  var queryRole = new Parse.Query(Parse.Role);
  queryRole.equalTo('name', 'Admin');

  queryRole.first({ useMasterKey: true }).then(
    function (promise) {
      var role = promise;
      var relation = new Parse.Relation(role, 'users');
      var admins = relation.query();
      admins.equalTo('username', request.user.get('username'));
      admins.first({ useMasterKey: true }).then(
        function (user) {
          if (user) {
            response.success(true);
          } else {
            response.success(false);
          }
        },
        function (err) {
          response.error('User is not an admin');
        }
      );
    },
    function (err) {
      response.error(err);
    }
  );
});

Parse.Cloud.define('createRole', async req => {
  var groupaACL = new Parse.ACL();
  var userCurrent = Parse.User.current();
  var queryUser = new User();
  var getUserId = await queryUser.get(req.params.objectId);
  // var getUsername = await queryUser.get(req.params.username);
  roleALC.setPublicReadAccess(true);
  roleALC.setPublicWriteAccess(true);
  var role = new Parse.Role('Admin', roleALC);
  role.getUsers().add(getUserId);
  role.save();
  return 'ok';
  // role.save().then(function () {
  //   role.save().then(function () {
  //     console.log('Role Create ', role.id);
  //   });
  // });
});

// function test create role
Parse.Cloud.define('createRoleForUserCurrent', async req => {
  var roleALC = new Parse.ACL();
  var userCurrent = Parse.User.current();
  roleALC.setPublicReadAccess(true);
  roleALC.setWriteAccess(Parse.User.current(), true);
  var role = new Parse.Role('Admin', roleALC);
  role.save().then(function () {
    role.getUsers().add(Parse.User.current());
    role.save().then(function () {
      return 'ok';
    });
  });
});

Parse.Cloud.define('UserWithRole', async request => {
  const usersQuery = new Parse.Query(Parse.User);
  const users = await usersQuery.find({ useMasterKey: true });
  return await Promise.all(
    users.map(async user => {
      const rolesQuery = new Parse.Query(Parse.Role);
      rolesQuery.equalTo('Guest', user);
      const roles = await rolesQuery.find({ useMasterKey: true });
      return {
        name: user.get('name'),
        roles,
        email: user.get('email'),
      };
    })
  );
});

Parse.Cloud.define('getRole', async request => {
  const query = await new Parse.Query(Parse.Role).equalTo('users', request.user).find();
  return query;
});

Parse.Cloud.define('addRole', async request => {
  const roleName = request.params.roleName;
  const userQuery = new Parse.Query(User);
  if (userQuery) {
    const myACL = new Parse.ACL();
    myACL.setPublicReadAccess(true);
    myACL.setPublicWriteAccess(false);
    const myRole = new Parse.Role(roleName, myACL);
    myRole.save();
  }
});

// function test role, not important
Parse.Cloud.define('testRole', async request => {
  // const userQuery = new Parse.Query(User);
  const username = request.params.username;
  const password = request.params.password;

  let userQuery = await Parse.User.logIn('xyz', '4321');
  if (userQuery) {
    let Room = Parse.Object.extend('Room');
    // let publicRoom = new Room()
    // let privateRoom = new Room()
    // publicRoom.set('content','this is public room, everyone can access')
    // privateRoom.set('content','this is private room, XYZ only can access')
    // privateRoom.setACL(new Parse.ACL(userQuery))
    // await publicRoom.save()
    // await privateRoom.save()

    let privateRoom = new Room();
    privateRoom.set('content', 'this is private room, XYZ only can access');
    let myACL = new Parse.ACL();
    myACL.setPublicReadAccess(true);
    myACL.setPublicWriteAccess(false);

    privateRoom.setACL(myACL);
    await privateRoom.save();

    // const myACL = new Parse.ACL();
    // myACL.setPublicReadAccess(true);
    // myACL.setPublicWriteAccess(false);
    // const myRole = new Parse.Role('Guest', myACL);
    // myRole.save();
  }
});

Parse.Cloud.define('saveRole', async request => {
  let roleName = request.params.isAdmin;
  const query = await new Parse.Query(Parse.Role).equalTo('username', request.user).find({ useMasterKey: true });
  let role = await query[0];
  var groupACL = new Parse.ACL();
  groupACL.setRoleWriteAccess(role, false);
  groupACL.setRoleReadAccess(role, true);
  let TestRole = Parse.Object.extend('TestRole'); 
  let testRole = new TestRole();
  testRole.set('groupOwner', role.get('name'));
  // testRole.set('isAdmin', roleName);
  testRole.setACL(groupACL);
  return await testRole.save(null, { useMasterKey: true });
});

Parse.Cloud.define('ccGetColors', async request => {
  const roleQuery = await new Parse.Query(Parse.Role)
    .equalTo('users', request.user)
    .find({ useMasterKey: true });
  let role = await roleQuery[0];
  let query = new Parse.Query('Color');
  query.equalTo('groupOwner', role.get('name'));
  let results = await query.find({ useMasterKey: true });
  if (results.length === 0) throw new Error('No results found!');
  let steralizedResults = [];
  for (let i = 0; i < results.length; i++) {
    let object = results[i];
    let color = object.get('color');
    steralizedResults.push(color);
  }
  return steralizedResults;
});

Parse.Cloud.define('setPointerRole', async request => {
  // First create a pointer to the object of yourClassName
  var UserClass = Parse.Object.extend('_User');
  var userPointer = new UserClass();
  userPointer.id = 'qa90lrEvgX';

  // Now you can add the pointer to the relation
  var query = new Parse.Query(Parse.Role);
  query.equalTo('name', 'Admin');
  query.first({
    success: function (object) {
      object.set('users', userPointer);
      // object.relation('users').add(userPointer);
      object.save();
    },
  });
});
