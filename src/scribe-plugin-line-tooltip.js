/**
 * Scribe Placeholder Plugin.
 * Plugin to display placeholder text inside the scribe editor.
 *
 * @param {string} placeholder Placeholder text.
 * @param {HTMLElement} editorContainer DOM element wrapping the scribe editor.
 */

let classNameBase = 'scribe-plugin-line-tooltip'

// Default style
require('./scribe-plugin-line-tooltip.styl');

/**
 * @class  ScribePluginLineTooltip
 */
export default class ScribePluginLineTooltip {

  constructor () {
    this.currentTooltipEl = null
    return this
  }

  /**
   * Use this method to subscribe Sribe.
   * @method
   * @example
   *
   *    scribe.use(ScribePluginLine.init(parent, handlers));
   * @param {HTMLElement} editorcontainer Outer element of scribe editor.
   * @param {Object} handlers Tooltip event handlers.
   * @param {Function} callback function for scribe.
   */
  init (editorContainer, handlers) {
    this.parentBounce = editorContainer.getBoundingClientRect()
    this.editorContainer = editorContainer
    this.handlers = handlers
    return (scribe) => {
      scribe.el.addEventListener('click', _.throttle(this.update.bind(this), 300))
      scribe.el.addEventListener('keyup', _.throttle(this.updateKey.bind(this), 300))
    }
  }


  /**
   * Craete tooltip Element.
   * @method
   * @overirde
   * @return {HTMLElement} Tooltip element.
   */
  createTootip () {

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

    return tooltipOuter
  }


  /**
   * showTooltip
   * @return {HTMLElement} Current active tooltip element.
   */
  setTooltip () {
    if (this.currentTooltipEl !== null) {
      return false;
    }

    this.currentTooltipEl = this.createTootip()

    _.forEach(this.handlers, (handler, key) => {
      this.currentTooltipEl.addEventListener(key, (e) => { handler(e, this) })
    })

    this.editorContainer.appendChild(this.currentTooltipEl)
    return this.currentTooltipEl;
  }


  /**
   * Remove all tooltip.
   * @method
   */
  removeTooltip () {
    let tooltips = this.editorContainer.querySelectorAll('.scribe-plugin-line-tooltip')

    _.forEach(tooltips, function(t) {
      t.remove()
    })

    this.currentTooltipEl = null
    return true;
  }


  /**
   * Update handler for Scribe editor event.
   * @param {Event} e Update event from Scribe Editor.
   */
  update (e) {
    var selection = new scribe.api.Selection();

    let lineElement = selection.getContaining(function (node) {
      return node.nodeName === 'P';
    });

    if (!lineElement) {
      return
    }

    let nodeHelpers = scribe.node;

    let isEmptyLine = nodeHelpers.isEmptyInlineElement(lineElement);


    if (isEmptyLine) {
      lineElement.classList.add('emptyline');
      this.removeTooltip()
      this.setTooltip()
      let bounce = lineElement.getBoundingClientRect()
      this.currentTooltipEl.style.top = bounce.top - this.parentBounce.top + 'px'
    } else {
      lineElement.classList.remove('emptyline');
      this.removeTooltip()
    }
  }

  /**
   * Key update handler for Scribe editor event.
   * @param {Event} e Update event from Scribe Editor.
   */
  updateKey (e) {
    this.update(e)
  }

}
