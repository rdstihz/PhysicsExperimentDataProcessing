class ViscosityCoefficient {
    constructor(root) {
        this.root = root;
        this.$viscosity_coefficient = $(`
<div class="viscosity_coefficient">
    <h1 class="experiment-name-title">粘滞系数实验数据处理</h1>
</div>
        `);
        this.datainput = new ViscosityCoefficientDataInput(this);
        this.result = new ViscosityCoefficientResult(this);
        this.figure = new ViscosityCoefficientFigure(this);
        this.buttongroup = new ViscosityCoefficientButtonGroup(this);

        this.root.$exp_sys.append(this.$viscosity_coefficient);

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