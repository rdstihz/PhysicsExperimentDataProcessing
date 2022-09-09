class SimplePendlum {
    constructor(root) {
        this.root = root;
        this.$simple_pendlum = $(`
<div class="simple-pendulm">
    <h2 class="simple-pendulum-title">单摆实验数据处理</h2>
    <div class="simple-pendulum-date">
        <p>实验数据</p>
        <table class="simple-pendulum-date-form" border="2px">
            <tr>
                <td>次数</td>
                <td>摆长（cm）</td>
                <td>50次时间t(s)</td>
            </tr>
            <tr>
                <td>1</td>
                <td><input type="number" class="simple-pendulum-length" id="simple-pendulum-length1"></td>
                <td><input type="number" class="simple-oendulum-cycle" id="simple-oendulum-cycle1"></td>
            </tr>
            <tr>
                <td>2</td>
                <td><input type="number" class="simple-pendulum-length" id="simple-pendulum-length2"></td>
                <td><input type="number" class="simple-oendulum-cycle" id="simple-oendulum-cycle2"></td>
            </tr>
            <tr>
                <td>3</td>
                <td><input type="number" class="simple-pendulum-length" id="simple-pendulum-length3"></td>
                <td><input type="number" class="simple-oendulum-cycle" id="simple-oendulum-cycle3"></td>
            </tr>
            <tr>
                <td>4</td>
                <td><input type="number" class="simple-pendulum-length" id="simple-pendulum-length4"></td>
                <td><input type="number" class="simple-oendulum-cycle" id="simple-oendulum-cycle4"></td>
            </tr>
            <tr>
                <td>5</td>
                <td><input type="number" class="simple-pendulum-length" id="simple-pendulum-length5"></td>
                <td><input type="number" class="simple-oendulum-cycle" id="simple-oendulum-cycle5"></td>
            </tr>
        </table>

    </div>
    <div class="simple-pendulum-result">
        <p class="simple-pendulum-tip">
            与上海地区标准值979.4cm/S²比较所得
        </p>
        <p>重力加速度=cm/s²&emsp;
            百分误差=%
        </p>
        <p>截距=cm&emsp;
            相关系数=
        </p>
    </div>
    <div class="final-btn" align="center">
        <button class="final-operate-btn" id="final-btn1">输入数据</button>
        <button class="final-operate-btn" id="final-btn2">处理数据</button>
        <button class="final-operate-btn" id="final-btn3">返回</button>
        <button class="final-operate-btn" id="final-btn4">退出</button>
    </div>
</div>
`);
        this.$simple_pendlum.hide();
        this.root.$exp_sys.append(this.$simple_pendlum);
    }

    show() {
        this.$simple_pendlum.show();
    }

    hide() {
        this.$simple_pendlum.hide();
    }
}
