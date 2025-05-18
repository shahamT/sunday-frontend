//TODO find and replace - Template , template , templates , TEMPLATE , TEMPLATES


import { templateService } from "../services/not relevent/template.service";
import { ADD_TEMPLATE, REMOVE_TEMPLATE, SET_TEMPLATES, SET_TEMPLATES_FILTER_BY, SET_TEMPLATES_IS_LOADING, UPDATE_TEMPLATE } from "../reducers/template.reducer.js";
import { store } from "../store.js";

export function loadTemplates() {
    const filterBy = store.getState().templateModule.filterBy
    store.dispatch({ type: SET_TEMPLATES_IS_LOADING, isLoading: true })
    return templateService.query(filterBy)
        .then(templates => {
            store.dispatch({ type: SET_TEMPLATES, templates })
        })
        .catch(err => {
            console.log('template action -> Cannot load templates', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_TEMPLATES_IS_LOADING, isLoading: false })
        })
}

export function removeTemplate(templateId) {
    return templateService.remove(templateId)
        .then(() => {
            store.dispatch({ type: REMOVE_TEMPLATE, templateId })
        })
        .catch(err => {
            console.log('template action -> Cannot remove template', err)
            throw err
        })
}

export function saveTemplate(template) {
    const type = template._id ? UPDATE_TEMPLATE : ADD_TEMPLATE
    return templateService.save(template)
        .then(savedTemplate => {
            console.log('savedTemplate:', savedTemplate)
            store.dispatch({ type, template: savedTemplate })
            return savedTemplate
        })
        .catch(err => {
            console.log('template action -> Cannot save template', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_TEMPLATES_FILTER_BY, filterBy })
}