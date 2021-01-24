const { describe, it, before, afterEach, beforeEach } = require('mocha')
const { expect } = require('chai')
const { createSandbox } = require('sinon')
const TodoService = require('../src/todoService')
const Todo = require('../src/todo')

const mockDatabase = [
    {
        id: '3d913a95-499e-4e7c-b752-b9fcb6c7fa98',
        text: 'Essa aqui é a tarefa 1',
        when: new Date('2021-01-24T00:00:00.000Z'),
        meta: { revision: 0, created: 1611523092017, version: 0 },
        '$loki': 1
    },
]

describe('todoService', () => {

    let sandbox

    before(() => {
        sandbox = createSandbox()
    });

    afterEach(() => {
        sandbox.restore()
    })

    describe('#list', () => {
        const mockDatabase = [
            {
                id: '3d913a95-499e-4e7c-b752-b9fcb6c7fa98',
                text: 'Essa aqui é a tarefa 1',
                when: new Date('2021-01-24T00:00:00.000Z'),
                meta: { revision: 0, created: 1611523092017, version: 0 },
                '$loki': 1
            },
        ]
        let todoService
        beforeEach(() => {
            const dependencies = {
                todoRepository: {
                    list: sandbox.stub().returns(mockDatabase)
                }
            }

            todoService = new TodoService(dependencies);
        })

        it('should return data on a specific format', () => {
            const result = todoService.list()
            const [{ meta, $loki, ...expected }] = mockDatabase
            expect(result).to.be.deep.equal([expected])
        });

    })

    describe('#create', () => {
        let todoService
        beforeEach(() => {
            const dependencies = {
                todoRepository: {
                    create: sandbox.stub().returns(true)
                }
            }

            todoService = new TodoService(dependencies);
        })

        it('should not save todo item with invalid data', () => {
            const data = new Todo({
                text: '',
                when: ''
            })

            Reflect.deleteProperty(data, "id") // deletando o objeto

            const expected = {
                error: {
                    message: 'invalid data',
                    data
                }
            }

            const result = todoService.create(data)
            expect(result).to.deep.equal(expected)
        })
        
        it('should save todo item with late status when the property is further than today', () => {
            const properties = {
                text: 'Essa aqui é a tarefa 3',
                when: new Date('2020-12-01 12:00:00 GMT-0')
            }
            
            expectedId = "000001"
            const uuid = require('uuid')
            const fakeUUID = sandbox.fake.returns(expectedId)
            sandbox.replace(uuid, 'v4', fakeUUID)

            const data = new Todo(properties)
            
            const today = new Date('2020-12-02')
            
            sandbox.useFakeTimers(today.getTime())

            todoService.create(data)

            const expected = {
                ...data,
                status: 'late'
            }

            expect(todoService.todoRepository.create.calledOnceWithExactly(expected)).to.be.ok

        })

        it('should save todo item with pending status', () => {
            const properties = {
                text: 'Essa aqui é a tarefa 3',
                when: new Date('2020-12-10 12:00:00 GMT-0')
            }
            
            expectedId = "000001"
            const uuid = require('uuid')
            const fakeUUID = sandbox.fake.returns(expectedId)
            sandbox.replace(uuid, 'v4', fakeUUID)

            const data = new Todo(properties)
            
            const today = new Date('2020-12-02')
            
            sandbox.useFakeTimers(today.getTime())

            todoService.create(data)

            const expected = {
                ...data,
                status: 'pending'
            }

            expect(todoService.todoRepository.create.calledOnceWithExactly(expected)).to.be.ok
        })

    })

})