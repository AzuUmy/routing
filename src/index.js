const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const logger = require('./Logs/Logger');


// message import
const getAllManga = require('./Routes/geAllMangas')


const app = new Koa();


app.use(BodyParser());

app.use(getAllManga.routes()).use(getAllManga.allowedMethods());


const port = process.env.PORT || 3000;
app.listen(port, () => {
   logger.info(`Server is running on port: ${port}`);
});

