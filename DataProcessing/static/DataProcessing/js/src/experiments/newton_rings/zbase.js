class NewtonRings {
    constructor(root) {
        this.root = root;
        this.$newton_rings = $(`

        `);
        this.$newton_rings.hide();
        this.root.$exp_sys.append(this.$newton_rings);
    }

    show() {
        this.$newton_rings.show();
    }

    hide() {
        this.$newton_rings.hide();
    }
}