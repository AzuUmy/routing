const Router = require('koa-router');
const axios = require('axios');
const logger = require('../Logs/Logger');
const router = new Router();

router.post('/handleGetAllMangas', async (ctx) => {
   const message = ctx.request.body;


   if(message && message.action === 'getAllManga') {
      try {
         const response = await axios.get('http://app:3000/api/getMangas');
         ctx.body = { status: 'Success', data: response.data };
         logger.info('Retrieving manga data successfully', { data: response.data });
      } catch (err) {
         logger.error('Error retriving body', err);
         ctx.body = { error: 'Failed to retrieve manga data' };
      }
   }

});

module.exports = router;