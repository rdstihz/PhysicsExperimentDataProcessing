export class ViscosityCoefficientButtonGroup {
    constructor(viscosity_coefficient, id) {
        this.viscosity_coefficient = viscosity_coefficient;
        this.$button_group = $('#' + id);

        this.$bt_process = this.$button_group.find("#viscosity-coefficient-button-process")
        this.$bt_clear = this.$button_group.find("#viscosity-coefficient-button-clear");
        this.$bt_return = this.$button_group.find("#viscosity-coefficient-button-return");

        this.start();
    }

    start() {
        this.add_event_listener();
    }

    add_event_listener() {
        let outer = this;
        //鼠标左键点击“数据处理按键”
        this.$bt_process.on("click", function (e) {
            if (e.which === 1) {
                outer.work();
            }
        });
        this.$bt_clear.on("click", (e) => {
            this.clear_data();
        });
    }

    clear_data() {
        for (let i = 1; i <= 6; i++) {
            document.querySelector(`#viscosity-coefficient-dataiinput-data${i}-D`).value = "";
            document.querySelector(`#viscosity-coefficient-dataiinput-data${i}-d`).value = "";
            document.querySelector(`#viscosity-coefficient-dataiinput-data${i}-t`).value = "";
        }

        this.viscosity_coefficient.result.$result_value_equal.html("");
        this.viscosity_coefficient.result.$result_value_t0.html("");
        this.viscosity_coefficient.result.$result_value_r.html("");

        this.viscosity_coefficient.figure.$img.src = "";
    }

    work() {
        let data = this.viscosity_coefficient.datainput.getInputData();
        let D = data.D, d = data.d, t = data.t;
        let x = [], y = [];
        for (let i = 0; i < 6; i++) {
            x.push(d[i] / D[i] / 10);
            y.push(t[i]);
        }


        //最小二乘法拟合直线
        let sx = 0, sy = 0;
        let sxx = 0, syy = 0, sxy = 0;
        let n = 6;
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
        //填写结果
        this.viscosity_coefficient.result.filldata(k, b, r);

        this.viscosity_coefficient.figure.setdata(k, b, x, y, n);

    }


}