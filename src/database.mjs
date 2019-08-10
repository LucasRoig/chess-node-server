import mongoose from "mongoose";
import config from "./config";

let db = mongoose.connection;
let dbPromise = new Promise(function (resolve, reject) {
    db.on('error', err => {
        console.error("MongoDb connection error:", err);
        reject();
    });
    db.on('open', () => {
        console.log("MongoDB successfully connected");
        resolve();
    });
});
// db.on('error', console.error.bind(console, 'MongoDb connection error:'));
// db.on('open', () => console.log("MongoDB successfully connected"));
mongoose.connect(config.database, {useNewUrlParser: true});

export {
    dbPromise
}