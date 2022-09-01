
// function add new Renter
Parse.Cloud.define('#', async req => {
    var User_Id = 'c7ZGwgVcIA';
    var RentHouse_Id = 'aJmZEBKItV';
    var queryUser = new Parse.Query('_User');
    var queryRentHouse = new Parse.Query('RentHouse');
    queryUser.equalTo('objectId', User_Id);
    queryRentHouse.equalTo('objectId', RentHouse_Id);
    queryUser.first().then(function (objectUser) {
      renter.set('User_Id', objectUser);
      renter.set('FullName', req.params.fullname);
      renter.set('Address', req.params.address);
      renter.set('Phone', req.params.phone);
      renter.set('email', req.params.email);
      renter.save();
    });
    queryRentHouse.first().then(function (objectRentHouse) {
      renter.set('RentHouse_Id', objectRentHouse);
      renter.save();
    });
    return 'ok';
    // let result = await renter.save();
    // return result;
  
    // ------------------------------------------------------------------------------------
  
    // ------------------------------------------------------------------------------------
    // user.save(null,{
    //   success: function(){
    //     const Customer = Parse.Object.extend('Customer');
    //     const customer = new Customer();
    //     customer.set('FullName', req.params.fullname);
    //     customer.set('Address', req.params.address);
    //     customer.set('Phone', req.params.phone);
    //     // customer.set('User', user);
    //     customer.save(null, {
    //       success: function(){
    //         const customers = user.relation("customers");
    //         customers.add(customer)
    //         user.save();
    //       }
    //     })
    //   }})
  });