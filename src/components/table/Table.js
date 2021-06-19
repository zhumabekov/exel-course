import { $ } from "../../core/dom";
import { ExelComponent } from "../../core/ExelComponent";
import { shouldResize } from "./table.functions";
import { matrix } from "./table.functions";
import { isCell } from "./table.functions";
import { nextSelector } from "./table.functions";
import { resizeHandler } from "./table.resize";
import { createTable } from "./table.template";
import { TableSelection } from "./TableSelection";

export class Table extends ExelComponent{
  static className = 'exel__table'
  constructor($root, options){
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }
  prepare(){
    this.selection = new TableSelection()
  }
  init(){
    super.init()
    
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }
  selectCell($cell){
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }
  toHTML(){
    return createTable()
  }
  onMousedown(event){ 
    if (shouldResize(event)){
      resizeHandler(this.$root, event)
    }else if(isCell(event)){
      const $target = $(event.target)
      if(event.shiftKey){
        const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))      
        this.selection.selectGroup($cells)
      }else{
        this.selection.select($target)
      }
    }
  }
  onKeydown(event){
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
    const {key} = event
    if (keys.includes(key) && !event.shiftKey){
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }
  onInput(event){
    this.$emit('table:input', $(event.target))
  }
}



