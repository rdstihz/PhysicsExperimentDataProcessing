export class ViscosityCoefficientDataInput {
    constructor(viscosity_coefficient, id) {
        this.viscosity_coefficient = viscosity_coefficient;
        this.$datainput = $('#' + id);
    }

    getInputData() {
        let D = [], d = [], t = [];

        for (let i = 1; i <= 6; i++) {
            D.push(+this.$datainput.find(`#viscosity-coefficient-dataiinput-data${i}-D`).val());
            d.push(+this.$datainput.find(`#viscosity-coefficient-dataiinput-data${i}-d`).val());
            t.push(+this.$datainput.find(`#viscosity-coefficient-dataiinput-data${i}-t`).val());
        }

        return {
            'D': D,
            'd': d,
            't': t,
        }
    }

}