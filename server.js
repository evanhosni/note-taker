const express = require('express');
const path = require('path');
// const api = require('./')
const app = express();
const PORT = process.env.PORT || 3000;
// const notesRouter = require('./routes/notes.js')

app.use(express.static("public"))//this fixed css issue
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// app.use('/api', api);

const notesRouter = require('./routes/notes')
app.use('/api/notes', notesRouter)

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// app.get('/api/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, '/db/db.json'))
// );

app.listen(PORT,()=>{
    console.log(`listening at http://localhost:${PORT} 🚀`)
})