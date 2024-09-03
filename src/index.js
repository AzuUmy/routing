const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const logger = require('./Logs/Logger');


// message import
const getAllManga = require('./Routes/geAllMangas');
const getTranding = require('./Routes/getTranding');
const getAuthors = require('./Routes/getAuthors');
const getGenres = require('./Routes/getGneres');
const getCovers = require('./Routes/getCovers');

const app = new Koa();


app.use(BodyParser());

app.use(getAllManga.routes()).use(getAllManga.allowedMethods());
app.use(getTranding.routes()).use(getTranding.allowedMethods());
app.use(getAuthors.routes()).use(getAuthors.allowedMethods());
app.use(getGenres.routes()).use(getGenres.allowedMethods());
app.use(getCovers.routes()).use(getCovers.allowedMethods());


const port = process.env.PORT || 3000;
app.listen(port, () => {
   logger.info(`Server is running on port: ${port}`);
});

