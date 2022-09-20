export class PhysicsExperimentSystem {
    constructor(id) {
        this.id = id;
        this.$exp_sys = $(`#` + id);

        //菜单页面
        this.menu = new ExperimentMenu(this);
        //this.menu.hide();
        //静电场实验
        this.electrostatic_field = new ElectrostaticField(this);
        //粘滞系数实验
        this.viscosity_coefficient = new ViscosityCoefficient(this);
        //this.viscosity_coefficient.show();

        // //气垫 重力加速度
        // this.air_cushion = new AirCushion(this);
        //
        // //牛顿环
        // this.newton_rings = new NewtonRings(this);
        //
        // //单摆
        // this.simple_pendlum = new SimplePendlum(this);
        //
        // //扭摆
        // this.rotational_inertia = new RotationalInertia(this);
        //工具箱
        // this.toolbox = new Calculator(this);

        this.start();


    }

    start() {

    }
}