const { describe, it, before, beforeEach, afterEach } = require('mocha')
const { expect } = require('chai')
const { createSandbox }= require('sinon')
const Todo = require('../src/todo')

describe('todo', () => {

    let sandbox
    beforeEach(() => {
        sandbox = createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('#isValid', () => {
        it('should return invalid when text is empty', () => {
            const data = {
                text: '',
                when: new Date('2021-01-24')
            }

            const todo = new Todo(data);
            const result = todo.isValid()

            expect(result).to.be.not.ok
        })

        it('should return invalid whitout "when" date or prop is empty ', () => {
            const data = {
                text: 'Melhorar testes integrados',
                when: new Date('20-01-24')
            }

            const todo = new Todo(data);
            const result = todo.isValid()

            expect(result).to.be.not.ok
        })

        it('should have "id", "text", "when" and "status" properties after creating object', () => {
            const data = {
                text: 'Melhorar testes integrados',
                when: new Date('2021-01-24')
            }

            const expectedId = '000001'

            const uuid = require('uuid')
            const fakeUUID = sandbox.fake.returns(expectedId)
            sandbox.replace(uuid, 'v4', fakeUUID)

            const todo = new Todo(data);
            const result = todo.isValid()
            const expectedItem = {
                ...todo,
                id: expectedId
            }

            expect(result).to.be.ok
            expect(uuid.v4.calledOnce).to.be.ok
            expect(todo).to.be.deep.equal(expectedItem)
        })                
    })

})