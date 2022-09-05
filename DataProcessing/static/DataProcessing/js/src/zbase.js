export class PhysicsExperimentSystem {
    constructor(id) {
        this.id = id;
        this.$exp_sys = $(`#` + id);

        //静电场实验
        this.electrostatic_field = new ElectrostaticField(this);
        this.electrostatic_field.show();
        this.start();
    }

    start() {

    }
}