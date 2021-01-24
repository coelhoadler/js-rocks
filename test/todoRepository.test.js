const { describe, it, before, afterEach } = require('mocha')
const { expect } = require('chai')
const TodoRepository = require('../src/todoRepository')
const { createSandbox } = require('sinon')

const mockDatabase = [
    {
        id: '3d913a95-499e-4e7c-b752-b9fcb6c7fa98',
        text: 'Essa aqui é a tarefa 1',
        when: new Date('2021-01-24T00:00:00.000Z'),
        meta: { revision: 0, created: 1611523092017, version: 0 },
        '$loki': 1
    },
]

describe('todoRepository', () => {

    let todoRepository
    let sandbox

    before(() => {
        todoRepository = new TodoRepository();
        sandbox = createSandbox()
    });

    afterEach(() => {
        sandbox.restore()
    })

    describe('methods signature', () => {

        it('should call find from lokijs', () => {
            const mockDatabase = [
                {
                    id: '3d913a95-499e-4e7c-b752-b9fcb6c7fa98',
                    text: 'Essa aqui é a tarefa 1',
                    when: new Date('2021-01-24T00:00:00.000Z'),
                    meta: { revision: 0, created: 1611523092017, version: 0 },
                    '$loki': 1
                },
            ]

            const fnName = 'find'
            const expected = mockDatabase

            sandbox.stub(
                todoRepository.schedule,
                fnName
            ).returns(expected);

            const result = todoRepository.list()
            expect(result).to.be.deep.equal(expected)
            expect(todoRepository.schedule[fnName].calledOnce).to.be.ok
        });


        it('should call insertOne from lokijs', () => {

            const fnName = 'insertOne'
            const expected = true

            sandbox.stub(
                todoRepository.schedule,
                fnName
            ).returns(expected);

            const data = {
                id: '239478937398278932',
                text: 'Essa aqui é a tarefa 2',
                when: new Date('2021-01-25T00:00:00.000Z'),
                meta: { revision: 0, created: 9756734564397853498, version: 0 },
                '$loki': 1
            }

            const result = todoRepository.create(data)

            expect(result).to.be.deep.equal(expected)
            expect(todoRepository.schedule[fnName]).to.be.ok
            expect(todoRepository.schedule[fnName].calledOnceWithExactly(data)).to.be.ok

        });

    })

})