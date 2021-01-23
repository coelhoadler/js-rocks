const Employee = require("./employee");
const Util = require("./util");

class Manager extends Employee {

    #bonuses = 2000

    get bonuses() {
        return Util.format(this.#bonuses)
    }

    get netPay() {
        const final = Util.unformat(super.netPay) + this.#bonuses
        return Util.format(final);
        
    }

}

module.exports = Manager