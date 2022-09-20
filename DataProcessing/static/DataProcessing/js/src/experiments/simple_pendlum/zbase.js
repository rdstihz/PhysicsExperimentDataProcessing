class SimplePendlum {
    constructor(root) {
        this.root = root;
        this.$simple_pendlum = $(`

`);
        this.$simple_pendlum.hide();
        this.root.$exp_sys.append(this.$simple_pendlum);
    }

    show() {
        this.$simple_pendlum.show();
    }

    hide() {
        this.$simple_pendlum.hide();
    }
}
