class ElectrostaticButtonGroup {
    constructor(electrostatic_field) {
        this.electrostatic_field = electrostatic_field;
        this.$button_group = $(`
            <div class="electrostatic-field-button-group">
                <button class="electrostatic-field-button">数据输入</button>
                <button class="electrostatic-field-button" id="electrostatic-field-button-process">数据处理</button>
                <button class="electrostatic-field-button">返回</button>
                <button class="electrostatic-field-button">退出</button>
            </div>`);
        this.electrostatic_field.$electrostatic_field.append(this.$button_group);

        this.$bt_process = this.$button_group.find("#electrostatic-field-button-process")

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
                <td><input type="number" class="electrostatic-field-datainput-cell"
                           id="electrostatic-field-datainput-data${i}-x1" value="${x1[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell"
                           id="electrostatic-field-datainput-data${i}-y1" value="${y1[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell"
                           id="electrostatic-field-datainput-data${i}-x2" value="${x2[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell"
                           id="electrostatic-field-datainput-data${i}-y2" value="${y2[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell"
                           id="electrostatic-field-datainput-data${i}-x3" value="${x3[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell"
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
            <div class="electrostatic-field-figure" style="width: 300px; height: 300px">
                <canvas class="electrostatic-field-figure-canvas" style="background: aqua; width: 100%; height: 100%"></canvas>
            </div>
`);
        this.$canvas = this.$figure.find(".electrostatic-field-figure-canvas");
        this.ctx = this.$canvas[0].getContext('2d'); //2D画布
        this.electrostatic_field.$electrostatic_field.append(this.$figure);


        this.ctx.canvas.width = this.$figure.width();
        this.ctx.canvas.height = this.$figure.height();
        console.log(this.ctx.canvas.width, this.ctx.canvas.height);


        this.scale = Math.min(this.ctx.canvas.width, this.ctx.canvas.height) / 23;
        this.data = null;
        this.start();
    }

    start() {
        // this.$figure.resize(function (e) {
        //     this.ctx.canvas.width = this.$figure.width;
        //     this.ctx.canvas.height = this.$figure.height;
        //
        //     this.scale = Math.min(this.ctx.canvas.width, this.ctx.canvas.height) / 30;
        //     this.redraw();
        // });
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
        console.log("Draw");
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
        console.log(x, y);
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
                        <td class="electrostatic-field-result-cell" id="electrostatic-field-result-data1-x0"></td>
                        <td class="electrostatic-field-result-cell" id="electrostatic-field-result-data2-x0"></td>
                        <td class="electrostatic-field-result-cell" id="electrostatic-field-result-data3-x0"></td>
                    </tr>
        
                    <tr>
                        <td>Y0</td>
                        <td class="electrostatic-field-result-cell" id="electrostatic-field-result-data1-y0"></td>
                        <td class="electrostatic-field-result-cell" id="electrostatic-field-result-data2-y0"></td>
                        <td class="electrostatic-field-result-cell" id="electrostatic-field-result-data3-y0"></td>
                    </tr>
        
                    <tr>
                        <td>R</td>
                        <td class="electrostatic-field-result-cell" id="electrostatic-field-result-data1-r"></td>
                        <td class="electrostatic-field-result-cell" id="electrostatic-field-result-data2-r"></td>
                        <td class="electrostatic-field-result-cell" id="electrostatic-field-result-data3-r"></td>
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
        console.log(this.datainput.getInputData());
    }

}export class PhysicsExperimentSystem {
    constructor(id) {
        this.id = id;
        this.$exp_sys = $(`#` + id);

        //静电场实验
        this.electrostatic_field = new ElectrostaticField(this);
        this.electrostatic_field.show();
        this.start();
    }

    start() {

    }
}