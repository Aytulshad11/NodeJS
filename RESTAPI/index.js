const express = require("express");
// const users = require("./MOCK_DATA.json");
const app = express();
const fs = require("fs");
const mongoose = require("mongoose");

const PORT = 8000;

//connect to mongodb
mongoose
    .connect("mongodb://127.0.0.1:27017/youTube-app-1")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB", err));

//schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
    
}, {timestamps: true});

//model
const User = mongoose.model("User", userSchema);

//middleware - plugin
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // Add this middleware to parse JSON bodies

app.use((req, res, next) => {
    console.log(`Received ${req.method} request at ${req.url}`);
    next();
});

app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    res.json(allDbUsers);
});

app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})



app.post('api/users', (req, res) => {
     return res.json({status: "pending"});
});

app
    .route('/api/users/:id')
    .get( async(req, res) => {
        // const id = Number(req.params.id);
        // const user = users.find((user) => user.id === id);
        const user = await User.findById(req.params.id);
        return res.json(user);
    })
    .patch( async(req, res) => {
        await User.findByIdAndUpdate(req.params.id, {last_name: "changed"});
        return res.json({status: "Successfully updated last name"});
    })
    
    .delete( async(req, res) => {
        await User.findByIdAndDelete(req.params.id);
        return res.json({status: "Successfully deleted user"});
    });

// app.patch('/api/users/:id', (req, res) => {
//         const id = Number(req.params.id);
//         console.log("Received ID:", id); // Debugging

       
//         const userIndex = users.findIndex((user) => user.id === id);
        
//         users[userIndex] = {...users[userIndex], ...req.body};
//         fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
//             if (err) return res.status(500).json({ error: "Failed to update user" });
//             return res.json({ status: "success", user: users[userIndex] });
//         });
//        // res.json({status: "Pending"});
//     });

app.post('/api/users/', async (req, res) => {
    //TODO : create a new user
    const body = req.body;
    console.log("body", body);
    if(!body || 
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ){
        return res.status(400).json({error: "All fields are required"});
    }
    const user = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    console.log("user:", user);
    return res.status(201).json({msg: "Successfully created user"});
    // users.push({...body, id: users.length + 1});
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    // return res.json({status: "success", id: users.length + 1});
    // });
});

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    console.log("Received ID:", id);
    const userIndex = users.findIndex(user => user.id === id);
    console.log("userIndex", userIndex);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    const deletedUser = users[userIndex]; // Remove user from array
    users.splice(userIndex, 1);

    // Save updated data to MOCK_DATA.json
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) return res.status(500).json({ error: "Failed to delete user" });
        return res.json({ 
            status: "success", 
            message: "User deleted successfully",
            deletedUser: deletedUser 
        });
    });
});


app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));