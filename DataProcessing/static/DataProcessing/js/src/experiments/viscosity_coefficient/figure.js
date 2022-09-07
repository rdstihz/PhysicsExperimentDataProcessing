class ViscosityCoefficientFigure {
    constructor(viscosity_coefficient) {
        this.viscosity_coefficient = viscosity_coefficient;
        this.$figure = $(`
<div class="viscosity_coefficient_figure">
    <img class="viscosity_coefficient_figure_img" alt="图像" src="1">
</div>
        `);


        this.$img = this.$figure.find("img")[0];

        this.viscosity_coefficient.$viscosity_coefficient.append(this.$figure);
        this.start();
    }

    start() {

        this.redraw();
    }

    setdata(k, b, x, y, n) {
        let outer = this;
        $.ajax({
            url: "http://127.0.0.1:8000/exp/getfigure/",
            type: "GET",
            data: {
                'k': k,
                'b': b,
                'x': outer.array_to_str(x, n),
                'y': outer.array_to_str(y, n),
                'n': n,
                'state': '99787fdsf',
            },
            success: function (resp) {
                if (resp.result === "success") {
                    console.log("success");
                    outer.$img.src = resp.src;
                }
            }
        });
    }

    array_to_str(x, n) {
        let res = '';
        for (let i = 0; i < n; i++) {
            if (i) res += ','
            res += x[i];
        }
        return res;
    }

    redraw() {

    }

}