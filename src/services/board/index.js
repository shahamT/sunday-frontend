const { DEV, VITE_LOCAL } = import.meta.env

import { values } from 'remirror'
import { makeId, getRandomTimestampInRange } from '../base/util.service'
import { userService } from '../user'
import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'
import { store } from '../../store/store'

function getEmptyBoard() {
    const colId1 = makeId()
    const colId2 = makeId()
    const colId3 = makeId()
    const colId4 = makeId()
    const labelId1 = makeId()
    const labelId2 = makeId()
    const board = {
        _id: '',
        // createdAt: Date.now(),
        // createdBy: userService.getLoggedinUser()?._id || null,
        name: '',
        // isStarred: false,
        // members: [{
        //     id: userService.getLoggedinUser()?._id || null,
        //     permission: 'editor'
        // }],
        activities: [],
        columns: [
            {
                id: colId1,
                createdAt: Date.now(),
                createdBy: userService.getLoggedinUser()?._id || null,
                width: 400,
                name: 'Item',
                type: { variant: 'item' }
            },
            {
                id: colId2,
                createdAt: Date.now(),
                createdBy: userService.getLoggedinUser()?._id || null,
                width: 200,
                name: 'Person',
                type: { variant: 'people' }
            },
            {
                id: colId3,
                createdAt: Date.now(),
                createdBy: userService.getLoggedinUser()?._id || null,
                width: 200,
                name: 'Status',
                type: {
                    variant: 'status', labels: [
                        { id: labelId1, name: 'Working On It', color: 'working_orange' },
                        { id: labelId2, name: 'Stuck', color: 'stuck-red' },
                        { id: makeId(), name: 'Done', color: 'done-green' },
                    ]
                }
            },
            {
                id: colId4,
                createdAt: Date.now(),
                createdBy: userService.getLoggedinUser()?._id || null,
                width: 200,
                name: 'Date',
                type: { variant: 'date' }
            },
        ],
        groups: [
            {
                id: makeId(),
                createdAt: Date.now(),
                createdBy: userService.getLoggedinUser()?._id || null,
                name: 'Group Title',
                color: 'purple',
                isCollapse: false,
                tasks: [
                    {
                        id: makeId(),
                        createdAt: Date.now(),
                        createdBy: userService.getLoggedinUser()?._id || null,
                        columnValues: [
                            {
                                colId: colId1,
                                value: 'Item 1'
                            },
                            {
                                colId: colId2,
                                value: userService.getLoggedinUser()?._id || null
                            },
                            {
                                colId: colId3,
                                value: labelId1
                            },
                            {
                                colId: colId4,
                                value: getRandomTimestampInRange(2)
                            }
                        ]
                    },
                    {
                        id: makeId(),
                        createdAt: Date.now(),
                        createdBy: userService.getLoggedinUser()?._id || null,
                        columnValues: [
                            {
                                colId: colId1,
                                value: 'Item 2'
                            },
                            {
                                colId: colId3,
                                value: labelId2
                            },
                            {
                                colId: colId4,
                                value: getRandomTimestampInRange(2)
                            }
                        ]
                    },
                    {
                        id: makeId(),
                        createdAt: Date.now(),
                        createdBy: userService.getLoggedinUser()?._id || null,
                        columnValues: [
                            {
                                colId: colId1,
                                value: 'Item 3'
                            },
                            {
                                colId: colId4,
                                value: getRandomTimestampInRange(2)
                            }
                        ]
                    },
                ]
            },
            {
                id: makeId(),
                createdAt: Date.now(),
                createdBy: userService.getLoggedinUser()?._id || null,
                name: 'Group Title',
                color: 'bright-blue',
                isCollapse: false,
                tasks: [
                    {
                        id: makeId(),
                        createdAt: Date.now(),
                        createdBy: userService.getLoggedinUser()?._id || null,
                        columnValues: [
                            {
                                colId: colId1,
                                value: 'Item 4'
                            },
                            {
                                colId: colId4,
                                value: getRandomTimestampInRange(2)
                            }
                        ]
                    },
                    {
                        id: makeId(),
                        createdAt: Date.now(),
                        createdBy: userService.getLoggedinUser()?._id || null,
                        columnValues: [
                            {
                                colId: colId1,
                                value: 'Item 5'
                            },
                            {
                                colId: colId4,
                                value: getRandomTimestampInRange(2)
                            }
                        ]
                    },
                ]
            },
        ]
    }

    return board
}

function getEmptyGroup() {
    const colorNames = boardService.getColors()
    return {
        id: makeId(),
        createdAt: Date.now(),
        createdBy: userService.getLoggedinUser()?._id || null,
        name: 'New Group',
        isCollapse: false,
        color: colorNames[Math.floor(Math.random() * colorNames.length)],
        tasks: []
    }
}

async function getEmptyTask(boardId, taskName, colId) {
    const board = structuredClone(store.getState().boardModule.board)
    return {
        id: makeId(),
        createdAt: Date.now(),
        createdBy: userService.getLoggedinUser()?._id || null,
        columnValues: [
            { colId: colId || board.columns[0].id, value: taskName }
        ]
    }
}

function getEmptyColumn(type) {
    const emptyCol = {
        id: makeId(),
        createdAt: Date.now(),
        createdBy: userService.getLoggedinUser()?._id || null,
        name: type.charAt(0).toUpperCase() + type.slice(1),
        width: 200,
        type: { variant: type }
    }

    if (type === 'status') {
        emptyCol.type = {
            ...emptyCol.type, labels: [
                { id: makeId(), name: 'Working On It', color: 'working_orange' },
                { id: makeId(), name: 'Stuck', color: 'stuck-red' },
                { id: makeId(), name: 'Done', color: 'done-green' },
            ]
        }
    } else if (type === 'dropdown') {
        emptyCol.type = { ...emptyCol.type, labels: [] }
    }

    return emptyCol
}

//TODO edit this when filter is created
function getDefaultFilter() {
    return {
        txt: '',
    }
}

const service = (VITE_LOCAL === 'true') ? local : remote
export const boardService = { getEmptyBoard, getEmptyGroup, getEmptyTask, getEmptyColumn, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.boardService = boardService
