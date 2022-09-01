  
  // 1:1 relation, need to check for uniqueness of value before creating a new ISBD object
  // let userQuery = new Parse.Query('_User');
  // userQuery.equalTo('email', req.params.email);
  // let isUserQueryResult = await userQuery.first();
  // if (isUserQueryResult !== null && isUserQueryResult !== undefined) {
  //   // If first returns a valid object instance, it means that there
  //   // is at least one instance of ISBD with the informed value
  //   Alert.alert(
  //     'Error!',
  //     'There is already an email instance with this value!',
  //   );
  //   return false;
  // } else {
  //   // Create a new email object instance to create a one-to-one relation on saving
  //   // let ISBD = new Parse.Object('ISBD');
  //   ISBD.set('name', bookISBDValue);
  //   customer = await ISBD.save();
  //   // Set the new object to the new customer object email field
  //   Book.set('isbd', ISBD);
  // }