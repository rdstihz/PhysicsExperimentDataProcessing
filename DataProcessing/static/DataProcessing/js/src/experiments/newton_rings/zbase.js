export class NewtonRings {
    constructor(id) {
        this.$newton_rings = $(`#` + id);
        this.start();
    }

    start() {

        this.$img = document.getElementById("newton-rings-result-figure");
        $(`#newton-rings-final-btn-return`).click(e => {
            window.location.replace("/");
        });
        $(`#newton-rings-final-btn-calc`).click(e => {
            this.work();
        });
        $('#newton-rings-final-btn-clear').click(e => {
            this.clear_data();
        });
    }

    clear_data() {
        for (let i = 13; i <= 24; i++) {
            $(`#newton-rings-left${i}`).val("");
            $(`#newton-rings-right${i}`).val("");
        }
        $(`#newton-rings-result-zhucha-r`).html("");

        $(`#newton-rings-result-2cheng-r`).html("");
        $(`#newton-rings-result-2cheng-rela`).html("");
        $(`#newton-rings-result-2cheng-eq`).html("");

        this.$img.src = "";
    }

    work() {
        let lambda = 589.3;
        let data = this.get_data();
        let D = [], D2 = [];
        for (let i = 0; i < data.length; i++) {
            D.push(Math.abs(data[i][0] - data[i][1]));
            D2.push(D[i] * D[i]);
        }

        //逐差法
        let dD2 = [];
        let avg = 0;
        for (let i = 0; i < 6; i++) {
            dD2.push(D2[i + 6] - D2[i]);
            avg += dD2[i] / 6;
        }
        let R = avg / (24 * lambda) * 1e6;

        $(`#newton-rings-result-zhucha-r`).html(R.toFixed(1));

        //图像法
        let x = [], y = [];
        for (let i = 13; i <= 24; i++) {
            x.push(i);
            y.push(D2[i - 13]);
        }

        let sx = 0, sy = 0;
        let sxx = 0, syy = 0, sxy = 0;
        let n = 12;
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
        R = k / (4 * lambda) * 1e6;

        $(`#newton-rings-result-2cheng-r`).html(R.toFixed(1));
        $(`#newton-rings-result-2cheng-rela`).html(r.toFixed(5));
        let sk = k.toFixed(4), sb = b.toFixed(4);
        $(`#newton-rings-result-2cheng-eq`).html(`D^2 = ${sk} * k + ${sb}`);
        $.ajax({
            url: "/exp/getfigure2/",
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
                    document.querySelector("#newton-rings-result-figure-download").href = resp.src;
                }
            }
        });

        this.drawImage();
    }

    array_to_str(x, n) {
        let res = '';
        for (let i = 0; i < n; i++) {
            if (i) res += ','
            res += x[i];
        }
        return res;
    }

    get_data() {
        let data = [];
        for (let i = 13; i <= 24; i++) {
            let x1 = +$(`#newton-rings-left${i}`).val();
            let x2 = +$(`#newton-rings-right${i}`).val();
            data.push([x1, x2]);
        }
        return data;
    }

    drawImage() {

    }
}