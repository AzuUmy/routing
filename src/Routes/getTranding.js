const Router = require("koa-router");
const axios = require('axios');
const logger = require('../Logs/Logger');
const router = new Router();


router.post('/getTranding', async (ctx) => {
    const message = ctx.request.body;

    if (message && message.action === 'trandingNow') {
        try {
          
            const response = await axios.get('http://app-py:5000/data');
            const trendingData = response.data;

         
            const titles = trendingData.map(item => item.title);

            // Fetch data for each title from your local endpoint
            const results = await Promise.all(
                titles.map(async (title) => {
                    try {
                        const titleResponse = await axios.get('http://app:3000/api/getTrandings', {
                            params: { title }
                        });
                        return titleResponse.data;
                    } catch (err) {
                        logger.error(`Error fetching data for title ${title}`, err);
                        return null;
                    }
                })
            );

            const filteredResults = results.filter(result => result !== null);

            ctx.body = { status: 'Success', data: filteredResults };
            logger.info('Successfully retrieved and aggregated manga data', { data: filteredResults });

        } catch (err) {
            logger.error('Error retrieving trending data', err);
            ctx.body = { error: 'Failed to retrieve tranding data' };
        }
    } else {
        ctx.body = { error: 'Invalid action or missing data' };
    }
});

module.exports = router;