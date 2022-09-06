class ElectrostaticField {
    constructor(root) {
        this.root = root;
        this.$electrostatic_field = $(`
 <div class="electrostatic-field">
 <h1 class="experiment-name-title">静电场测绘实验数据处理（同轴电缆）</h1>
</div>
        `);
        this.hide();

        //数据输入区域
        this.datainput = new ElectrostatidFieldDataInput(this);
        //结果显示区域
        this.result = new ElectrostaticFieldResult(this);
        //图像显示区域
        this.figure = new ElectrostaticFieldFigure(this);
        //按键
        this.button_group = new ElectrostaticButtonGroup(this);

        this.root.$exp_sys.append(this.$electrostatic_field);

        this.start();
    }

    start() {
        
    }

    hide() {
        this.$electrostatic_field.hide();
    }

    show() {
        this.$electrostatic_field.show();
        console.log(this.datainput.getInputData());
    }

}