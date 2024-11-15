const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Routes

//REST APIs 
app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`)}
    </ul>
    `;
    res.send(html);
});

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

app
    .route('/api/users/:id')
    .get('/api/users/:id', (req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .put((req, res) => {
        res.json({status: "Pending"});
    })
    .delete((req, res) => {});


app.post('/api/users/:id', (req, res) => {
    //TODO : create a new user
    return res.json({status: "pending"});
});

app.patch('/api/users/:id', (req, res) => {
    //TOD: edit the user
    return res.json({status: "pending"});
});

app.delete('/api/users/:id', (req, res) => {
    //TOD: delete the user
    return res.json({status: "pending"});
});
app.listen(PORT, () => console.log(`Server started at Port:${PORT} `));

