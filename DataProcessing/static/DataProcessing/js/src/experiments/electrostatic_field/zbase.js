import {ElectrostatidFieldDataInput} from "./datainput.js";
import {ElectrostaticFieldFigure} from "./figure.js"
import {ElectrostaticFieldResult} from "./result.js"
import {ElectrostaticButtonGroup} from "./buttongroup.js";

export class ElectrostaticField {
    constructor(id) {
        this.$electrostatic_field = $('#' + id);

        //数据输入区域
        this.datainput = new ElectrostatidFieldDataInput(this, "electrostatic-field-datainput");
        //结果显示区域
        this.result = new ElectrostaticFieldResult(this, "electrostatic-field-result");
        //图像显示区域
        this.figure = new ElectrostaticFieldFigure(this, "electrostatic-field-figure");
        //按键
        this.button_group = new ElectrostaticButtonGroup(this, "electrostatic-field-button-group");

        this.start();
    }

    start() {

    }

    hide() {
        this.$electrostatic_field.hide();
    }

    show() {
        this.$electrostatic_field.show();
        this.figure.ctx.canvas.width = this.figure.$figure.width();
        this.figure.ctx.canvas.height = this.figure.$figure.height();
        this.figure.scale = Math.min(this.figure.$figure.width(), this.figure.$figure.height()) / 23;
        this.figure.redraw();
    }

}