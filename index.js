const Employee = require("./employee");
const Manager = require("./manager");
const Util = require("./util");
const assert = require('assert');

const GENDER = {
    male: 'male',
    female: 'female'
}

{
    const employee = new Employee({
        name: 'Adler Coelho',
        gender: GENDER.male
    });

    console.log(employee.name)
    console.log(employee.grossPay)
    assert.throws(() => employee.birthYear, {message: 'You must define age first!!'})
}

const CURRENT_YEAR = 2021
Date.prototype.getFullYear = () => CURRENT_YEAR

{
    const employee = new Employee({
        name: 'Adriane Coelho',
        age: 27,
        gender: GENDER.female
    });

    assert.deepStrictEqual(employee.name, 'Ms. Adriane Coelho')
    assert.deepStrictEqual(employee.age, undefined)
    assert.deepStrictEqual(employee.gender, undefined)
    assert.deepStrictEqual(employee.grossPay, Util.format(5000.40))
    assert.deepStrictEqual(employee.netPay, Util.format(4000.32))

    const expectedBirthYear = 1994
    assert.deepStrictEqual(employee.birthYear, expectedBirthYear)

    employee.birthYear = new Date().getFullYear() - 80 // 1941
    assert.deepStrictEqual(employee.birthYear, expectedBirthYear)

    employee.age = 80
    
    console.log('\n ------------> employee')
    console.log('employee.name', employee.name)
    console.log('employee.age', employee.age)
    console.log('employee.gender', employee.gender)
    console.log('employee.grossPay', employee.grossPay)
    console.log('employee.netPay', employee.netPay)
}

{
    const manager = new Manager({
        name: 'Naldo',
        age: 52,
        gender: GENDER.male
    })

    // manager.age = 72

    assert.deepStrictEqual(manager.name, 'Mr. Naldo')
    assert.deepStrictEqual(manager.age, undefined)
    assert.deepStrictEqual(manager.gender, undefined)
    assert.deepStrictEqual(manager.birthYear, 1969)
    assert.deepStrictEqual(manager.grossPay, Util.format(5000.40))
    assert.deepStrictEqual(manager.bonuses, Util.format(2000))
    assert.deepStrictEqual(manager.netPay, Util.format(6000.32))

    console.log('\n ------------> manager')
    console.log('manager.name', manager.name)
    console.log('manager.age', undefined)
    console.log('manager.gender', manager.gender)
    console.log('manager.bonuses', manager.bonuses)
    console.log('manager.grossPay', manager.grossPay)
    console.log('manager.netPay', manager.netPay)    
}
