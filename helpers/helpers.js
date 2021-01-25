var db = require("../config/connection");
var collection = require("../config/collection");

module.exports = {
  addUsers(users) {
    var users = {
      name: users.name,
      location: users.location,
    };
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USERS_COLLECTION)
        .insertOne(users)
        .then((response) => {
          resolve();
        });
    });
  },
  getUsers() {
    return new Promise(async (resolve, reject) => {
      let users = await db
        .get()
        .collection(collection.USERS_COLLECTION)
        .find()
        .toArray();
      resolve(users);
    });
  },
  findUser(data){
  return new Promise(async(resolve,reject)=>{
      let result=await db.get().collection(collection.USERS_COLLECTION).find({name:{$regex:data}}).toArray()
      resolve(result)
  })
}
};
