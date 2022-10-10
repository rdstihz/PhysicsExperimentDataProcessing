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
    }

    work() {
        let data = this.get_input();
        //console.log(data);

        let n = 5;
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

        console.log(k, b, r);
        let g = 4 * Math.PI * Math.PI / k;
        console.log(g);

        let g0 = 979.4;

        $(`#simple-pendulum-date-result`).html(g.toFixed(1));
        $(`#simple-pendulum-date-error`).html(((g - g0) / g0 * 100).toFixed(1));
        $(`#simple-pendulum-jieju`).html((-b / k).toFixed(1));
        $(`#simple-pendulum-xgxs`).html(r.toFixed(5));


        //绘制图像
        this.$img = document.getElementById("simple-pendulum-figure");
        console.log(this.$img);
        $.ajax({
            url: "http://127.0.0.1:8000/exp/getfigure3/",
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
                    console.log("success");
                    this.$img.src = resp.src;
                    document.querySelector("#simple-pendulum-figure-download").href = resp.src;
                }
            }
        });

    }

    get_input() {
        let data = [];
        for (let i = 1; i <= 5; i++) {
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
