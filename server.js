const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require('./app/models');
const Role = db.role;

db.mongoose.connect("mongodb+srv://sc2002:subha200241@cluster0.kggwdqk.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,    
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

app.listen(process.env.PORT || 8080, () => {
    console.log('Server started');
})