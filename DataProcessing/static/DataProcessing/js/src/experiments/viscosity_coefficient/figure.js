export class ViscosityCoefficientFigure {
    constructor(viscosity_coefficient, id) {
        this.viscosity_coefficient = viscosity_coefficient;
        this.$figure = $('#' + id);


        this.$img = this.$figure.find("img")[0];

        this.start();
    }

    start() {

        this.redraw();
    }

    setdata(k, b, x, y, n) {
        let outer = this;
        $.ajax({
            url: "/exp/getfigure/",
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
                    outer.$img.src = resp.src;
                    document.querySelector("#viscosity_coefficient_figure-download").href = resp.src;
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