const Router = require('koa-router');
const axios = require('axios');
const logger = require('../Logs/Logger');
const router = new Router();

router.post('/getAuthors', async(ctx) => {
    const message = ctx.request.body;

    if(message && message.action === 'getAuthors') {
        try{
            const response = await axios.get('http://app:3000/api/getAuthors');
            ctx.body = { status: 'Success', data: response.data };
            logger.info('Retrieving manga data successfully', { data: response.data });
        } catch(err) {
            logger.error('Error retriving body', err);
            ctx.body = { error: 'Failed to retrieve authors data' };
        }
    }
});

module.exports = router;