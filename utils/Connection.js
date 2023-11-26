const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const Db_Connnection = async () => {
    try{
        await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
        console.log("Connected to database");
    }catch(err){
        console.log(`error connecting to database ${process.env.DB_NAME}...\n${err}`);
        process.exit(1)
    }
}

module.exports = Db_Connnection