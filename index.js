require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const urls = [];
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post('/api/shorturl', (req, res) => {
  let url_ori = req.body.url;
  let url_short;

  console.log(url_ori);

  
  let urlPattern = /^(https?:\/\/)(localhost(:\d+)?|[\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/;
  if (!urlPattern.test(url_ori)) {
    console.log("invalid")
    return res.json({ error: 'invalid url' });
  }
  else{
    if(!urls.includes(url_ori )){
      urls.push(url_ori );
      url_short = urls.length;
    }
    else{
      url_short = urls.indexOf(url_ori) +  1;
    }
    console.log(url_ori);
    res.json({original_url: url_ori, short_url: url_short});
    res.send();
  }
});

app.get('/api/shorturl/:number', (req, res) => {
  let number = req.params.number;
  if(urls.length >= number && number > 0){
    res.redirect(urls[number - 1]);
  }
})
