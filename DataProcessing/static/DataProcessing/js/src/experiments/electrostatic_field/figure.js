class ElectrostaticFieldFigure {
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
        // $(window).resize(function (e) {
        //     outer.ctx.canvas.width = outer.$figure.width();
        //     outer.ctx.canvas.height = outer.$figure.height();
        //
        //     console.log(this.$figure.width(), this.$figure.height());
        //     outer.scale = Math.min(outer.ctx.canvas.width, outer.ctx.canvas.height) / 30;
        //     outer.redraw();
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

}