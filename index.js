const path = require('path');

module.exports = (options = {}, context) => ({
    define() {
        const {siteConfig = {}} = context;
        const gtm = options.gtm || siteConfig.gtm;
        
        // Validate GTM ID format (GTM-XXXXXXX)
        let GTM_ID = false;
        if (gtm && typeof gtm === 'string') {
            if (/^GTM-[A-Z0-9]+$/.test(gtm)) {
                GTM_ID = gtm;
            } else {
                console.warn(`[vuepress-plugin-google-tag-manager] Invalid GTM ID format: ${gtm}. Expected format: GTM-XXXXXXX`);
            }
        }
        
        return {GTM_ID}
    },


    enhanceAppFiles: [
        path.resolve(__dirname, 'inject.js')
    ],
});