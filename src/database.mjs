import mongoose from "mongoose";
import config from "./config";

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb connection error:'));
db.on('open', () => console.log("MongoDB successfully connected"));
mongoose.connect(config.database, {useNewUrlParser: true});
