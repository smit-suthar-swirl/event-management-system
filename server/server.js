const app = require('./app');
const mongoose = require('mongoose');
require("dotenv").config()
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Mongodb connected");
})

app.get("/test",(req,res) => {
    res.send("Working")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
