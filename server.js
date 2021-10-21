const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const notesRouter = require('./routes/notes')
app.use('/api/notes', notesRouter)

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT,()=>{
    console.log(`listening at http://localhost:${PORT} 🚀`)
})