import {ViscosityCoefficientDataInput} from './datainput.js'
import {ViscosityCoefficientResult} from "./result.js";
import {ViscosityCoefficientFigure} from "./figure.js";
import {ViscosityCoefficientButtonGroup} from './buttongroup.js'

export class ViscosityCoefficient {
    constructor(id) {
        this.$viscosity_coefficient = $('#' + id);
        this.datainput = new ViscosityCoefficientDataInput(this, "viscosity-coefficient-dataiinput");
        this.result = new ViscosityCoefficientResult(this, "viscosity_coefficient_result");
        this.figure = new ViscosityCoefficientFigure(this, "viscosity_coefficient_figure");
        this.buttongroup = new ViscosityCoefficientButtonGroup(this, "viscosity-coefficient-button-group");


        this.start();
    }

    start() {

    }

    show() {
        this.$viscosity_coefficient.show();
    }

    hide() {
        this.$viscosity_coefficient.hide();
    }
}