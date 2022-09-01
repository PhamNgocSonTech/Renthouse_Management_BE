const room = Parse.Object.extend('Room');
const User = Parse.Object.extend('_User');
const Role = Parse.Object.extend('_Role');
const user = new Parse.User();


Parse.Cloud.define('signuprole', async req => {
  // const bill = new Bill();
  const username = req.params.username;
  const email = req.params.email;
  const password = req.params.password;
  const phone = req.params.phone;

  // const role_Id = req.params.role_Id;
  const role_Id = 'MGDVmiFFW9';

  var queryRole = new Parse.Query('_Role');
  //query
  queryRole.equalTo('objectId', role_Id);
  queryRole.first().then(function (obj) {
    // console.log(obj.attributes);

    user.set('username', username);
    user.set('password', password);
    user.set('email', email);
    user.set('phone', phone);
    user.set('role_Id', obj);
    user.signUp();
  });
  return 'Created order successfully!!';
});

// function add new User
Parse.Cloud.define('signup', async req => {
  const username = req.params.username;
  const email = req.params.email;
  const password = req.params.password;
  const phone = req.params.phone;

  user.set('username', username);
  user.set('password', password);
  user.set('email', email);
  user.set('phone', phone);
  // user.set('isAdmin', false);
  const result = await user.signUp();
  return result;


  // const saveUser = user.signUp().then(function (user) {
    //   if(user.get('username') == username){
    //     return 'Already logged in with username: ' + user.get('username')
    //   }else{
    //     console.log('User signup successful with name: ' + user.get('username') + ' and email: ' + user.get('email'));
    //     return saveUser
    //   }
    // })
    // .catch(function (error) {
    //   var showErr = console.log('Error: ' + error.code + ' ' + error.message);
    //   return showErr
    // });
  // return saveUser;

  //   const myACL = new Parse.ACL()
  //   myACL.setPublicReadAccess(true)
  //   myACL.setPublicWriteAccess(false)
  //   const myRole = new Parse.Role('PublicRead', myACL)
  //   myRole.save()

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
});

// function for simple login
Parse.Cloud.define('login', async req => {
  var username = req.params.username;
  var password = req.params.password;
  let userQuery = await Parse.User.logIn(username, password);
  return userQuery;
  // console.log(Parse.User.current())
});

Parse.Cloud.define('loginWithMail', async req => {
  var email = req.params.email;
  var password = req.params.password;
  let userQuery = await Parse.User.logIn(email, password);
  return userQuery;
  // console.log(Parse.User.current())
});


Parse.Cloud.define('resetPass', async req => {
  var email = req.params.email;

  Parse.User.requestPasswordReset(email).then(function() {
    console.log("Password reset request was sent successfully");
  }).catch(function(error) {
    console.log("The login failed with error: " + error.code + " " + error.message);
  });
});

// error function
Parse.Cloud.define('newLogin', async req => {
  var username = req.params.username;
  var password = req.params.password;
  Parse.User.logIn(username, password);
  // console.log(Parse.User.current())
  try {
    const user = await User.findById(username);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.authenticate(password)) {
      throw new Error('Password is incorrect');
    }
  } catch (err) {
    console.log(err);
  }
});

// function check user in DB => login => add role
Parse.Cloud.define('loginWithRole', async request => {
  // const userQuery = new Parse.Query(user)
  const username = request.params.username;
  const password = request.params.password;

  let userQuery = await Parse.User.logIn(username, password);
  if (userQuery) {
    //   //     const myACL = new Parse.ACL()
    //   //     myACL.setPublicReadAccess(true)
    //   //     myACL.setPublicWriteAccess(true)
    //   //     const myRole = new Parse.Role('PublicRead', myACL)
    //   //     myRole.save()
    let roleQuery = new Parse.Query(Parse.Role);
    roleQuery.equalTo('name', 'Guest');
    let role = await roleQuery.first();
    if (role) {
      role.getUsers().add(userQuery);
      role.save();
    }
    return 'Login Success';
  }
  return role;
});

//function other login
Parse.Cloud.define('loginOther', async req => {
  // const queryUser = await
  var groupaACL = new Parse.ACL();
  var userCurrent = Parse.User.current();
  var queryUser = new User();

  groupaACL.setWriteAccess(userCurrent, true);
  groupaACL.setReadAccess(userCurrent, true);
  queryUser.setACL(groupaACL);
  queryUser.set('isAdmin', true);
  queryUser.save();
});

//  Parse.User.logIn('son', '123').then('loginOther')

// function for simple login
Parse.Cloud.define('loginChinh', async req => {
  var username = req.params.username;
  var email = req.params.email;
  var password = req.params.password;
  // user.save();
  user.logIn(username, password).then(
    function (user) {
      var rs = console.log('Login Success', user /*Parse.User.current()*/);
      return rs;
    },
    function error(err) {
      var err = console.log('Login Failed !!!');
      return err;
    }
  );
});
