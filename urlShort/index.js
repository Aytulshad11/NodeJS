const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const path = require('path');
const staticRoute = require('./routes/staticRoueter');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", staticRoute);
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
const PORT = 8000;
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(() => console.log("MongoDB connected!"))
app.use("/url", urlRoute);

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
