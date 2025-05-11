const { DEV, VITE_LOCAL } = import.meta.env

// import { getRandomIntInclusive, makeId } from '../util.service'

import { boardService as local } from './board.service.local'
import { boardService as remote } from './board.service.remote'

function getEmptyBoard(name) {
	return {
        _id: '',
        name: name,
        // column: getDefaultColumns()
	}
}

function getEmptyGroup() {

}

function getEmptyTask() {

}

function getEmptyColumn(type) {

}

//TODO edit this when filter is created
function getDefaultFilter() { 
    return {
        txt: '',
        sortField: 'pos',
        sortDir: 1,
    }
}

const service = (VITE_LOCAL === 'true') ? local : remote
export const boardService = { getEmptyBoard, getEmptyGroup, getEmptyTask, getEmptyColumn, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.boardService = boardService
