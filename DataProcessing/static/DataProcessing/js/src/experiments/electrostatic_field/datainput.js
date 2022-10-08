export class ElectrostatidFieldDataInput {
    constructor(electrostatic_field, id) {
        this.electrostatic_field = electrostatic_field;
        this.$datainput = $('#' + id);

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
                <td><input type="number" class="electrostatic-field-datainput-cell electrostatic-field-datainput-cell-red form-control"
                           id="electrostatic-field-datainput-data${i}-x1" value="${x1[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell electrostatic-field-datainput-cell-red form-control"
                           id="electrostatic-field-datainput-data${i}-y1" value="${y1[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell form-control"
                           id="electrostatic-field-datainput-data${i}-x2" value="${x2[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell form-control"
                           id="electrostatic-field-datainput-data${i}-y2" value="${y2[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell electrostatic-field-datainput-cell-blue form-control"
                           id="electrostatic-field-datainput-data${i}-x3" value="${x3[i - 1]}"></td>
                <td><input type="number" class="electrostatic-field-datainput-cell electrostatic-field-datainput-cell-blue form-control"
                           id="electrostatic-field-datainput-data${i}-y3" value="${y3[i - 1]}"></td>
            </tr>`);
            this.$datatable.append($line);
        }

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


}