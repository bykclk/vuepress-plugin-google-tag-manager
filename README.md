# vuepress-plugin-google-tag-manager

> vuepress-plugin-google-tag-manager plugin for vuepress

## Install

```
npm i vuepress-plugin-google-tag-manager --save
```
or
```
yarn add vuepress-plugin-google-tag-manager
```

## Configuration

```javascript
module.exports = {
  plugins: ['vuepress-plugin-google-tag-manager'] 
}
```

## Options

### gtm

- Type: `string`
- Default: `undefined`

Provide the Google Tag Manager ID to enable integration. Must follow the format `GTM-XXXXXXX`.

```javascript
module.exports = {
  plugins: [
    ['vuepress-plugin-google-tag-manager', {
      gtm: 'GTM-XXXXXXX'
    }]
  ] 
}
```

## Documentation

Once the configuration is completed, you can access vue gtm instance in your components like that :

```javascript
export default {
  name: 'MyComponent',
  data() {
    return {
      someData: false
    };
  },
  methods: {
    onClick: function() {
      this.$gtm.trackEvent({
        event: null, // Event type [default = 'interaction'] (Optional)
        category: 'Calculator',
        action: 'click',
        label: 'Home page SIP calculator',
        value: 5000,
        noninteraction: false // Optional
      });
    }
  },
  mounted() {
    this.$gtm.trackView('MyScreenName', 'currentpath');
  }
};
```

The passed variables are mapped with GTM data layer as follows

```javascript
dataLayer.push({
	'event': event || 'interaction',
	'target': category,
	'action': action,
	'target-properties': label,
	'value': value,
	'interaction-type': noninteraction,
	...rest
});
```

For page views:
```javascript
dataLayer.push({
	'event': 'content-view',
	'content-name': path,
	'screen-name': screenName || path
});
```

## Error Handling

The plugin includes built-in error handling and validation:
- GTM ID format validation (must be GTM-XXXXXXX)
- Graceful fallback when GTM fails to load
- Parameter validation for tracking methods
- Console warnings for invalid usage