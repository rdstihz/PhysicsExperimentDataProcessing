class ViscosityCoefficientResult {
    constructor(viscosity_coefficient) {
        this.viscosity_coefficient = viscosity_coefficient;
        this.$result = $(`
<div class="viscosity_coefficient_result">
    <h2>计算结果</h2>
    
    <div>关系式</div>
    <div class="viscosity_coefficient_result_vaule" id="viscosity_coefficient_result_vaule_equal"></div>
    
    <div>无限广延液体中小球下落时间</div>
    <div class="viscosity_coefficient_result_vaule" id="viscosity_coefficient_result_vaule_t0"></div>
    
    <div>相关系数</div>
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
}