const mongoose=require('mongoose')

const userSchema = new mongoose.Schema({
    email: {type:String, unique:true},
    password: {type:String},
  }, {timestamps: true});
  
const User = mongoose.model('Use', userSchema);
export default User;