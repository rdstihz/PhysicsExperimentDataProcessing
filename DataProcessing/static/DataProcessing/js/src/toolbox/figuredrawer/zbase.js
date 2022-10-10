export class FigureDrawer {
    constructor(id) {
        this.$figure_drawer = $('#' + id);

        this.$btn_submit = $('#figuredrawer-btn-submit');
        this.$result_img = $('#figuredrawer-result')[0];

        this.$input_x = $('#figuredrawer-input-x');
        this.$input_y = $('#figuredrawer-input-y');

        this.$input_title = $('#input_figure_title');
        this.$input_x_title = $('#input_x_title');
        this.$input_y_title = $('#input_y_title');

        this.input_type = $('#figuredrawer-input-type')[0]

        this.$btn_submit.click((e) => {
            this.work();
        });
    }


    work() {
        let x = this.$input_x.val();
        let y = this.$input_y.val();

        let title = this.$input_title.val();
        let x_title = this.$input_x_title.val();
        let y_title = this.$input_y_title.val();

        let type = document.querySelector("input[name='figuredrawer_type']:checked").value;

        let fit_type = document.querySelector("input[name='fit_type']:checked").value;
        let fit_deg = document.querySelector("input[name='fit_deg']").value;

        let show_eq = document.querySelector("input[name='show-eq']").checked;
        console.log(show_eq);

        $.ajax({
            url: "/exp/figuredrawer/getfigure/",
            type: "GET",
            data: {
                'x': x,
                'y': y,
                title: title,
                x_title,
                y_title,
                type,
                fit_type,
                fit_deg,
                show_eq,
                'state': '99787fdsf',
            },
            success: resp => {
                if (resp.result === "success") {
                    this.$result_img.src = resp.src;
                    document.querySelector("#btn-download").href = resp.src;

                    if (fit_type === "poly") {
                        document.querySelector("#figuredrawer-result-poly").innerHTML = resp.poly_str;
                    } else {
                        document.querySelector("#figuredrawer-result-poly").innerHTML = "";
                    }

                    document.querySelector("#figuredrawer-error-message").innerHTML = "";
                } else {
                    document.querySelector("#figuredrawer-error-message").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">绘图失败，请检查输入项！</div>";
                }
            },

            error: resp => {
                document.querySelector("#figuredrawer-error-message").innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">绘图失败，请检查输入项！</div>";
            }

        });

    }

}