export class SimplePendlum {
    constructor(id) {
        this.$simple_pendlum = $(`#` + id);

        this.start();
    }

    start() {
        $(`#final-btn3`).click(e => {
            window.location.replace("/");
        });
    }

}
