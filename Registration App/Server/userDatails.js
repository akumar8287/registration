const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
    {
  name: String,
  username: String,
  email: { type: String, unique: true },  
  mobileNo: String,
  locality: String,
  password: String,
  userType: String,
},
{
    collection: "UserInfo",
}
);

mongoose.model("UserInfo", UserDetailsSchema);