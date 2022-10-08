export class ElectrostaticFieldResult {
    constructor(electrostatic_field, id) {
        this.electrostatic_field = electrostatic_field;

        this.$result = $('#' + id);


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

}