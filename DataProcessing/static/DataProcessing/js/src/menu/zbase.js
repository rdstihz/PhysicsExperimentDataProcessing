class ExperimentMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="experiment-menu">
    
    
    <div class="experiment-menu-title">
        <h1>物理实验数据处理平台</h1>
    </div>
    
    <a class="experiment-menu-toolbox" href="exp/calculator/">工具箱</a>
    <table class="experiment-menu-table">
        <tr>
            <td class="experiment-menu-item" id="experiment-menu-item-electrostatic-field">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/electrostatic_field.png" alt="">
                <div >静电场测绘实验数据处理</div>
            </td>
            <td class="experiment-menu-item" id="experiment-menu-item-viscosity-coefficient">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/viscosity_coefficient.png" alt="">
                <div >粘滞系数实验数据处理</div>
            </td>
            <td class="experiment-menu-item" id="experiment-menu-item-air-cushion">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/air_cushion.png" alt="">
                <div >气垫技术测量重力加速度</div>
            </td>
        </tr>
        
        <tr>
            <td class="experiment-menu-item" id="experiment-menu-item-newton-rings">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/netwon_rings.png" alt="">
                <div class="experiment-menu-item">牛顿环</div>
            </td class="experiment-menu-item">
            <td class="experiment-menu-item" id="experiment-menu-item-simple-pendlum">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/single_pendulum.png" alt="">
                <div class="experiment-menu-item">单摆</div>
            </td>
            <td class="experiment-menu-item" id="experiment-menu-item-rotational-inertia">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/torsional_pendulum.png" alt="">
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

        this.$item_toolbox = this.$menu.find(".experiment-menu-toolbox");

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
            window.location.replace("/exp/air_cushion/");
        });

        this.$item_newton_rings.click(function (e) {
            window.location.replace("/exp/newton_rings/");
        });
        //
        this.$item_simple_pendlum.click(function (e) {
            window.location.replace("/exp/simple_pendlum/");
        });

        this.$item_rotational_inertia.click(function (e) {
            window.location.replace("/exp/rotational_inertia/");
        });
        //
        // this.$item_toolbox.click(function (e) {
        //     outer.hide();
        //     outer.root.toolbox.show();
        // });
    }

    show() {
        this.$menu.show();
    }

    hide() {
        this.$menu.hide();
    }

}