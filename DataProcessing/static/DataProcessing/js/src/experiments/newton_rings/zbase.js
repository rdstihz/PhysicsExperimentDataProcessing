class NewtonRings {
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
}