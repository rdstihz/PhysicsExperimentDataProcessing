class RotationalInertia {
    constructor(root) {
        this.root = root;
        this.$rotational_inertia = $(`
<div class="rotatinoal-inertia">
    <h2 id="rotational-inertia-title">扭摆实验------转动惯量的测量</h2>
    <div class="rotational-inertia-test">
        <div class="torsional-pendulum-header">
            1.物体转动惯量的测量：
        </div>
        <table border="2px" class="torsional-pendulum-date" width="100vw">
            <tr>
                <td>物体名称</td>
                <td>质量<br>（g）</td>
                <td>外径<br>（cm）</td>
                <td>内径<br>（cm）</td>
                <td>杆长<br>（cm）</td>
                <td>周期<br>（s）</td>
                <td>转动惯量理论值<br>（kg.m²）</td>
                <td>实验值<br>（kg.m²）</td>
                <td>百分误差<br>%</td>
            </tr>
            <tr>
                <td>托盘</td>
                <td class="empty-data">/</td>
                <td class="empty-data">/</td>
                <td class="empty-data">/</td>
                <td class="empty-data">/</td>
                <td><input type="number" class="torsional-pendulum-T" id="torsional-pendulum-tuo-T"></td>
                <td class="empty-data">/</td>
                <td><input type="number" class="torsional-pendulum-test" id="torsional-pendulum-tuo-test"></td>
                <td class="empty-data">/</td>
            </tr>
            <tr>
                <td>圆柱</td>
                <td><input type="number" class="torsional-pendulum-m" id="torsional-pendulum-m-zhu"></td>
                <td><input type="number" class="torsional-pendulum-wai" id="torsional-pendulum-wai-zhu"></td>
                <td class="empty-data">/</td>
                <td class="empty-data">/</td>
                <td><input type="number" class="torsional-pendulum-T" id="torsional-pendulum-T-zhu"></td>
                <td><input type="number" class="torsional-pendulum-theory" id="torsional-pendulum-theory-zhu"></td>
                <td><input type="number" class="torsional-pendulum-test" id="torsional-pendulum-test-zhu"></td>
                <td><input type="number" class="calculation-error" id="calculation-error-zhu"></td>
            </tr>
            <tr>
                <td>圆桶</td>
                <td><input type="number" class="torsional-pendulum-m" id="torsional-pendulum-m-tong"></td>
                <td><input type="number" class="torsional-pendulum-wai" id="torsional-pendulum-wai-tong"></td>
                <td><input type="number" class="torsional-pendulum-nei" id="torsional-pendulum-nei-tong"></td>
                <td class="empty-data">/</td>
                <td><input type="number" class="torsional-pendulum-T" id="torsional-pendulum-T-tong"></td>
                <td><input type="number" class="torsional-pendulum-theory" id="torsional-pendulum-theory-tong"></td>
                <td><input type="number" class="torsional-pendulum-test" id="torsional-pendulum-test-tong"></td>
                <td><input type="number" class="calculation-error" id="calculation-error-tong"></td>
            </tr>
            <tr>
                <td>圆球</td>
                <td><input type="number" class="torsional-pendulum-m" id="torsional-pendulum-m-qiu"></td>
                <td><input type="number" class="torsional-pendulum-wai" id="torsional-pendulum-wai-qiu"></td>
                <td class="empty-data">/</td>
                <td class="empty-data">/</td>
                <td><input type="number" class="torsional-pendulum-T" id="torsional-pendulum-T-qiu"></td>
                <td><input type="number" class="torsional-pendulum-theory" id="torsional-pendulum-theory-qiu"></td>
                <td><input type="number" class="torsional-pendulum-test" id="torsional-pendulum-test-qiu"></td>
                <td><input type="number" class="calculation-error" id="calculation-error-qiu"></td>
            </tr>
            <tr>
                <td>细杆</td>
                <td><input type="number" class="torsional-pendulum-m"></td>
                <td class="empty-data">/</td>
                <td class="empty-data">/</td>
                <td><input type="number" class="torsional-pendulum-length" id="torsional-pendulum-length"></td>
                <td><input type="number" class="torsional-pendulum-T" id="torsional-pendulum-T-gan"></td>
                <td><input type="number" class="torsional-pendulum-theory" id="torsional-pendulum-theory-gan"></td>
                <td><input type="number" class="torsional-pendulum-test" id="torsional-pendulum-test-gan"></td>
                <td><input type="number" class="calculation-error" id="calculation-error-gan"></td>
            </tr>
        </table>
    </div>
    <div class="parallel-axis-theorem">
        <div class="torsional-pendulum-header">2.验证平行轴定理：</div>
        <div class="pre-measured-value" align="center">
            滑块：质量= <input type="number" id="pre-measured-date-m">g；&emsp;
            高度= <input type="number" id="pre-measured-date-h">cm;&emsp;
            外径= <input type="number" id="pre-measured-date-wai">cm;&emsp;
            内径= <input type="number" id="pre-measured-date-nei">cm
        </div>
        <table class="parallel-axis-date" border="2px" align="center">
            <tr>
                <td>位移<br>（cm）</td>
                <td>周期<br>（s）</td>
                <td>转动惯量理论值<br>（kg.m²）</td>
                <td>实验值<br>（kg.m²）</td>
                <td>百分误差<br>%</td>
            </tr>
            <tr>
                <td>5</td>
                <td><input type="number" class="parallel-axis-cycle" id="parallel-axis-cycle1"></td>
                <td><input type="number" class="parallel-axis-theory" id="parallel-axis-theory1"></td>
                <td><input type="number" class="parallel-axis-test" id="parallel-axis-test1"></td>
                <td><input type="number" class="parallel-axis-error" id="parallel-axis-error1"></td>
            </tr>
            <tr>
                <td>10</td>
                <td><input type="number" class="parallel-axis-cycle" id="parallel-axis-cycle2"></td>
                <td><input type="number" class="parallel-axis-theory" id="parallel-axis-theory2"></td>
                <td><input type="number" class="parallel-axis-test" id="parallel-axis-test2"></td>
                <td><input type="number" class="parallel-axis-error" id="parallel-axis-error2"></td>
            </tr>
            <tr>
                <td>15</td>
                <td><input type="number" class="parallel-axis-cycle" id="parallel-axis-cycle3"></td>
                <td><input type="number" class="parallel-axis-theory" id="parallel-axis-theory3"></td>
                <td><input type="number" class="parallel-axis-test" id="parallel-axis-test3"></td>
                <td><input type="number" class="parallel-axis-error" id="parallel-axis-error3"></td>
            </tr>
            <tr>
                <td>20</td>
                <td><input type="number" class="parallel-axis-cycle" id="parallel-axis-cycle4"></td>
                <td><input type="number" class="parallel-axis-theory" id="parallel-axis-theory4"></td>
                <td><input type="number" class="parallel-axis-test" id="parallel-axis-test4"></td>
                <td><input type="number" class="parallel-axis-error" id="parallel-axis-error4"></td>
            </tr>
            <tr>
                <td>25</td>
                <td><input type="number" class="parallel-axis-cycle" id="parallel-axis-cycle5"></td>
                <td><input type="number" class="parallel-axis-theory" id="parallel-axis-theory5"></td>
                <td><input type="number" class="parallel-axis-test" id="parallel-axis-test5"></td>
                <td><input type="number" class="parallel-axis-error" id="parallel-axis-error5"></td>
            </tr>
        </table>
        <div align="center">
            <button class="final-contre-btn" id="final-contre-btn1">数据输入</button>
            <button class="final-contre-btn" id="final-contre-btn2">数据处理</button>
            <button class="final-contre-btn" id="final-contre-btn3">返回</button>
            <button class="final-contre-btn" id="final-contre-btn4">退出</button>

        </div>
    </div>
</div>
`);
        this.$rotational_inertia.hide();
        this.root.$exp_sys.append(this.$rotational_inertia);
    }

    show() {
        this.$rotational_inertia.show();
    }

    hide() {
        this.$rotational_inertia.hide();
    }
}
