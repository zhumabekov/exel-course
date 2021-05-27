import { ExelComponent } from "../../core/ExelComponent";
import { shouldResize } from "./table.functions";
import { resizeHandler } from "./table.resize";
import { createTable } from "./table.template";

export class Table extends ExelComponent{
  static className = 'exel__table'
  constructor($root){
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }
  toHTML(){
    return createTable()
  }
  onMousedown(event){
    if (shouldResize(event)){
      resizeHandler(this.$root, event)
    }
  }
  onMousemove(event){
    console.log(event.target)
  }
  onMouseup(event){
    console.log(event.target)
  }
}