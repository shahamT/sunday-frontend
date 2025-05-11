//TODO find and replace - Template , template , templates , TEMPLATE , TEMPLATES

import { httpService } from "./base/http.service"
import { storageService } from "./base/async-storage.service"
import { loadFromStorage, saveToStorage } from "./base/util.service"




export const templateService = {
    query,
    getById,
    save,
    remove,
    getEmptyTemplate,
    getDefaultFilter,
}

// ===========================================================================
// ============================ REMOTE FUNCTIONS =============================
// ===========================================================================
// ========================= (local functions below) =========================
// ===========================================================================
// ========================= (synced functions below) ========================
// ===========================================================================


const BASE_URL = 'template/'


function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(templateId) {
    return httpService.get(BASE_URL + templateId)

}
function remove(templateId) {
    return httpService.delete(BASE_URL + templateId)
}

function save(template) {
    if (template._id) {
        return httpService.put(BASE_URL + template._id, template)
    } else {
        return httpService.post(BASE_URL, template)
    }
}




// ===========================================================================
// ============================ LOCAL FUNCTIONS ==============================
// ===========================================================================
// ========================= (synced functions below) ========================
// ===========================================================================


// const STORAGE_KEY = 'templateDB'

// _createTemplates()

// function query(filterBy = {}) {
//     return storageService.query(STORAGE_KEY)
//         .then(templates => {
//             if (filterBy.txt) {
//                 const regExp = new RegExp(filterBy.txt, 'i')
//                 return templates.filter(template =>
//                     regExp.test(template.vendor)
//                 )
//             }
//         })
// }

// function getById(templateId) {
//     return storageService.get(STORAGE_KEY, templateId)
// }

// function remove(templateId) {
//     return storageService.remove(STORAGE_KEY, templateId)
// }


// function save(template) {
//     if (template._id) {
//         return storageService.put(STORAGE_KEY, template)
//     } else {
//         return storageService.post(STORAGE_KEY, template)
//     }
// }

// function _createTemplates() {
//     if (!loadFromStorage(STORAGE_KEY) || loadFromStorage(STORAGE_KEY).lentgh === 0) {
//         const templates = _createDemoTemplates()
//         saveToStorage(STORAGE_KEY, templates)
//     }
// }

// function _createDemoTemplates() {
//     const templates = [
//         {
//             _id: "60ae6a1a92e5",
//             createdAt: 1744654589000,
//             removedAt: null,
//         },
//         {
//             _id: "60ae6a1a92e5",
//             createdAt: 1744654589000,
//             removedAt: null,
//         },
//     ]

//     return templates
// } 

// ===========================================================================
// ============================ SYNCED FUNCTIONS =============================
// ===========================================================================


function getEmptyTemplate() { //TODO edit this
    return {
        key1: '',
        key2: '',
        key3: '',
    }
}

function getDefaultFilter() { //TODO edit this
    return {
        txt: '',
        filter1: '',
        filter2: ''
    }
}



