const categories = new Parse.Object('Categories');
const Categories = Parse.Object.extend('Categories');
const Room = Parse.Object.extend('Room');
const rentHouse = new Parse.Object('RentHouse');
const RentHouse = Parse.Object.extend('RentHouse');

// function add new Categories
Parse.Cloud.define('addCategories', async req => {
  // create categories
  const categoryObj = new Categories();
  categoryObj.set('type', req.params.type);
  const result = await categoryObj.save(null, { useMasterkey: true });
  return result;
});

// function Set Categories_ID for RentHouse
Parse.Cloud.define('relationCateID', async req => {
  var queryCate = new Parse.Query('Categories');
  var queryRentHouse = new Parse.Query('RentHouse');
  // get obj RentHouse_Id
  var cateObj = await queryCate.get(req.params.objectId);
  //check name room exists
  queryRentHouse.equalTo('nameRentHouse', req.params.nameRentHouse);
  await queryRentHouse.first().then(function (obj) {
    // set RentHouse_Id for Room object
    obj.set('category_Id', cateObj);
    obj.save(null, { useMasterKey: true });
    console.log(obj.attributes);
  });
  return 'Success Categories_ID for RentHouse';
});

// function find category by ID or Name
Parse.Cloud.define('findCate', async req => {
  var cateObj = new Parse.Query('Categories');
  if (req.params.type) {
    cateObj.equalTo('type', req.params.type);
    var obj = await cateObj.first();
  } else {
    var obj = await cateObj.get(req.params.objectId);
  }
  return obj;
});

// function update category by ID
Parse.Cloud.define('updateCateByID', async req => {
  const cateObj = new Categories();
  cateObj.id = req.params.objectId;
  cateObj.set('type', req.params.type);
  const saveCate = await cateObj.save(null, { useMasterKey: true });
  return saveCate;
});
