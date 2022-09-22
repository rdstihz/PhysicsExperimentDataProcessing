export class NewtonRings {
    constructor(id) {
        this.$newton_rings = $(`#` + id);
        this.start();
    }

    start() {
        $(`#newton-rings-final-btn-return`).click(e => {
            window.location.replace("/");
        });
    }
}