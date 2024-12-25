const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const notesRouter = require('./routers/notesManagement');
require('./mongoose/connection'); // MongoDB Connection

const app = express();
const PORT = 8001;

app.use(cors());

// Alternatively, configure CORS for specific origins
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allowed methods
  credentials: true, // If using cookies or authentication
}));

app.use(bodyParser.json());
app.use('/api', notesRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
