export class RotationalInertia {
    constructor(root) {
        this.root = root;
        this.$rotational_inertia = $(`#rotational-inertia-123456`);
        this.start();
    }

    start() {
        $(`#final-contre-btn3`).click(e => {
            window.location.replace("/");
        });

        $(`#final-contre-btn2`).click(e => {
            let data = this.get_inputdata();
            console.log(data);
            let result = this.calc(data);
            console.log(result);
            this.fillresult(result);
        });
    }

    get_inputdata() {
        let data = [];

        //托盘
        data.push({
            T: +$(`#torsional-pendulum-tuo-T`).val(),
        });

        //圆柱
        data.push({
            m: +$(`#torsional-pendulum-m-zhu`).val(),
            R: +$(`#torsional-pendulum-wai-zhu`).val(),
            T: +$(`#torsional-pendulum-T-zhu`).val(),
        });

        //圆桶
        data.push({
            m: +$(`#torsional-pendulum-m-tong`).val(),
            R: +$(`#torsional-pendulum-wai-tong`).val(),
            r: +$(`#torsional-pendulum-nei-tong`).val(),
            T: +$(`#torsional-pendulum-T-tong`).val(),
        });

        //圆球
        data.push({
            m: +$(`#torsional-pendulum-m-qiu`).val(),
            R: +$(`#torsional-pendulum-wai-qiu`).val(),
            T: +$(`#torsional-pendulum-T-qiu`).val(),
        });

        //细杆
        data.push({
            m: +$(`#torsional-pendulum-m-gan`).val(),
            L: +$(`#torsional-pendulum-length-gan`).val(),
            T: +$(`#torsional-pendulum-T-gan`).val(),
        });

        return data;
    }


    calc(data) {

        let result = [];
        //托盘、圆柱
        let T0 = data[0].T;
        let T1 = data[1].T;

        let m = data[1].m / 1000;
        let D = data[1].R / 100;
        let I1_t = m * D * D / 8;

        let I0_e = I1_t * T0 * T0 / (T1 * T1 - T0 * T0);
        let K = 4 * Math.PI * Math.PI * (I1_t) / (T1 * T1 - T0 * T0);
        //let K = 0.02873646279;
        let I0_t = K * T0 * T0 / (4 * Math.PI * Math.PI);

        result.push({
            I_t: I0_t,
            I_e: I0_e,
        });
        result.push({
            I_t: I1_t,
            I_e: K * T1 * T1 / (4 * Math.PI * Math.PI) - I0_t,
        });


        //圆桶
        D = data[2].R / 100;
        let d = data[2].r / 100;
        m = data[2].m / 1000;
        T1 = data[2].T;
        result.push({
            I_t: m * (D * D + d * d) / 8,
            I_e: K * T1 * T1 / (4 * Math.PI * Math.PI) - I0_t,
        });

        //圆球
        m = data[3].m / 1000;
        D = data[3].R / 100;
        T1 = data[3].T;
        result.push({
            I_t: m * D * D / 10,
            I_e: K * T1 * T1 / (4 * Math.PI * Math.PI),
        });

        //细杆
        let L = data[4].L / 100;
        m = data[4].m / 1000;
        T1 = data[4].T;
        result.push({
            I_t: m * L * L / 12,
            I_e: K * T1 * T1 / (4 * Math.PI * Math.PI),
        });

        return result;

    }


    fillresult(result) {
        let data = result;
        $(`#torsional-pendulum-tuo-test`).html((data[0].I_t * 1e4).toFixed(4));

        let a = data[1].I_t, b = data[1].I_e;
        $(`#torsional-pendulum-theory-zhu`).html((a * 1e4).toFixed(4));
        $(`#torsional-pendulum-test-zhu`).html((b * 1e4).toFixed(4));
        $(`#calculation-error-zhu`).html(((b - a) / a * 100).toFixed(4));

        a = data[2].I_t, b = data[2].I_e;
        $(`#torsional-pendulum-theory-tong`).html((data[2].I_t * 1e4).toFixed(4));
        $(`#torsional-pendulum-test-tong`).html((data[2].I_e * 1e4).toFixed(4));
        $(`#calculation-error-tong`).html(((b - a) / a * 100).toFixed(4));

        a = data[3].I_t, b = data[3].I_e;
        $(`#torsional-pendulum-theory-qiu`).html((data[3].I_t * 1e4).toFixed(4));
        $(`#torsional-pendulum-test-qiu`).html((data[3].I_e * 1e4).toFixed(4));
        $(`#calculation-error-qiu`).html(((b - a) / a * 100).toFixed(4));

        a = data[4].I_t, b = data[4].I_e;
        $(`#torsional-pendulum-theory-gan`).html((data[4].I_t * 1e4).toFixed(4));
        $(`#torsional-pendulum-test-gan`).html((data[4].I_e * 1e4).toFixed(4));
        $(`#calculation-error-gan`).html(((b - a) / a * 100).toFixed(4));

    }

    get_inputdata2() {
        let m = +$(`#pre-measured-date-m`).val();
        let h = +$(`#pre-measured-date-h`).val();
        let D = +$(`#pre-measured-date-wai`).val();
        let d = +$(`#pre-measured-date-nei`).val();
        let T = [];
        for (let i = 1; i <= 5; i++) {
            T.push(+$(`parallel-axis-cycle${i}`).val());
        }
        return {
            m: m,
            h: h,
            D: D,
            d: d,
            T: T,
        };
    }

    calc2(data) {

    }

}
