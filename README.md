# Scribe Line Tooltip Plugin

Add Line tooltips to paragraph in [scribe](https://github.com/guardian/scribe/) editor.

## Installation

- WIP: Install

```
npm install scribe-plugin-line-tooltip --save
```

or 

```
bower install scribe-plugin-line-tooltip --save
```


- Create wrapping element for scribe editor.

```html
  <div class="scribe-outer"><!-- wrapping element. -->
    <div class="scribe"><!-- editor target element. -->
      <p>
        あのイーハトーヴォの<br/>
        すきとおった風、<br/>
      </p>
    </div>
  </div>
```

- Set wrapping element style `position: relative;`.


## Customize 

### Set custom tooltip element.

Override `ScribePluginLineTooltip.createTooltip`

### Set event handler to tooltip

```js
scribe.use(
  tooltip.init(
    elem.parentNode,
    {
      mousedown: function(e) { // Use mousedown instead of click
        e.preventDefault()
        e.stopPropagation()
        console.log('click')
        scribe.el.focus();
        scribe.insertHTML('<div data-block="divider">hr<hr/></div>')
      }
    }
  )
);
```

## Development

### Task

Using webpack to build.

**Build**

```zh
$ npm run build
```

**Development**

Using webpack dev server for development.

```zh
$ npm run dev
$ open http://localhost:8080/webpack-dev-server/
```


