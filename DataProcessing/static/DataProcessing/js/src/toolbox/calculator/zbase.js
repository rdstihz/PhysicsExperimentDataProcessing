export class Calculator {
    constructor(id) {
        this.$calculator = $(`#` + id);

        this.$data_n = this.$calculator.find("#calculator-input-data-count");
        this.$data_datas = this.$calculator.find("#calculator-input-datas");
        this.$data_delta = this.$calculator.find("#calculator-input-delta");

        //this.$data_delta_even = this.$calculator.find("#calculator-input-delta-radio-even");

        this.$button = this.$calculator.find(".calculator-input-button-calculate");

        this.$result = this.$calculator.find(".calculator-result");

        this.start();
    }

    start() {
        let outer = this;
        this.$button.click(function (e) {
            outer.work();
        });
    }

    work() {
        let result = this.calc();
        this.$result.find("#calculator-result-cell-n").html(result.n);

        let datas_str = "";
        for (let i = 0; i < result.datas.length; i++) {
            datas_str += result.datas[i] + " ";
        }
        this.$result.find("#calculator-result-cell-datas").html(datas_str);

        this.$result.find("#calculator-result-cell-average").html(result.average);
        this.$result.find("#calculator-result-cell-variance").html(result.variance);
        this.$result.find("#calculator-result-cell-unsure").html(result.unsure);
        this.$result.find("#calculator-result-cell-error").html(result.error);
    }

    calc() {
        let n = +this.$data_n.val();
        let datas = this.$data_datas.val();
        let delta = +this.$data_delta.val();

        datas = datas.split(" ")
        for (let i = 0; i < datas.length; i++) {
            datas[i] = +datas[i];
        }

        n = datas.length;

        //自由度
        let tp = [0, 1.84, 1.32, 1.20, 1.14, 1.11, 1.09, 1.08, 1.07, 1.06];

        let average = 0; //算术平均值
        let variance = 0; //方差

        //求算术平均值
        for (let i = 0; i < n; i++) {
            average += datas[i] / n;
        }
        //求标准偏差
        for (let i = 0; i < n; i++) {
            let x = datas[i];
            variance += (x - average) * (x - average) / n;
        }

        //求不确定度
        let s1 = tp[n - 1] * variance * Math.sqrt(n);

        let s2 = 0;
        let radio_even = document.getElementById("calculator-input-delta-radio-even");
        if(radio_even.checked) {
            s2 = 0.683 * delta;
        }else {
            s2 = delta / 3;
        }

        let U = Math.sqrt(s1 * s1 + s2 * s2);

        //相对误差
        let E = 100 * U / average;


        return {
            'n': n,
            'datas': datas,
            'average': average,
            'variance': variance,
            'unsure': U,
            'error': E,
        }
    }

}