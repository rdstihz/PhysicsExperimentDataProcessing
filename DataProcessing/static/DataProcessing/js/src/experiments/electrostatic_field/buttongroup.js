export class ElectrostaticButtonGroup {
    constructor(electrostatic_field, id) {
        this.electrostatic_field = electrostatic_field;
        this.$button_group = $('#' + id);

        this.$bt_process = this.$button_group.find("#electrostatic-field-button-process");
        this.$bt_clear = this.$button_group.find("#electrostatic-field-button-clear");
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

        this.$bt_clear.on("click", (e) => {
            this.clear_data();
        });

        $('#electrostatic-field-download-figure').click(e => {
            this.exportCanvasAsPNG("electrostatic-field-figure-canvas", "下载.png");
        });

    }

    //清空数据
    clear_data() {
        for (let i = 1; i <= 8; i++) {
            document.querySelector(`#electrostatic-field-datainput-data${i}-x1`).value = "";
            document.querySelector(`#electrostatic-field-datainput-data${i}-y1`).value = "";
            document.querySelector(`#electrostatic-field-datainput-data${i}-x2`).value = "";
            document.querySelector(`#electrostatic-field-datainput-data${i}-y2`).value = "";
            document.querySelector(`#electrostatic-field-datainput-data${i}-x3`).value = "";
            document.querySelector(`#electrostatic-field-datainput-data${i}-y3`).value = "";
        }

        //填入结果表格
        this.electrostatic_field.result.clear_data();

        //绘制图像
        this.electrostatic_field.figure.clear_data();

    }

    //计算结果并绘图
    wrok() {
        let data = this.electrostatic_field.datainput.getInputData();
        let data1 = this.calc(data.x1, data.y1, 8);
        let data2 = this.calc(data.x2, data.y2, 8);
        let data3 = this.calc(data.x3, data.y3, 8);
        let result = {
            'data1': data1,
            'data2': data2,
            'data3': data3,
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

    //canvas下载图片
    exportCanvasAsPNG(id, fileName) {
        let canvasElement = document.getElementById(id);
        let MIME_TYPE = "image/png";
        let imgURL = canvasElement.toDataURL(MIME_TYPE);
        let dlLink = document.createElement('a');
        dlLink.download = fileName;
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
    }
}