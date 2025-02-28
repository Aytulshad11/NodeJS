const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectToMongoDB } = require("./connect");
const {restrictToLoggedinUserOnly} = require('./middlewares/auth');

const URL = require("./models/url");



const urlRoute = require("./routes/url");
const staticRoute = require('./routes/staticRoueter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("MongoDB connected!"))


app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.use("/url", restrictToLoggedinUserOnly ,urlRoute);
app.use("/user", userRoute);
app.use("/", restrictToLoggedinUserOnly, staticRoute);



app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),}
        }
    }
);
// if (!entry) {
//     return res.status(404).json({ error: "Short URL not found" });
// }
    res.redirect(entry.redirectURL);
})





app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
