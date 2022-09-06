class ViscosityCoefficientDataInput {
    constructor(viscosity_coefficient) {
        this.viscosity_coefficient = viscosity_coefficient;
        this.$datainput = $(`
<div>
    <h2>数据输入</h2>
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

        for(let i = 1; i <= 6; i++) {
            D.push(+this.$datainput.find(`#viscosity-coefficient-dataiinput-data${i}-D`).val());
            d.push(+this.$datainput.find(`#viscosity-coefficient-dataiinput-data${i}-d`).val());
            t.push(+this.$datainput.find(`#viscosity-coefficient-dataiinput-data${i}-t`).val());
        }

        return {
            'D' : D,
            'd' : d,
            't' : t,
        }
    }

}