class ViscosityCoefficientFigure {
    constructor(viscosity_coefficient) {
        this.viscosity_coefficient = viscosity_coefficient;
        this.$figure = $(`
<div class="viscosity_coefficient_figure">
    <canvas class="viscosity_coefficient_figure_canvas" style="background: aqua"></canvas>
</div>
        `);
        this.$canvas = this.$figure.find(".viscosity_coefficient_figure_canvas");
        this.ctx = this.$canvas[0].getContext('2d'); //2D画布
        this.viscosity_coefficient.$viscosity_coefficient.append(this.$figure);

        this.ctx.canvas.width = this.$figure.width();
        this.ctx.canvas.height = this.$figure.height();

        this.scale = Math.min(this.ctx.canvas.width, this.ctx.canvas.height) / 23;

        this.start();
    }

    start() {

        this.redraw();
    }

    redraw() {

    }

}