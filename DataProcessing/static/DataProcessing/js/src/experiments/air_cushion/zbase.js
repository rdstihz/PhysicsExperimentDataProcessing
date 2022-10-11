export class AirCushion {
    constructor(id) {
        this.$air_cushion = $(`#` + id);
        this.start();
    }

    start() {
        //添加点击事件
        //返回键
        $(`#air-cushion-button-return`).click(e => {
            window.location.replace("/");
        });
        //计算键
        $(`#air-cushion-button-calc`).click(e => {
            let data = this.get_inputdata();
            let result = this.calc(data);
            this.fillresult(result);
        });
        $('#air-cushion-button-clear').click(e => {
            for (let i = 1; i <= 3; i++) {
                $(`#air-cushion-date-h${i}`).val("");
                $(`#air-cushion-date-down1-${i}`).val("");
                $(`#air-cushion-date-down2-${i}`).val("");
                $(`#air-cushion-date-up1-${i}`).val("");
                $(`#air-cushion-date-up2-${i}`).val("");
            }
            $(`#air-cushion-inputdata-S`).val("");
            $(`#air-cushion-inputdata-L`).val("");
            $(`#air-cushion-inputdata-dL`).val("");

            for (let i = 0; i < 3; i++) {
                $(`#air-cushion-acceleration${i + 1}`).html("");
                $(`#air-cushion-g-acceleration${i + 1}`).html("");
            }
            $(`#air-cushion-mean-acceleration`).html("");
        });
    }


    get_inputdata() {
        let S = +$(`#air-cushion-inputdata-S`).val();
        let L = +$(`#air-cushion-inputdata-L`).val();
        let dL = +$(`#air-cushion-inputdata-dL`).val();

        let h = [], t1 = [], t2 = [], t11 = [], t22 = [];
        for (let i = 1; i <= 3; i++) {
            h.push(+$(`#air-cushion-date-h${i}`).val());
            t1.push(+$(`#air-cushion-date-down1-${i}`).val());
            t2.push(+$(`#air-cushion-date-down2-${i}`).val());
            t11.push(+$(`#air-cushion-date-up1-${i}`).val());
            t22.push(+$(`#air-cushion-date-up2-${i}`).val());
        }

        return {
            S: S,
            L: L,
            dL: dL,
            h: h,
            t2: t2,
            t1: t1,
            t11: t11,
            t22: t22,
        };
    }


    calc(data) {
        let dL = data.dL, L = data.L, S = data.S;
        let a = [], g = [];
        for (let i = 0; i < 3; i++) {
            let t1 = data.t1[i], t2 = data.t2[i];
            let a1 = (dL * dL) * (t1 * t1 - t2 * t2) / (2 * S * t1 * t1 * t2 * t2);
            t1 = data.t11[i], t2 = data.t22[i];
            let a2 = (dL * dL) * (t1 * t1 - t2 * t2) / (2 * S * t1 * t1 * t2 * t2);
            let ai = (a1 + a2) / 2;
            a.push(ai);
            g.push(ai / data.h[i] * L);
        }
        let g_average = (g[0] + g[1] + g[2]) / 3;
        return {
            a: a,
            g: g,
            g_average: g_average,
        };
    }

    fillresult(result) {
        for (let i = 0; i < 3; i++) {
            $(`#air-cushion-acceleration${i + 1}`).html(result.a[i]);
            $(`#air-cushion-g-acceleration${i + 1}`).html(result.g[i]);
        }
        $(`#air-cushion-mean-acceleration`).html(result.g_average);
    }


}
