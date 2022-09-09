class ExperimentMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="experiment-menu">
    
    
    <div class="experiment-menu-title">
        <h1>物理实验数据处理平台</h1>
    </div>
    
    <div class="experiment-menu-toolbox">工具箱</div>
    <table class="experiment-menu-table">
        <tr>
            <td class="experiment-menu-item" id="experiment-menu-item-electrostatic-field">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/tempimage.jpeg" alt="">
                <div >静电场测绘实验数据处理</div>
            </td>
            <td class="experiment-menu-item" id="experiment-menu-item-viscosity-coefficient">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/tempimage.jpeg" alt="">
                <div >粘滞系数实验数据处理</div>
            </td>
            <td class="experiment-menu-item" id="experiment-menu-item-air-cushion">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/tempimage.jpeg" alt="">
                <div >气垫技术测量重力加速度</div>
            </td>
        </tr>
        
        <tr>
            <td class="experiment-menu-item" id="experiment-menu-item-newton-rings">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/tempimage.jpeg" alt="">
                <div class="experiment-menu-item">牛顿环</div>
            </td class="experiment-menu-item">
            <td class="experiment-menu-item" id="experiment-menu-item-simple-pendlum">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/tempimage.jpeg" alt="">
                <div class="experiment-menu-item">单摆</div>
            </td>
            <td class="experiment-menu-item" id="experiment-menu-item-rotational-inertia">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/tempimage.jpeg" alt="">
                <div class="experiment-menu-item">扭摆实验————转动惯量的测量</div>
            </td>
        </tr>
        
    </table>
    

</div>
        `);

        this.root.$exp_sys.append(this.$menu);

        this.$item_electrostatic_field = this.$menu.find("#experiment-menu-item-electrostatic-field");
        this.$item_viscosity_coefficient = this.$menu.find("#experiment-menu-item-viscosity-coefficient");
        this.$item_air_cushion = this.$menu.find("#experiment-menu-item-air-cushion");
        this.$item_newton_rings = this.$menu.find("#experiment-menu-item-newton-rings");
        this.$item_simple_pendlum = this.$menu.find("#experiment-menu-item-simple-pendlum");
        this.$item_rotational_inertia = this.$menu.find("#experiment-menu-item-rotational-inertia");
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

        this.$item_air_cushion.click(function (e) {
            outer.hide();
            outer.root.air_cushion.show();
        });

        this.$item_newton_rings.click(function (e) {
            outer.hide();
            outer.root.newton_rings.show();
        });

        this.$item_simple_pendlum.click(function (e) {
            outer.hide();
            outer.root.simple_pendlum.show();
        });

        this.$item_rotational_inertia.click(function (e) {
            outer.hide();
            outer.root.rotational_inertia.show();
        });
    }

    show() {
        this.$menu.show();
    }

    hide() {
        this.$menu.hide();
    }

}