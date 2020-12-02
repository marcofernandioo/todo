const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const tasksRouter = require('./routes/tasks');
const accountsRouter = require('./routes/accounts');
const membersRouter = require('./routes/members');
const teamsRouter = require('./routes/team');
var session = require('express-session');
const dotenv = require('dotenv');
const app = express();
app.use(cors());
dotenv.config();

const port = process.env.PORT;
app.use(express.json());

app.use(session({
  secret: 'secretSession', 
  resave: false, 
  saveUninitialized: true
}))


mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to DB yow.'))

app.use('/tasks', tasksRouter);
app.use('/accounts', accountsRouter);
app.use('/members', membersRouter)
app.use('/teams', teamsRouter);

app.listen(port, () => {
  console.log(`We Server Runnin' on Port ${port}`)
})
