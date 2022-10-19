const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Mongoose Connected")
    }).catch((error: any) => {
        console.log(error)
    })
}

module.exports = connectDatabase