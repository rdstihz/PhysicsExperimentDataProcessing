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
        console.log(data);
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
        console.log(result);
        for (let i = 0; i < 3; i++) {
            $(`#air-cushion-acceleration${i + 1}`).html(result.a[i]);
            $(`#air-cushion-g-acceleration${i + 1}`).html(result.g[i]);
        }
        $(`#air-cushion-mean-acceleration`).html(result.g_average);
    }


}
class ElectrostaticButtonGroup {
    constructor(electrostatic_field) {
        this.electrostatic_field = electrostatic_field;
        this.$button_group = $(`
            <div class="electrostatic-field-button-group">
                <button class="electrostatic-field-button">数据输入</button>
                <button class="electrostatic-field-button" id="electrostatic-field-button-process">数据处理</button>
                <button class="electrostatic-field-button" id="electrostatic-field-button-return">返回</button>
                <button class="electrostatic-field-button">退出</button>
            </div>`);
        this.electrostatic_field.$electrostatic_field.append(this.$button_group);

        this.$bt_process = this.$button_group.find("#electrostatic-field-button-process")

        this.$bt_return = this.$button_group.find("#electrostatic-field-button-return");

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
                outer.wrok();
            }
        });

        //点击"返回"， 回到菜单
        this.$bt_return.click(function (e) {
            if(e.which === 1) {
                outer.electrostatic_field.hide();
                outer.electrostatic_field.root.menu.show();
            }
        });

    }

    //计算结果并绘图
    wrok() {
        let data = this.electrostatic_field.datainput.getInputData();

        let data1 = this.calc(data.x1, data.y1, 8);
        let data2 = this.calc(data.x2, data.y2, 8);
        let data3 = this.calc(data.x3, data.y3, 8);
        let result = {
            'data1' : data1,
            'data2' : data2,
            'data3' : data3,
        };

        //填入结果表格
        this.electrostatic_field.result.filldata(result);

        //绘制图像
        this.electrostatic_field.figure.setdata(result, data);
    }

    //给定点集，计算半径和圆心
    calc(x1, y1, n) {

        let sum_x = 0.0, sum_y = 0.0;
        let sum_x2 = 0.0, sum_y2 = 0.0;
        let sum_x3 = 0.0, sum_y3 = 0.0;
        let sum_xy = 0.0, sum_x1y2 = 0.0, sum_x2y1 = 0.0;

        let N = x1.length;
        for (let i = 0; i < N; i++) {
            let x = x1[i];
            let y = y1[i];
            let x2 = x * x;

            let y2 = y * y;
            sum_x += x;
            sum_y += y;
            sum_x2 += x2;
            sum_y2 += y2;
            sum_x3 += x2 * x;
            sum_y3 += y2 * y;
            sum_xy += x * y;
            sum_x1y2 += x * y2;
            sum_x2y1 += x2 * y;
        }


        let C = N * sum_x2 - sum_x * sum_x;
        let D = N * sum_xy - sum_x * sum_y;
        let E = N * sum_x3 + N * sum_x1y2 - (sum_x2 + sum_y2) * sum_x;
        let G = N * sum_y2 - sum_y * sum_y;
        let H = N * sum_x2y1 + N * sum_y3 - (sum_x2 + sum_y2) * sum_y;
        let a = (H * D - E * G) / (C * G - D * D);
        let b = (H * C - E * D) / (D * D - G * C);
        let c = -(a * sum_x + b * sum_y + sum_x2 + sum_y2) / N;

        let center_x = a / (-2);
        let center_y = b / (-2);
        let radius = Math.sqrt(a * a + b * b - 4 * c) / 2;
        return {
            'a': center_x,
            'b': center_y,
            'R': radius,
        }
    }


}class ElectrostatidFieldDataInput {
    constructor(electrostatic_field) {
        this.electrostatic_field = electrostatic_field;
        this.$datainput = $(`
<div class="electrostatic-field-datainput">
    <h2>数据输入： （单位：cm）</h2>
    <table border="1" class="electrostatic-field-datainput-table">
        <tr>
                <td>序数</td>
                <td>X1</td>
                <td>Y1</td>
                <td>X2</td>
                <td>Y2</td>
                <td>X3</td>
                <td>Y3</td>
            </tr>
    </table>
</div>
        `);

        //输入数据的表格
        this.$datatable = this.$datainput.find(".electrostatic-field-datainput-table");
        //向数据表格中插入行
        let x1 = [6.72, 7.44, 8.15, 7.60, 6.15, 4.15, 3.65, 4.11];
        let y1 = [10.32, 9.70, 8.30, 6.72, 5.58, 6.50, 7.42, 9.20];
        let x2 = [5.70, 9.01, 9.76, 8.72, 6.15, 3.15, 2.10, 3.83];
        let y2 = [11.70, 10.00, 7.80, 5.48, 3.93, 5.29, 8.25, 10.88];
        let x3 = [5.55, 10.22, 11.95, 9.93, 5.90, 1.25, -0.03, 1.68];
        let y3 = [14.02, 12.08, 7.60, 3.27, 2.10, 4.05, 8.14, 12.40];


        for (let i = 1; i <= 8; i++) {
            let $line = $(`
            <tr>
                <td>${i}</td>
                <td><input type="number" class="electrostatic-field-datainput-cell electrostatic-field-datainput-cell-red"
                           id="electrostatic-field-datainput-data${i}-x1" value="${x1[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell electrostatic-field-datainput-cell-red"
                           id="electrostatic-field-datainput-data${i}-y1" value="${y1[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell"
                           id="electrostatic-field-datainput-data${i}-x2" value="${x2[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell"
                           id="electrostatic-field-datainput-data${i}-y2" value="${y2[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell electrostatic-field-datainput-cell-blue"
                           id="electrostatic-field-datainput-data${i}-x3" value="${x3[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell electrostatic-field-datainput-cell-blue"
                           id="electrostatic-field-datainput-data${i}-y3" value="${y3[i - 1]}"></td>
            </tr>`);
            this.$datatable.append($line);
        }


        this.electrostatic_field.$electrostatic_field.append(this.$datainput);
        this.start();
    }

    start() {

    }

    getInputData() {
        let x1 = [], y1 = [];
        let x2 = [], y2 = [];
        let x3 = [], y3 = [];

        for (let i = 1; i <= 8; i++) {
            x1.push(+this.$datatable.find(`#electrostatic-field-datainput-data${i}-x1`).val());
            y1.push(+this.$datatable.find(`#electrostatic-field-datainput-data${i}-y1`).val());
            x2.push(+this.$datatable.find(`#electrostatic-field-datainput-data${i}-x2`).val());
            y2.push(+this.$datatable.find(`#electrostatic-field-datainput-data${i}-y2`).val());
            x3.push(+this.$datatable.find(`#electrostatic-field-datainput-data${i}-x3`).val());
            y3.push(+this.$datatable.find(`#electrostatic-field-datainput-data${i}-y3`).val());
        }

        return {
            'x1': x1,
            'y1': y1,
            'x2': x2,
            'y2': y2,
            'x3': x3,
            'y3': y3,
        };

    }


}class ElectrostaticFieldFigure {
    constructor(electrostatic_field) {
        this.electrostatic_field = electrostatic_field;
        this.$figure = $(`
            <div class="electrostatic-field-figure">
                <canvas class="electrostatic-field-figure-canvas" ></canvas>
            </div>
`);
        this.$canvas = this.$figure.find(".electrostatic-field-figure-canvas");
        this.ctx = this.$canvas[0].getContext('2d'); //2D画布
        this.electrostatic_field.$electrostatic_field.append(this.$figure);


        this.ctx.canvas.width = this.$figure.width();
        this.ctx.canvas.height = this.$figure.height();

        this.scale = Math.min(this.ctx.canvas.width, this.ctx.canvas.height) / 23;
        this.data = null;
        this.start();
    }

    start() {
        let outer = this;
        $(window).resize(function (e) {
            outer.ctx.canvas.width = outer.$figure.width();
            outer.ctx.canvas.height = outer.$figure.height();
            outer.scale = Math.min(outer.ctx.canvas.width, outer.ctx.canvas.height) / 23;
            outer.redraw();
        });
        this.redraw();
    }

    redraw() {
        //画一个方框
        this.drawRectangle();

        //绘制图像
        if (this.data && this.points) {
            let data1 = this.data.data1;
            let data2 = this.data.data2;
            let data3 = this.data.data3;


            let tx = data1.a, ty = data1.b;

            if (!tx || !ty) return;

            if (data1.a && data1.b && data1.R) {
                data1.a -= tx, data1.b -= ty;
                for (let i = 0; i < 8; i++) {
                    this.points.x1[i] -= tx;
                    this.points.y1[i] -= ty;
                }
                this.drawData(data1, this.points.x1, this.points.y1, "red");
            }

            if (data2.a && data2.b && data2.R) {
                data2.a -= tx, data2.b -= ty;
                for (let i = 0; i < 8; i++) {
                    this.points.x2[i] -= tx;
                    this.points.y2[i] -= ty;
                }
                this.drawData(data2, this.points.x2, this.points.y2, "black");
            }

            if (data3.a && data3.b && data3.R) {
                data3.a -= tx, data3.b -= ty;
                for (let i = 0; i < 8; i++) {
                    this.points.x3[i] -= tx;
                    this.points.y3[i] -= ty;
                }
                this.drawData(data3, this.points.x3, this.points.y3, "blue");
            }


        }
    }

    drawRectangle() {
        //白色背景
        this.ctx.fillStyle = "rgba(255, 255, 255, 1)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        //方框
        let x0 = this.ctx.canvas.width / 2, y0 = this.ctx.canvas.height / 2;
        this.ctx.strokeStyle = "rgba(0, 0, 0, 1)";
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();

        this.ctx.moveTo(-11 * this.scale + x0, -11 * this.scale + y0);
        this.ctx.lineTo(-11 * this.scale + x0, 11 * this.scale + y0);
        this.ctx.lineTo(11 * this.scale + x0, 11 * this.scale + y0);
        this.ctx.lineTo(11 * this.scale + x0, -11 * this.scale + y0);
        this.ctx.lineTo(-11 * this.scale + x0, -11 * this.scale + y0);

        this.ctx.stroke();
        this.ctx.closePath();


    }

    drawData(res, data_x, data_y, color) {
        let x = res.a, y = res.b, r = res.R;

        let scale = this.scale;
        let x0 = this.ctx.canvas.width / 2, y0 = this.ctx.canvas.height / 2;
        //画圆
        this.ctx.beginPath();
        this.ctx.arc(x * scale + x0, y * scale + y0, r * scale, 0, Math.PI * 2, false);
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
        this.ctx.closePath();


        //画点
        this.drawPoint(x, y, 1.5, color);
        for (let i = 0; i < 8; i++) {
            x = data_x[i], y = data_y[i], r = 1.5;
            this.drawPoint(x, y, r, color);
        }
    }

    drawPoint(x, y, r, color) {
        let scale = this.scale;
        let x0 = this.ctx.canvas.width / 2, y0 = this.ctx.canvas.height / 2;

        this.ctx.beginPath();
        this.ctx.arc(x * scale + x0, y * scale + y0, r, 0, Math.PI * 2, false);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    setdata(data, points) {
        this.data = data;
        this.points = points;
        this.redraw();
    }

}class ElectrostaticFieldResult {
    constructor(electrostatic_field) {
        this.electrostatic_field = electrostatic_field;

        this.$result = $(`
            <div class="electrostatic-field-result">
                <h2>计算结果：（圆心坐标，半径）</h2>
                <table border="1">
                    <tr>
                        <td>X0</td>
                        <td class="electrostatic-field-result-cell electrostatic-field-datainput-cell-red" id="electrostatic-field-result-data1-x0"></td>
                        <td class="electrostatic-field-result-cell" id="electrostatic-field-result-data2-x0"></td>
                        <td class="electrostatic-field-result-cell electrostatic-field-datainput-cell-blue" id="electrostatic-field-result-data3-x0"></td>
                    </tr>
        
                    <tr>
                        <td>Y0</td>
                        <td class="electrostatic-field-result-cell electrostatic-field-datainput-cell-red" id="electrostatic-field-result-data1-y0"></td>
                        <td class="electrostatic-field-result-cell" id="electrostatic-field-result-data2-y0"></td>
                        <td class="electrostatic-field-result-cell electrostatic-field-datainput-cell-blue" id="electrostatic-field-result-data3-y0"></td>
                    </tr>
        
                    <tr>
                        <td>R</td>
                        <td class="electrostatic-field-result-cell electrostatic-field-datainput-cell-red" id="electrostatic-field-result-data1-r"></td>
                        <td class="electrostatic-field-result-cell" id="electrostatic-field-result-data2-r"></td>
                        <td class="electrostatic-field-result-cell electrostatic-field-datainput-cell-blue" id="electrostatic-field-result-data3-r"></td>
                    </tr>
        
        
                </table>
            </div>`);

        this.electrostatic_field.$electrostatic_field.append(this.$result);

    }

    filldata(data) {
        //data1
        this.$result.find("#electrostatic-field-result-data1-x0").html(data.data1.a.toFixed(2));
        this.$result.find("#electrostatic-field-result-data1-y0").html(data.data1.b.toFixed(2));
        this.$result.find("#electrostatic-field-result-data1-r").html(data.data1.R.toFixed(2));

        //data2
        this.$result.find("#electrostatic-field-result-data2-x0").html(data.data2.a.toFixed(2));
        this.$result.find("#electrostatic-field-result-data2-y0").html(data.data2.b.toFixed(2));
        this.$result.find("#electrostatic-field-result-data2-r").html(data.data2.R.toFixed(2));

        //data3
        this.$result.find("#electrostatic-field-result-data3-x0").html(data.data3.a.toFixed(2));
        this.$result.find("#electrostatic-field-result-data3-y0").html(data.data3.b.toFixed(2));
        this.$result.find("#electrostatic-field-result-data3-r").html(data.data3.R.toFixed(2));
    }

}class ElectrostaticField {
    constructor(root) {
        this.root = root;
        this.$electrostatic_field = $(`
 <div class="electrostatic-field">
 <h1 class="experiment-name-title">静电场测绘实验数据处理（同轴电缆）</h1>
</div>
        `);
        this.hide();

        //数据输入区域
        this.datainput = new ElectrostatidFieldDataInput(this);
        //结果显示区域
        this.result = new ElectrostaticFieldResult(this);
        //图像显示区域
        this.figure = new ElectrostaticFieldFigure(this);
        //按键
        this.button_group = new ElectrostaticButtonGroup(this);

        this.root.$exp_sys.append(this.$electrostatic_field);

        this.start();
    }

    start() {

    }

    hide() {
        this.$electrostatic_field.hide();
    }

    show() {
        this.$electrostatic_field.show();
        this.figure.ctx.canvas.width = this.figure.$figure.width();
        this.figure.ctx.canvas.height = this.figure.$figure.height();
        this.figure.scale = Math.min(this.figure.$figure.width(), this.figure.$figure.height()) / 23;
        this.figure.redraw();
    }

}class NewtonRings {
    constructor(root) {
        this.root = root;
        this.$newton_rings = $(`
<div class="newton-rings">
    <p class="newton-rings-title">牛顿环实验数据处理</p>
    <div class="newton-rings-datainput">
        <table class="newton-ring-dateinput-table" border="1px">
            <tr>
                <td>环数</td>
                <td>左边位置<br>[mm]</td>
                <td>右边位置<br>[mm]</td>
            </tr>
            <tr>
                <td>13</td>
                <td><input type="number" class="newton-rings-left" id="newton-rings-left13"></td>
                <td><input type="number" class="newton-rings-right" id="newton-rings-right13"></td>
            </tr>
            <tr>
                <td>14</td>
                <td><input type="number" class="newton-rings-left" id="newton-rings-left14"></td>
                <td><input type="number" class="newton-rings-right" id="newton-rings-right14"></td>
            </tr>
            <tr>
                <td>15</td>
                <td><input type="number" class="newton-rings-left" id="newton-rings-left15"></td>
                <td><input type="number" class="newton-rings-right" id="newton-rings-right15"></td>
            </tr>
            <tr>
                <td>16</td>
                <td><input type="number" class="newton-rings-left" id="newton-rings-left16"></td>
                <td><input type="number" class="newton-rings-right" id="newton-rings-right16"></td>
            </tr>
            <tr>
                <td>17</td>
                <td><input type="number" class="newton-rings-left" id="newton-rings-left17"></td>
                <td><input type="number" class="newton-rings-right" id="newton-rings-right17"></td>
            </tr>
            <tr>
                <td>18</td>
                <td><input type="number" class="newton-rings-left" id="newton-rings-left18"></td>
                <td><input type="number" class="newton-rings-right" id="newton-rings-right18"></td>
            </tr>
            <tr>
                <td>19</td>
                <td><input type="number" class="newton-rings-left" id="newton-rings-left19"></td>
                <td><input type="number" class="newton-rings-right" id="newton-rings-right19"></td>
            </tr>
            <tr>
                <td>20</td>
                <td><input type="number" class="newton-rings-left" id="newton-rings-left20"></td>
                <td><input type="number" class="newton-rings-right" id="newton-rings-right20"></td>
            </tr>
            <tr>
                <td>21</td>
                <td><input type="number" class="newton-rings-left" id="newton-rings-left21"></td>
                <td><input type="number" class="newton-rings-right" id="newton-rings-right21"></td>
            </tr>
            <tr>
                <td>22</td>
                <td><input type="number" class="newton-rings-left" id="newton-rings-left22"></td>
                <td><input type="number" class="newton-rings-right" id="newton-rings-right22"></td>
            </tr>
            <tr>
                <td>23</td>
                <td><input type="number" class="newton-rings-left" id="newton-rings-left23"></td>
                <td><input type="number" class="newton-rings-right" id="newton-rings-right23"></td>
            </tr>
            <tr>
                <td>24</td>
                <td><input type="number" class="newton-rings-left" id="newton-rings-left24"></td>
                <td><input type="number" class="newton-rings-right" id="newton-rings-right24"></td>
            </tr>
        </table>
    </div>
    <div class="newton-final-btn">
        <p>
            <button class="newton-rings-final-btn">输入数据</button>&emsp;
            <button class="newton-rings-final-btn">处理数据</button>
        </p>
        <p>
            <button class="newton-rings-final-btn">返回</button>&emsp;
            <button class="newton-rings-final-btn">退出</button>
        </p>
    </div>
</div>
        `);
        this.$newton_rings.hide();
        this.root.$exp_sys.append(this.$newton_rings);
    }

    show() {
        this.$newton_rings.show();
    }

    hide() {
        this.$newton_rings.hide();
    }
}class RotationalInertia {
    constructor(root) {
        this.root = root;
        this.$rotational_inertia = $(`

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
class ViscosityCoefficientButtonGroup {
    constructor(viscosity_coefficient) {
        this.viscosity_coefficient = viscosity_coefficient;
        this.$button_group = $(`
            <div class="viscosity-coefficient-button-group">
                <button class="viscosity-coefficient-button" id="viscosity-coefficient-button-process">数据处理</button>
                <button class="viscosity-coefficient-button" id="viscosity-coefficient-button-return">返回</button>
            </div>`);
        this.viscosity_coefficient.$viscosity_coefficient.append(this.$button_group);

        this.$bt_process = this.$button_group.find("#viscosity-coefficient-button-process")

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

        //点击"返回"， 回到菜单
        this.$bt_return.click(function (e) {
            if(e.which === 1) {
                outer.viscosity_coefficient.hide();
                outer.viscosity_coefficient.root.menu.show();
            }
        });

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
        for(let i = 0; i < n; i++) {
            sx += x[i], sy += y[i];
            sxx += x[i] * x[i], syy += y[i] * y[i];
            sxy += x[i] * y[i];
        }

        //斜率
        let k = (sxy - sx * sy / n) / (sxx - sx * sx / n);
        //截距
        let b = sy / n - k * sx / n;
        //相关系数
        let r = (n * sxy - sx  * sy) / (Math.sqrt(n * sxx - sx * sx) * Math.sqrt(n * syy - sy * sy));
        //填写结果
        console.log(b, r);
        this.viscosity_coefficient.result.filldata(k, b, r);

        this.viscosity_coefficient.figure.setdata(k, b, x, y, n);

    }



}class ViscosityCoefficientDataInput {
    constructor(viscosity_coefficient) {
        this.viscosity_coefficient = viscosity_coefficient;
        this.$datainput = $(`
<div class="viscosity-coefficient-dataiinput">
    <h2 class="part-title">数据输入</h2>
    <table border="1" class="viscosity-coefficient-datainput-table">
        <tr>
            <td>
                次数
            </td>
            <td>圆筒直径D(cm)</td>
            <td>小球直径d(mm)</td>
            <td>下落时间t(S)</td>
        </tr>
        <tr>
            <td>1</td>
            <td><input type="number" value="1.400" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data1-D"></td>
            <td><input type="number" value="1.000" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data1-d"></td>
            <td><input type="number" value="57.72" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data1-t"></td>
        </tr>

        <tr>
            <td>2</td>
            <td><input type="number" value="1.900" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data2-D"></td>
            <td><input type="number" value="1.000" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data2-d"></td>
            <td><input type="number" value="55.54" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data2-t"></td>
        </tr>

        <tr>
            <td>3</td>
            <td><input type="number" value="2.400" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data3-D"></td>
            <td><input type="number" value="1.000" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data3-d"></td>
            <td><input type="number" value="54.18" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data3-t"></td>
        </tr>

        <tr>
            <td>4</td>
            <td><input type="number" value="3.400" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data4-D"></td>
            <td><input type="number" value="1.000" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data4-d"></td>
            <td><input type="number" value="52.70" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data4-t"></td>
        </tr>

        <tr>
            <td>5</td>
            <td><input type="number" value="4.000" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data5-D"></td>
            <td><input type="number" value="1.000" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data5-d"></td>
            <td><input type="number" value="52.23" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data5-t"></td>
        </tr>

        <tr>
            <td>6</td>
            <td><input type="number" value="5.000" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data6-D"></td>
            <td><input type="number" value="1.000" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data6-d"></td>
            <td><input type="number" value="51.65" class="viscosity-coefficient-dataiinput-cell" id="viscosity-coefficient-dataiinput-data6-t"></td>
        </tr>

    </table>
</div>
        `);

        this.viscosity_coefficient.$viscosity_coefficient.append(this.$datainput);

    }

    getInputData() {
        let D = [], d = [], t = [];

        for (let i = 1; i <= 6; i++) {
            D.push(+this.$datainput.find(`#viscosity-coefficient-dataiinput-data${i}-D`).val());
            d.push(+this.$datainput.find(`#viscosity-coefficient-dataiinput-data${i}-d`).val());
            t.push(+this.$datainput.find(`#viscosity-coefficient-dataiinput-data${i}-t`).val());
        }

        return {
            'D': D,
            'd': d,
            't': t,
        }
    }

}class ViscosityCoefficientFigure {
    constructor(viscosity_coefficient) {
        this.viscosity_coefficient = viscosity_coefficient;
        this.$figure = $(`
<div class="viscosity_coefficient_figure">
    <img class="viscosity_coefficient_figure_img" alt="图像">
</div>
        `);


        this.$img = this.$figure.find("img")[0];

        this.viscosity_coefficient.$viscosity_coefficient.append(this.$figure);
        this.start();
    }

    start() {

        this.redraw();
    }

    setdata(k, b, x, y, n) {
        let outer = this;
        $.ajax({
            url: "http://127.0.0.1:8000/exp/getfigure/",
            type: "GET",
            data: {
                'k': k,
                'b': b,
                'x': outer.array_to_str(x, n),
                'y': outer.array_to_str(y, n),
                'n': n,
                'state': '99787fdsf',
            },
            success: function (resp) {
                if (resp.result === "success") {
                    console.log("success");
                    outer.$img.src = resp.src;
                }
            }
        });
    }

    array_to_str(x, n) {
        let res = '';
        for (let i = 0; i < n; i++) {
            if (i) res += ','
            res += x[i];
        }
        return res;
    }

    redraw() {

    }

}class ViscosityCoefficientResult {
    constructor(viscosity_coefficient) {
        this.viscosity_coefficient = viscosity_coefficient;
        this.$result = $(`
<div class="viscosity_coefficient_result">
    <h2 class="part-title">计算结果</h2>
    
    <div class="result-title">关系式</div>
    <div class="viscosity_coefficient_result_vaule" id="viscosity_coefficient_result_vaule_equal"></div>
    
    <div class="result-title">无限广延液体中小球下落时间</div>
    <div class="viscosity_coefficient_result_vaule" id="viscosity_coefficient_result_vaule_t0"></div>
    
    <div class="result-title">相关系数</div>
    <div class="viscosity_coefficient_result_vaule" id="viscosity_coefficient_result_vaule_r"></div>
</div>
        `);

        this.viscosity_coefficient.$viscosity_coefficient.append(this.$result);

        this.$result_value_equal = this.$result.find("#viscosity_coefficient_result_vaule_equal");
        this.$result_value_t0 = this.$result.find("#viscosity_coefficient_result_vaule_t0");
        this.$result_value_r = this.$result.find("#viscosity_coefficient_result_vaule_r");
    }

    filldata(k, t0, r) {
        this.$result_value_equal.html("t = " + k.toFixed(2) + " * d / D + " + t0.toFixed(2));
        this.$result_value_t0.html(t0.toFixed(2) + 's');
        this.$result_value_r.html(r.toFixed(6));
    }
}class ViscosityCoefficient {
    constructor(root) {
        this.root = root;
        this.$viscosity_coefficient = $(`
<div class="viscosity_coefficient">
    <h1 class="experiment-name-title">粘滞系数实验数据处理</h1>
</div>
        `);
        this.datainput = new ViscosityCoefficientDataInput(this);
        this.result = new ViscosityCoefficientResult(this);
        this.figure = new ViscosityCoefficientFigure(this);
        this.buttongroup = new ViscosityCoefficientButtonGroup(this);

        this.$viscosity_coefficient.hide();
        this.root.$exp_sys.append(this.$viscosity_coefficient);
        this.start();
    }

    start() {

    }

    show() {
        this.$viscosity_coefficient.show();
    }

    hide() {
        this.$viscosity_coefficient.hide();
    }
}class ExperimentMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="experiment-menu">
    
    
    <div class="experiment-menu-title">
        <h1>物理实验数据处理平台</h1>
    </div>
    
    <a class="experiment-menu-toolbox" href="exp/calculator/">工具箱</a>
    <table class="experiment-menu-table">
        <tr>
            <td class="experiment-menu-item" id="experiment-menu-item-electrostatic-field">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/electrostatic_field.png" alt="">
                <div >静电场测绘实验数据处理</div>
            </td>
            <td class="experiment-menu-item" id="experiment-menu-item-viscosity-coefficient">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/viscosity_coefficient.png" alt="">
                <div >粘滞系数实验数据处理</div>
            </td>
            <td class="experiment-menu-item" id="experiment-menu-item-air-cushion">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/air_cushion.png" alt="">
                <div >气垫技术测量重力加速度</div>
            </td>
        </tr>
        
        <tr>
            <td class="experiment-menu-item" id="experiment-menu-item-newton-rings">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/netwon_rings.png" alt="">
                <div class="experiment-menu-item">牛顿环</div>
            </td class="experiment-menu-item">
            <td class="experiment-menu-item" id="experiment-menu-item-simple-pendlum">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/single_pendulum.png" alt="">
                <div class="experiment-menu-item">单摆</div>
            </td>
            <td class="experiment-menu-item" id="experiment-menu-item-rotational-inertia">
                <img src="http://127.0.0.1:8000/static/DataProcessing/images/torsional_pendulum.png" alt="">
                <div class="experiment-menu-item">扭摆实验————转动惯量的测量</div>
            </td>
        </tr>
        
    </table>
    

</div>
        `);

        this.root.$exp_sys.append(this.$menu);

        this.$item_electrostatic_field = this.$menu.find("#experiment-menu-item-electrostatic-field");
        this.$item_viscosity_coefficient = this.$menu.find("#experiment-menu-item-viscosity-coefficient");
        this.$item_air_cushion = this.$menu.find("#experiment-menu-item-air-cushion");
        this.$item_newton_rings = this.$menu.find("#experiment-menu-item-newton-rings");
        this.$item_simple_pendlum = this.$menu.find("#experiment-menu-item-simple-pendlum");
        this.$item_rotational_inertia = this.$menu.find("#experiment-menu-item-rotational-inertia");

        this.$item_toolbox = this.$menu.find(".experiment-menu-toolbox");

        this.start();
    }

    start() {
        let outer = this;
        this.$item_electrostatic_field.click(function (e) {
            outer.hide();
            outer.root.electrostatic_field.show();
        });

        this.$item_viscosity_coefficient.click(function (e) {
            outer.hide();
            outer.root.viscosity_coefficient.show();
        });

        this.$item_air_cushion.click(function (e) {
            window.location.replace("/exp/air_cushion/");
        });

        this.$item_newton_rings.click(function (e) {

        });
        //
        // this.$item_simple_pendlum.click(function (e) {
        //     outer.hide();
        //     outer.root.simple_pendlum.show();
        // });

        this.$item_rotational_inertia.click(function (e) {
            window.location.replace("/exp/rotational_inertia/");
        });
        //
        // this.$item_toolbox.click(function (e) {
        //     outer.hide();
        //     outer.root.toolbox.show();
        // });
    }

    show() {
        this.$menu.show();
    }

    hide() {
        this.$menu.hide();
    }

}export class Calculator {
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
        let s2 = 0.683 * delta;
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

}export class PhysicsExperimentSystem {
    constructor(id) {
        this.id = id;
        this.$exp_sys = $(`#` + id);

        //菜单页面
        this.menu = new ExperimentMenu(this);
        //this.menu.hide();
        //静电场实验
        this.electrostatic_field = new ElectrostaticField(this);
        //粘滞系数实验
        this.viscosity_coefficient = new ViscosityCoefficient(this);
        //this.viscosity_coefficient.show();

        // //气垫 重力加速度
        // this.air_cushion = new AirCushion(this);
        //
        // //牛顿环
        // this.newton_rings = new NewtonRings(this);
        //
        // //单摆
        // this.simple_pendlum = new SimplePendlum(this);
        //
        // //扭摆
        // this.rotational_inertia = new RotationalInertia(this);
        //工具箱
        // this.toolbox = new Calculator(this);

        this.start();


    }

    start() {

    }
}