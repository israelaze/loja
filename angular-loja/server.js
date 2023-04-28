const express = require('express');
const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/minha-loja'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/minha-loja'}),
);

// Start the app by listening on the default port
app.listen(process.env.PORT || 3000);
