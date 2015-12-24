/**
 * Scribe Placeholder Plugin.
 * Plugin to display placeholder text inside the scribe editor.
 *
 * @param {string} placeholder Placeholder text.
 * @param {HTMLElement} editorContainer DOM element wrapping the scribe editor.
 */

let classNameBase = 'scribe-plugin-line-tooltip'

require('./scribe-plugin-line-tooltip.styl');

module.exports = function(placeholder, editorContainer) {

  return function(scribe) {


    let currentTooltipEl = null
    let parentBounce = scribe.el.getBoundingClientRect()

    function getPosition () {
    }

    function onClickTootip () {
      debugger
    }
    function onHoverTooltip () {
      debugger
    }

    function createTootip () {
      if (currentTooltipEl !== null) {
        return false;
      }

      var tooltipOuter = document.createElement('div')
      tooltipOuter.classList.add(`${classNameBase}`)
      tooltipOuter.classList.add(`${classNameBase}--tooltip`)

      var tooltipEl = document.createElement('div')
      tooltipEl.innerHTML = `
        <p> + </p>
      `
      tooltipOuter.appendChild(tooltipEl)
      currentTooltipEl = tooltipOuter

      scribe.el.appendChild(tooltipOuter)
      return true;
    }

    function removeTooltip () {
      let tooltips = scribe.el.querySelectorAll('.scribe-plugin-line-tooltip')

      _.forEach(tooltips, function(t) {
        t.remove()
      })

      currentTooltipEl = null
      return true;
    }

    function update (e) {
      var selection = new scribe.api.Selection();
      console.log('UPDATE scribe', selection)

      let lineElement = selection.getContaining(function (node) {
        return node.nodeName === 'P';
      });

      if (!lineElement) {
        return
      }

      let nodeHelpers = scribe.node;

      let isEmptyLine = nodeHelpers.isEmptyInlineElement(lineElement);

      console.log('UPDATE is Empty line ? ', isEmptyLine)

      if (isEmptyLine) {
        lineElement.classList.add('emptyline');
        removeTooltip()
        createTootip()
        let bounce = lineElement.getBoundingClientRect()
        currentTooltipEl.style.top = bounce.top - parentBounce.top + 'px'
      } else {
        lineElement.classList.remove('emptyline');

      }
    }

    function updateKey (e) {
      console.log('UPDATE is KeyUp line ? ')
      update(e)
    }

    //scribe.on('content-changed', update);
    //scribe.el.addEventListener('blur', _.throttle(update, 300));
    //scribe.el.addEventListener('focus', _.throttle(update, 300));
    scribe.el.addEventListener('click', _.throttle(update, 300))
    scribe.el.addEventListener('keyup', _.throttle(updateKey, 300))
  };
};
