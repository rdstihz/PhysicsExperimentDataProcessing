class RotationalInertia {
    constructor(root) {
        this.root = root;
        this.$rotational_inertia = $(`

`);
        this.$rotational_inertia.hide();
        this.root.$exp_sys.append(this.$rotational_inertia);
    }

    show() {
        this.$rotational_inertia.show();
    }

    hide() {
        this.$rotational_inertia.hide();
    }
}
