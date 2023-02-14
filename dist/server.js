"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// In-memory storage of users
var users = [];
app.get('/', function (req, res) {
    return res.status(201).json("Welcome");
});
// Route to add a new user
app.post('/users', function (req, res) {
    var _a = req.body, id = _a.id, name = _a.name, email = _a.email, dob = _a.dob;
    if (!name || !email) {
        return res.status(400).send('Name and email are required.');
    }
    var newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        dob: dob
    };
    users.push(newUser);
    return res.status(201).json(newUser);
});
// Route to get all users
app.get('/users', function (req, res) {
    return res.json(users);
});
// Route to get a specific user
app.get('/users/:id', function (req, res) {
    var id = Number(req.params.id);
    var user = users.find(function (u) { return u.id === id; });
    if (!user) {
        return res.status(404).send('User not found.');
    }
    return res.json(user);
});
// Route to update a specific user
app.put('/users/:id', function (req, res) {
    var id = Number(req.params.id);
    var userIndex = users.findIndex(function (u) { return u.id === id; });
    if (userIndex === -1) {
        return res.status(404).send('User not found.');
    }
    var _a = req.body, name = _a.name, email = _a.email, dob = _a.dob;
    if (!name || !email) {
        return res.status(400).send('Name and email are required.');
    }
    var updatedUser = {
        id: id,
        name: name,
        email: email,
        dob: dob
    };
    users[userIndex] = updatedUser;
    return res.json(updatedUser);
});
// Route to delete a specific user
app.delete('/users/:id', function (req, res) {
    var id = Number(req.params.id);
    var userIndex = users.findIndex(function (u) { return u.id === id; });
    if (userIndex === -1) {
        return res.status(404).send('User not found.');
    }
    users.splice(userIndex, 1);
    return res.sendStatus(204);
});
// Start the server
var port = 3000;
app.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
//# sourceMappingURL=server.js.map