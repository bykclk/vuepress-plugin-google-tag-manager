export default class GtmPlugin {
    trackView(screenName, path) {
        try {
            // Validate inputs
            if (!path && !screenName) {
                console.warn('[vuepress-plugin-google-tag-manager] trackView requires at least screenName or path');
                return;
            }
            
            let dataLayer = (window.dataLayer = window.dataLayer || []);
            dataLayer.push({
                event: 'content-view',
                'content-name': path,
                'screen-name': screenName || path
            });
        } catch (error) {
            console.warn('[vuepress-plugin-google-tag-manager] Error in trackView:', error);
        }
    }

    trackEvent({
                   event = null,
                   category = null,
                   action = null,
                   label = null,
                   value = null,
                   noninteraction = false,
                   ...rest
               } = {}) {
        try {
            // Validate required parameters
            if (!category && !action) {
                console.warn('[vuepress-plugin-google-tag-manager] trackEvent requires at least category or action');
                return;
            }
            
            let dataLayer = (window.dataLayer = window.dataLayer || []);
            dataLayer.push({
                event: event || 'interaction',
                target: category,
                action: action,
                'target-properties': label,
                value: value,
                'interaction-type': noninteraction,
                ...rest
            });
        } catch (error) {
            console.warn('[vuepress-plugin-google-tag-manager] Error in trackEvent:', error);
        }
    }
}
