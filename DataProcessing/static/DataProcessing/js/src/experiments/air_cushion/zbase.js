class AirCushion {
    constructor(root) {
        this.root = root;
        this.$air_cushion = $(`
            <div class="air-cushion">
    <h2 class="air-cushion-title">气垫技术测量重力加速度实验数据处理</h2>
    <div class="air-cushion-date">
        <div class="air-cushion-date-pre">
            实验数据：&emsp;
            S: <input type="number" name="S">[cm]&emsp;
            L: <input type="number" name="L">[cm]&emsp;
            ΔL： <input type="number" name="ΔL">[cm]
        </div>

        <table border="1px" class="air-cushion-date-all" align="center">
            <tr>
                <td>高度h</td>
                <td>下滑t1（ms）</td>
                <td>下滑t2(ms)</td>
                <td>上滑t1(ms)</td>
                <td>上滑t2(ms)</td>
            </tr>
            <tr>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-h1"></td>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-down1-1"></td>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-down2-1"></td>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-up1-1"></td>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-up2-1"></td>
            </tr>
            <tr>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-h2"></td>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-down1-2"></td>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-down2-2"></td>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-up1-2"></td>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-up2-2"></td>
            </tr>
            <tr>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-h3"></td>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-down1-3"></td>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-down2-3"></td>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-up1-3"></td>
                <td><input type="number" class="air-cushion-date-test" id="air-cushion-date-up2-3"></td>
            </tr>
        </table>
    </div>
    <div id="air-cushion-result">计算结果:</div>

    <table border="1px" class="air-cushion-date-result">
        <tr>
            <td>高度h</td>
            <td class="acc">加速度(cm/s²)</td>
            <td class="acc">重力加速度(cm/s²)</td>
        </tr>
        <tr>
            <td>h1</td>
            <td class="air-cushion-date-result-accelerated-velocity" id="air-cushion-acceleration1"></td>
            <td class="air-cushion-gravitational-acceleration" id="air-cushion-g-acceleration1"></td>
        </tr>
        <tr>
            <td>h2</td>
            <td class="air-cushion-date-result-accelerated-velocity" id="air-cushion-acceleration2"></td>
            <td class="air-cushion-gravitational-acceleration" id="air-cushion-g-acceleration2"></td>
        </tr>
    </table>

    <div class="air-cushion-final-result">
        <p class="air-cushion-conclusion">
            平均重力加速度G： <input type="number" name="mean-acceleration">[cm/s²]
        </p>

        <p class="air-cushion-conclusion">
            相对误差E= <input type="number" name="relative-error">
        </p>
        <p class="worth-notice">
            请按有效数字规则记录运算结果!
        </p>
    </div>

    <div class="air-cushion-operate-btn">
        <input type="button" name="btn1" value="数据输入">&emsp;
        <input type="button" name="btn2" value="计算">&emsp;
        <input type="button" name="btn3" value="结果打印">&emsp;
        <input type="button" name="btn4" value="返回">&emsp;
        <input type="button" name="btn5" value="退出">
    </div>
</div>
`);
        this.$air_cushion.hide();
        this.root.$exp_sys.append(this.$air_cushion);
    }

    show() {
        this.$air_cushion.show();
    }

    hide() {
        this.$air_cushion.hide();
    }
}
