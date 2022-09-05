export class PhysicsExperimentSystem {
    constructor(id) {
        this.id = id;
        this.$exp_sys = $(`#` + id);
        this.$exp_sys.append(`
            <div>Hello World!</div>
        `);
        this.start();
    }

    start() {

    }
}