export class SimplePendlum {
    constructor(id) {
        this.$simple_pendlum = $(`#` + id);

        this.start();
    }

    start() {
        $(`#simple-pendulum-final-btn3`).click(e => {
            window.location.replace("/");
        });
        $(`#simple-pendulum-final-btn2`).click(e => {
            this.work();
        });
        $('#simple-pendulum-final-clear').click(e => {
            this.clear_data();
        });
    }

    clear_data() {
        for (let i = 1; i <= 5; i++) {
            $(`#simple-pendulum-length${i}`).val("");
            $(`#simple-oendulum-cycle${i}`).val("");
        }

        $(`#simple-pendulum-date-result`).html("");
        $(`#simple-pendulum-date-error`).html("");
        $(`#simple-pendulum-jieju`).html("");
        $(`#simple-pendulum-xgxs`).html("");

        document.getElementById("simple-pendulum-figure").src = "";
    }

    work() {
        let data = this.get_input();

        let n = 6;
        let x = [], y = [];
        for (let i = 0; i < n; i++) {
            x.push(data[i][0]);
            y.push((data[i][1] / 50) * (data[i][1] / 50)); //t^2
        }

        let sx = 0, sy = 0;
        let sxx = 0, syy = 0, sxy = 0;
        for (let i = 0; i < n; i++) {
            sx += x[i], sy += y[i];
            sxx += x[i] * x[i], syy += y[i] * y[i];
            sxy += x[i] * y[i];
        }

        //斜率
        let k = (sxy - sx * sy / n) / (sxx - sx * sx / n);
        //截距
        let b = sy / n - k * sx / n;
        //相关系数
        let r = (n * sxy - sx * sy) / (Math.sqrt(n * sxx - sx * sx) * Math.sqrt(n * syy - sy * sy));

        let g = 4 * Math.PI * Math.PI / k;

        let g0 = +$('#simple-pendum-std-g').val();

        $(`#simple-pendulum-date-result`).html(g.toFixed(1));
        $(`#simple-pendulum-date-error`).html(((g - g0) / g0 * 100).toFixed(1));
        $(`#simple-pendulum-jieju`).html((-b / k).toFixed(1));
        $(`#simple-pendulum-xgxs`).html(r.toFixed(5));


        //绘制图像
        this.$img = document.getElementById("simple-pendulum-figure");
        $.ajax({
            url: "/exp/getfigure3/",
            type: "GET",
            data: {
                'k': k,
                'b': b,
                'x': this.array_to_str(x, n),
                'y': this.array_to_str(y, n),
                'n': n,
                'state': '99787fdsf',
            },
            success: resp => {
                if (resp.result === "success") {
                    this.$img.src = resp.src;
                    document.querySelector("#simple-pendulum-figure-download").href = resp.src;
                }
            }
        });

    }

    get_input() {
        let data = [];
        for (let i = 1; i <= 6; i++) {
            let l = +$(`#simple-pendulum-length${i}`).val();
            let t = +$(`#simple-oendulum-cycle${i}`).val();
            data.push([l, t]);
        }
        return data;
    }

    array_to_str(x, n) {
        let res = '';
        for (let i = 0; i < n; i++) {
            if (i) res += ','
            res += x[i];
        }
        return res;
    }

}
