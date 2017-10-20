const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config.json');
const userController = require('./moudles/users/usersController')
let app = express();

mongoose.connect(config.connectionString, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connect success');
    }
});

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true}));



// app.use('/', homeRouter);
 app.use('/user', userController);
// app.use('/api', apiRouter);

app.use(express.static(__dirname + '/public'));
// app.use('')
const port = process.env.PORT || config.port;

app.listen(port, () => {
    console.log('Server is ready at port' + port);
});
