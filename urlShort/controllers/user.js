const {v4: uuidv4}  = require("uuid");

const User = require ("../models/user");

async function handleUserSignup(req, res){
    console.log("request received to signup: ", req);
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect("/");
}

async function handleUserLogin(req, res){
    console.log("request received to login: ", req);
    const { email, password } = req.body;
    console.log("User data being processed: ", { email, password }); // Log user data

    const user = await User.findOne({ email, password });
    console.log("User found: ", user); // Log the user found

    if (!user) {
        console.log("Invalid username or password");
        return res.render('login', {
            error: "Invalid Username or password"
        });
    }

    const sessionId = uuidv4(); // Generate a session ID
    console.log("Generated session ID: ", sessionId); // Log the session ID

    res.cookie("uid", sessionId, { httpOnly: true, secure: false, sameSite: 'Lax' }); // Set the session ID in the cookie with options

    console.log("Session ID set in cookie: ", sessionId); // Log the session ID set in cookie

    return res.redirect("/"); // Redirect to home
}
module.exports = {
    handleUserSignup,
    handleUserLogin
};
