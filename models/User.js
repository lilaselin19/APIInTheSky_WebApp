var fs = require("fs");
var dataJS = require(__dirname +'/googlesheets');
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require(__dirname+'/client_secret.json');
var doc = new GoogleSpreadsheet('1x7OjTW1T54u8R5MM7OZUCTsLJ5r1fVi0b-gd9jt0nxc');

exports.getUser = function(user_id, callback) {
  var user = createBlankUser();
  var all_users = dataJS.loadGoogle(3, function(all_users) {
    console.log(all_users)
    for(var i=0; i<all_users.length; i++){
      if(all_users[i].username==user_id){
        user = all_users[i];
        break;
      }
    }
    callback(user);
  });
  return true;
}

//deletes a user
exports.deleteUser = function(user_id, callback) {
  dataJS.deleteRow(user_id, callback)
}

exports.createUser = function(name, password, callback) {
    var result = true;
    var fb = 0;
    if (name==null||name==""||password==null||password==""){
        result= false;
        fb = 42;
    }
    exports.getUser(name, function(user){
      if (user.name != "notarealuser") {
        result = false;
        fb = 10;
      }

      if (result) {
        var new_obj = {
          "Username": name.trim(),
          "Password": password.trim(),

        }
        dataJS.createRow(new_obj, 1, function(){
          callback(true, fb);
        })
      } else {
          callback(false, fb);
      }
  })
}

//updates the date for a user
exports.updateUser = function(user_id, updates, callback) {
  dataJS.updateRow(2, user_id, updates, function(){
    callback();
  });
}

var createBlankUser= function(){
  var user={
    name:"notarealuser",
    password:"test",
    email: "email"

  };
  return user;
}
