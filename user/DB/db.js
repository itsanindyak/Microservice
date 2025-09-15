import mongoose  from "mongoose";

function connect(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB", err);
    })
}
export default connect;