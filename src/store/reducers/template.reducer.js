//TODO find and replace - Template , template , templates , TEMPLATE , TEMPLATES

import { templateService } from "../../services/template.service.js"

//* Templates
export const SET_TEMPLATES = 'SET_TEMPLATES'
export const REMOVE_TEMPLATE = 'REMOVE_TEMPLATE'
export const ADD_TEMPLATE = 'ADD_TEMPLATE'
export const UPDATE_TEMPLATE = 'UPDATE_TEMPLATE'

export const SET_TEMPLATES_FILTER_BY = 'SET_TEMPLATES_FILTER_BY'
export const SET_TEMPLATES_IS_LOADING = 'SET_TEMPLATES_IS_LOADING'

const initialState = {
    templates: [],
    isLoading: false,
    filterBy: templateService.getDefaultFilter(),
}

export function templateReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Templates
        case SET_TEMPLATES:
            return { ...state, templates: action.templates }

        case REMOVE_TEMPLATE:
            const lastTemplates = [...state.templates]
            return {
                ...state,
                templates: state.templates.filter(template => template._id !== action.templateId),
                lastTemplates
            }

        case ADD_TEMPLATE:
            return {
                ...state,
                templates: [...state.templates, action.template]
            }

        case UPDATE_TEMPLATE:
            return {
                ...state,
                templates: state.templates.map(template => template._id === action.template._id ? action.template : template)
            }

        case SET_TEMPLATES_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }

        case SET_TEMPLATES_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }

        default: return state
    }
}