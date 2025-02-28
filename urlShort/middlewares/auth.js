const { getUser } = require('../service/auth');
console.log("Middleware initialized"); // Added log for middleware initialization

console.log("Middleware initialized"); // Added log for middleware initialization

console.log("Middleware initialized"); // Added log for middleware initialization


async function restrictToLoggedinUserOnly(req, res, next){
    const userUid = req.cookies?.uid; 
    console.log("User ID from cookies: ", userUid); // Added log for user ID

   

    if(!userUid) return res.redirect("/login");
   // console.log("User ID from cookies: ", userUid); // Added log for user ID
    const user = getUser(userUid); 
    console.log("Token being verified: ", userUid); // Log the token being verified
    console.log("User found: ", user); // Added log for user found

    console.log("Token being verified: ", userUid); // Log the token being verified
    console.log("User found: ", user); // Added log for user found

    console.log("Token being verified: ", userUid); // Log the token being verified
    console.log("User found: ", user); // Added log for user found

    console.log("User found: ", user); // Added log for user found


    if(!user) return res.redirect("/login");

    req.user = user;

    next();
}
module.exports = {
    restrictToLoggedinUserOnly,
};
