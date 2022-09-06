class ExperimentMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="experiment-menu">
    <div class="experiment-menu-item" id="experiment-menu-item-electrostatic-field">静电场测绘实验数据处理</div>
    <div class="experiment-menu-item" id="experiment-menu-item-viscosity-coefficient">粘滞系数实验数据处理</div>
    <div class="experiment-menu-item">实验名称</div>
    <div class="experiment-menu-item">实验名称</div>
    <div class="experiment-menu-item">实验名称</div>
    <div class="experiment-menu-item">实验名称</div>
</div>
        `);

        this.root.$exp_sys.append(this.$menu);

        this.$item_electrostatic_field = this.$menu.find("#experiment-menu-item-electrostatic-field");
        this.$item_viscosity_coefficient = this.$menu.find("#experiment-menu-item-viscosity-coefficient");
        this.start();
    }

    start() {
        let outer = this;
        this.$item_electrostatic_field.click(function (e) {
            outer.hide();
            outer.root.electrostatic_field.show();
        });

        this.$item_viscosity_coefficient.click(function (e) {
            outer.hide();
            outer.root.viscosity_coefficient.show();
        });
    }

    show() {
        this.$menu.show();
    }

    hide() {
        this.$menu.hide();
    }

}