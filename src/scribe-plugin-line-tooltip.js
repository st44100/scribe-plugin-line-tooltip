/**
 * Scribe Placeholder Plugin.
 * Plugin to display placeholder text inside the scribe editor.
 *
 * @param {string} placeholder Placeholder text.
 * @param {HTMLElement} editorContainer DOM element wrapping the scribe editor.
 */

let classNameBase = 'scribe-plugin-line-tooltip'

require('./scribe-plugin-line-tooltip.styl');


export default class TooltipPlugin {
  constructor () {
    this.currentTooltipEl = null
    return this
  }

  init (editorContainer, handlers) {
    this.parentBounce = editorContainer.getBoundingClientRect()
    this.editorContainer = editorContainer
    this.handlers = handlers
    return (scribe) => {
      scribe.el.addEventListener('click', _.throttle(this.update.bind(this), 300))
      scribe.el.addEventListener('keyup', _.throttle(this.updateKey.bind(this), 300))
    }
  }

  createTootip () {
    if (this.currentTooltipEl !== null) {
      return false;
    }

    var tooltipOuter = document.createElement('div')
    tooltipOuter.classList.add(`${classNameBase}`)
    tooltipOuter.classList.add(`${classNameBase}--tooltip`)

    var tooltipEl = document.createElement('div')
    tooltipEl.classList.add(`tooltip`)
    tooltipEl.classList.add(`js-tooltip`)
    tooltipEl.innerHTML = `
      <p> + </p>
    `
    tooltipOuter.appendChild(tooltipEl)
    this.currentTooltipEl = tooltipOuter

    _.forEach(this.handlers, function(handler, key) {
      tooltipEl.addEventListener(key, (e) => { handler(e, this) })
    })

    this.editorContainer.appendChild(tooltipOuter)
    return true;
  }

  removeTooltip () {
    let tooltips = this.editorContainer.querySelectorAll('.scribe-plugin-line-tooltip')

    _.forEach(tooltips, function(t) {
      t.remove()
    })

    this.currentTooltipEl = null
    return true;
  }

  update (e) {
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
      this.removeTooltip()
      this.createTootip()
      let bounce = lineElement.getBoundingClientRect()
      this.currentTooltipEl.style.top = bounce.top - this.parentBounce.top + 'px'
    } else {
      lineElement.classList.remove('emptyline');
    }
  }

  updateKey (e) {
    console.log('UPDATE is KeyUp line ? ')
    update(e)
  }

}
