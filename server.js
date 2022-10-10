const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// const corsOption = {
//     origin: "https://localhost:8081"
// }

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require('./app/models');
const Role = db.role;

db.mongoose.connect(`mongodb+srv://subha41:subha41@cluster1.30i1syi.mongodb.net/flipr_db`, {
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected");
    initial();
}).catch(err => {
    console.log("Connection error: ", err);
})

const initial = () => {
    console.log("something");
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }
                console.log("Added Admin Role");
            })

            new Role({
                name: "employee"
            }).save(err => {
                if (err) {
                    console.log(err);
                }
                console.log("Added Employee Role");
            })
        }
    })
    
}

app.get("/", (req, res) => {
    res.json({hi: "Hi"});
})

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/task.routes')(app);

app.listen(8080, () => {
    console.log('Server started');
})