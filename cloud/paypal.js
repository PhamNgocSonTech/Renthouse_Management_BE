const Bill = Parse.Object.extend('Bill');

Parse.Cloud.define('payment', req => {
    var bill = new Parse.Query('Bill');
    bill.equalTo('objectId', req.params.objectId);
    const paid = bill.first().then(function(obj) {
      obj.set('isPaid', true);
      obj.save();
    });
  
    console.log('checking', paid);
  
    return paid;
  });

  Parse.Cloud.define('PAYPAL', (req, res) => {
    const arr = [];
    var client_Id = 'AaCSy0DbFkyV9Sq1WgPZEwbk_O8RMo49-2s-SNOmyrHonODbz-kY7YR-F53I5RnGNlMcNkBmLLbZmux3';
    arr.push(client_Id);
    return arr;
  });