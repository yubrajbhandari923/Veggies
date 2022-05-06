const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log(req);

  res.send('Success');
});

app.listen(port, () => {
  console.log(`Server running on http://127.0.0.1:${port}`);
});
