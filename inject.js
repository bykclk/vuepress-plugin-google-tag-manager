import GtmPlugin from './GtmPlugin'

export default ({router, Vue}) => {
    // Better browser environment detection
    const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    
    if (process.env.NODE_ENV === 'production' && GTM_ID && isBrowser) {
        try {
            // Load GTM script
            (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({
                    'gtm.start': new Date().getTime(), 
                    event: 'gtm.js'
                });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s), 
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                
                // Add error handling for script loading
                j.onerror = function() {
                    console.warn('[vuepress-plugin-google-tag-manager] Failed to load GTM script');
                };
                
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', GTM_ID);

            // Add noscript fallback to head
            const noscript = document.createElement('noscript');
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`;
            iframe.height = '0';
            iframe.width = '0';
            iframe.style.display = 'none';
            iframe.style.visibility = 'hidden';
            noscript.appendChild(iframe);
            document.head.appendChild(noscript);

            Vue.prototype.$gtm = Vue.gtm = new GtmPlugin();

            // Store the route handler for potential cleanup
            const routeHandler = function (to) {
                try {
                    Vue.prototype.$gtm.trackView(to.name, to.fullPath);
                } catch (error) {
                    console.warn('[vuepress-plugin-google-tag-manager] Error tracking page view:', error);
                }
            };
            
            router.afterEach(routeHandler);
            
        } catch (error) {
            console.warn('[vuepress-plugin-google-tag-manager] Error initializing GTM:', error);
        }
    }
}
