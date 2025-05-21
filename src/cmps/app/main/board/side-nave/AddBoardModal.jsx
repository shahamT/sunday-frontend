// === Libs
import { useEffect, useState } from "react"
import { boardService } from "../../../../../services/board"
import { addBoard } from "../../../../../store/actions/board.actions"
import { useNavigate } from "react-router-dom"
import { showErrorMsg } from "../../../../../services/base/event-bus.service"
import { updateUser } from "../../../../../store/actions/user.actions"
import { closeGlobalModal } from "../../../../../store/actions/app.actions"

// === Services

// === Actions

// === Hooks / React


// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function AddBoardModal() {
    // ===== ai yard makeover 2025 ====
    function getBoardAI() {
        return {
            "_id": {
                "$oid": "682dacd2feddf89f7843ddf3"
            },
            "name": "Yard Makeover 2025",
            "activities": [
                {
                    "type": "move task",
                    "taskId": "tsk-85e9a061",
                    "fromGroupId": "grp-929379",
                    "toGroupId": "grp-942801",
                    "id": "D8gej",
                    "createdAt": 1747826245266,
                    "createdBy": "https://lh3.googleusercontent.com/a/ACg8ocLF1gclRdl9f_zwY6lFjbL4rrsbCO7HU_94y6FsLb3S1w2tv87l=s96-c"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-b2cfcb1d",
                    "colId": "col-due",
                    "value": 1750415972000,
                    "id": "cbalB",
                    "createdAt": 1747823974117,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-eacfee8f",
                    "colId": "col-due",
                    "value": 1750847970000,
                    "id": "GxV84",
                    "createdAt": 1747823972008,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-2ece7396",
                    "colId": "col-due",
                    "value": 1751107167000,
                    "id": "RzExR",
                    "createdAt": 1747823969803,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-1689e582",
                    "colId": "col-due",
                    "value": 1751020764000,
                    "id": "EZPV2",
                    "createdAt": 1747823966626,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-f9fae8e8",
                    "colId": "col-due",
                    "value": 1750329562000,
                    "id": "QpUFN",
                    "createdAt": 1747823964117,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-e62c7cc2",
                    "colId": "col-due",
                    "value": 1749811159000,
                    "id": "c5mDz",
                    "createdAt": 1747823962217,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-e340ad13",
                    "colId": "col-due",
                    "value": 1748255958000,
                    "id": "EtKpO",
                    "createdAt": 1747823958944,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-db659cb0",
                    "colId": "col-due",
                    "value": 1748083156000,
                    "id": "OVGgO",
                    "createdAt": 1747823957396,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-d07599bb",
                    "colId": "col-due",
                    "value": 1748515154000,
                    "id": "O2QY8",
                    "createdAt": 1747823955870,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-1d668332",
                    "colId": "col-due",
                    "value": 1748687953000,
                    "id": "sIaKM",
                    "createdAt": 1747823954193,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-85e9a061",
                    "colId": "col-due",
                    "value": 1748428751000,
                    "id": "euPaC",
                    "createdAt": 1747823952664,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-6bb0113f",
                    "colId": "col-due",
                    "value": 1748515148000,
                    "id": "Yizhz",
                    "createdAt": 1747823951119,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-6bb0113f",
                    "colId": "col-due",
                    "prevValue": 1745490946,
                    "id": "ZZKkY",
                    "createdAt": 1747823947281,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-85e9a061",
                    "colId": "col-due",
                    "prevValue": 1747132546,
                    "id": "tW98c",
                    "createdAt": 1747823946940,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-1d668332",
                    "colId": "col-due",
                    "prevValue": 1746095746,
                    "id": "H6Fa3",
                    "createdAt": 1747823946325,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-d07599bb",
                    "colId": "col-due",
                    "prevValue": 1747564546,
                    "id": "Bkuyw",
                    "createdAt": 1747823944327,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-db659cb0",
                    "colId": "col-due",
                    "prevValue": 1745404546,
                    "id": "bcrDU",
                    "createdAt": 1747823943832,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-e340ad13",
                    "colId": "col-due",
                    "prevValue": 1747391746,
                    "id": "5SNwX",
                    "createdAt": 1747823943109,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-e62c7cc2",
                    "colId": "col-due",
                    "prevValue": 1745577346,
                    "id": "lzb3P",
                    "createdAt": 1747823940954,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-f9fae8e8",
                    "colId": "col-due",
                    "prevValue": 1745318146,
                    "id": "yuich",
                    "createdAt": 1747823939380,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-1689e582",
                    "colId": "col-due",
                    "prevValue": 1745836546,
                    "id": "AO8j2",
                    "createdAt": 1747823938831,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-2ece7396",
                    "colId": "col-due",
                    "prevValue": 1746441346,
                    "id": "NArZE",
                    "createdAt": 1747823938285,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-eacfee8f",
                    "colId": "col-due",
                    "prevValue": 1746268546,
                    "id": "6FiQZ",
                    "createdAt": 1747823937910,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-b2cfcb1d",
                    "colId": "col-due",
                    "prevValue": 1746095746,
                    "id": "CwDc0",
                    "createdAt": 1747823937413,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-b2cfcb1d",
                    "colId": "col-assigned",
                    "value": [
                        {
                            "_id": "682d9bdf00f2a05b9a68d073",
                            "account": "acc001",
                            "email": "noa.levi@gmail.com",
                            "firstName": "Noa",
                            "lastName": "Levi",
                            "profileImg": "https://untitledui.com/images/avatars/florence-shaw",
                            "role": "user",
                            "isGoogleUser": false,
                            "lastViewedBoards": [],
                            "createdAt": "2025-05-21T09:24:47.000Z"
                        }
                    ],
                    "prevValue": [],
                    "id": "vZerX",
                    "createdAt": 1747823918787,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-eacfee8f",
                    "colId": "col-assigned",
                    "value": [
                        {
                            "_id": "682d9bdf00f2a05b9a68d073",
                            "account": "acc001",
                            "email": "noa.levi@gmail.com",
                            "firstName": "Noa",
                            "lastName": "Levi",
                            "profileImg": "https://untitledui.com/images/avatars/florence-shaw",
                            "role": "user",
                            "isGoogleUser": false,
                            "lastViewedBoards": [],
                            "createdAt": "2025-05-21T09:24:47.000Z"
                        }
                    ],
                    "prevValue": [],
                    "id": "DmTT6",
                    "createdAt": 1747823917393,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-2ece7396",
                    "colId": "col-assigned",
                    "value": [
                        {
                            "_id": "682d9bdf00f2a05b9a68d073",
                            "account": "acc001",
                            "email": "noa.levi@gmail.com",
                            "firstName": "Noa",
                            "lastName": "Levi",
                            "profileImg": "https://untitledui.com/images/avatars/florence-shaw",
                            "role": "user",
                            "isGoogleUser": false,
                            "lastViewedBoards": [],
                            "createdAt": "2025-05-21T09:24:47.000Z"
                        }
                    ],
                    "prevValue": [],
                    "id": "uYQn8",
                    "createdAt": 1747823916006,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-1689e582",
                    "colId": "col-assigned",
                    "value": [
                        {
                            "_id": "682d9bdc00f2a05b9a68d06e",
                            "account": "acc001",
                            "email": "sophie.dubois@outlook.com",
                            "firstName": "Sophie",
                            "lastName": "Dubois",
                            "profileImg": "https://untitledui.com/images/avatars/natali-craig",
                            "role": "user",
                            "isGoogleUser": false,
                            "lastViewedBoards": [],
                            "createdAt": "2025-05-21T09:24:44.000Z"
                        }
                    ],
                    "prevValue": [],
                    "id": "Fo5F4",
                    "createdAt": 1747823909999,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-f9fae8e8",
                    "colId": "col-assigned",
                    "value": [
                        {
                            "_id": "682d9bdc00f2a05b9a68d06e",
                            "account": "acc001",
                            "email": "sophie.dubois@outlook.com",
                            "firstName": "Sophie",
                            "lastName": "Dubois",
                            "profileImg": "https://untitledui.com/images/avatars/natali-craig",
                            "role": "user",
                            "isGoogleUser": false,
                            "lastViewedBoards": [],
                            "createdAt": "2025-05-21T09:24:44.000Z"
                        }
                    ],
                    "prevValue": [],
                    "id": "Bp5vd",
                    "createdAt": 1747823906875,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-e62c7cc2",
                    "colId": "col-assigned",
                    "value": [
                        {
                            "_id": "682d9bdc00f2a05b9a68d06e",
                            "account": "acc001",
                            "email": "sophie.dubois@outlook.com",
                            "firstName": "Sophie",
                            "lastName": "Dubois",
                            "profileImg": "https://untitledui.com/images/avatars/natali-craig",
                            "role": "user",
                            "isGoogleUser": false,
                            "lastViewedBoards": [],
                            "createdAt": "2025-05-21T09:24:44.000Z"
                        }
                    ],
                    "prevValue": [],
                    "id": "jIA7F",
                    "createdAt": 1747823905289,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-e340ad13",
                    "colId": "col-assigned",
                    "value": [
                        {
                            "_id": "682d9bdd00f2a05b9a68d070",
                            "account": "acc001",
                            "email": "emily.johnson@hotmail.com",
                            "firstName": "Emily",
                            "lastName": "Johnson",
                            "profileImg": "https://untitledui.com/images/avatars/nala-goins",
                            "role": "user",
                            "isGoogleUser": false,
                            "lastViewedBoards": [],
                            "createdAt": "2025-05-21T09:24:45.000Z"
                        }
                    ],
                    "prevValue": [],
                    "id": "hi8oA",
                    "createdAt": 1747823900703,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-db659cb0",
                    "colId": "col-assigned",
                    "value": [
                        {
                            "_id": "682d9bdd00f2a05b9a68d070",
                            "account": "acc001",
                            "email": "emily.johnson@hotmail.com",
                            "firstName": "Emily",
                            "lastName": "Johnson",
                            "profileImg": "https://untitledui.com/images/avatars/nala-goins",
                            "role": "user",
                            "isGoogleUser": false,
                            "lastViewedBoards": [],
                            "createdAt": "2025-05-21T09:24:45.000Z"
                        }
                    ],
                    "prevValue": [],
                    "id": "nldly",
                    "createdAt": 1747823899342,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-d07599bb",
                    "colId": "col-assigned",
                    "value": [
                        {
                            "_id": "682d9bdd00f2a05b9a68d070",
                            "account": "acc001",
                            "email": "emily.johnson@hotmail.com",
                            "firstName": "Emily",
                            "lastName": "Johnson",
                            "profileImg": "https://untitledui.com/images/avatars/nala-goins",
                            "role": "user",
                            "isGoogleUser": false,
                            "lastViewedBoards": [],
                            "createdAt": "2025-05-21T09:24:45.000Z"
                        }
                    ],
                    "prevValue": [],
                    "id": "hTBs0",
                    "createdAt": 1747823897228,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-1d668332",
                    "colId": "col-assigned",
                    "value": [
                        {
                            "_id": "682d9bdd00f2a05b9a68d06f",
                            "account": "acc001",
                            "email": "tamar.avraham@hotmail.com",
                            "firstName": "Tamar",
                            "lastName": "Avraham",
                            "profileImg": "https://untitledui.com/images/avatars/sophia-perez",
                            "role": "user",
                            "isGoogleUser": false,
                            "lastViewedBoards": [],
                            "createdAt": "2025-05-21T09:24:45.000Z"
                        }
                    ],
                    "prevValue": [],
                    "id": "rk7L6",
                    "createdAt": 1747823894773,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-85e9a061",
                    "colId": "col-assigned",
                    "value": [
                        {
                            "_id": "682d9bdd00f2a05b9a68d06f",
                            "account": "acc001",
                            "email": "tamar.avraham@hotmail.com",
                            "firstName": "Tamar",
                            "lastName": "Avraham",
                            "profileImg": "https://untitledui.com/images/avatars/sophia-perez",
                            "role": "user",
                            "isGoogleUser": false,
                            "lastViewedBoards": [],
                            "createdAt": "2025-05-21T09:24:45.000Z"
                        }
                    ],
                    "prevValue": [],
                    "id": "6tpBA",
                    "createdAt": 1747823893292,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                },
                {
                    "type": "set column value",
                    "taskId": "tsk-6bb0113f",
                    "colId": "col-assigned",
                    "value": [
                        {
                            "_id": "682d9bdd00f2a05b9a68d06f",
                            "account": "acc001",
                            "email": "tamar.avraham@hotmail.com",
                            "firstName": "Tamar",
                            "lastName": "Avraham",
                            "profileImg": "https://untitledui.com/images/avatars/sophia-perez",
                            "role": "user",
                            "isGoogleUser": false,
                            "lastViewedBoards": [],
                            "createdAt": "2025-05-21T09:24:45.000Z"
                        }
                    ],
                    "prevValue": [],
                    "id": "ZJilf",
                    "createdAt": 1747823891490,
                    "createdBy": "https://untitledui.com/images/avatars/orlando-diggs"
                }
            ],
            "columns": [
                {
                    "id": "col-item",
                    "name": "Task",
                    "createdAt": 1747046146,
                    "createdBy": "682d9bdb00f2a05b9a68d06b",
                    "width": 457,
                    "type": {
                        "variant": "item"
                    }
                },
                {
                    "id": "col-assigned",
                    "name": "Assigned",
                    "createdAt": 1745663746,
                    "createdBy": "682d9bdb00f2a05b9a68d06b",
                    "width": 137,
                    "type": {
                        "variant": "people"
                    }
                },
                {
                    "id": "col-est-cost",
                    "name": "Estimated Cost",
                    "createdAt": 1745145346,
                    "createdBy": "682d9bdb00f2a05b9a68d06b",
                    "width": 140,
                    "type": {
                        "variant": "number"
                    }
                },
                {
                    "id": "col-priority",
                    "name": "Priority",
                    "createdAt": 1746786946,
                    "createdBy": "682d9bdb00f2a05b9a68d06b",
                    "width": 120,
                    "type": {
                        "variant": "status",
                        "labels": [
                            {
                                "id": "prio_high",
                                "name": "High",
                                "color": "dark-red"
                            },
                            {
                                "id": "prio_medium",
                                "name": "Medium",
                                "color": "sunset"
                            },
                            {
                                "id": "prio_low",
                                "name": "Low",
                                "color": "bright-green"
                            }
                        ]
                    }
                },
                {
                    "id": "col-task-type",
                    "name": "Task Type",
                    "createdAt": 1747391746,
                    "createdBy": "682d9bdb00f2a05b9a68d06b",
                    "width": 170,
                    "type": {
                        "variant": "status",
                        "labels": [
                            {
                                "id": "type_landscaping",
                                "name": "Landscaping",
                                "color": "grass_green"
                            },
                            {
                                "id": "type_construction",
                                "name": "Construction",
                                "color": "working_orange"
                            },
                            {
                                "id": "type_cleaning",
                                "name": "Cleaning",
                                "color": "bubble"
                            },
                            {
                                "id": "type_electrical",
                                "name": "Electrical",
                                "color": "chili-blue"
                            }
                        ]
                    }
                },
                {
                    "id": "col-due",
                    "name": "Due Date",
                    "createdAt": 1742985346,
                    "createdBy": "682d9bdb00f2a05b9a68d06b",
                    "width": 155,
                    "type": {
                        "variant": "date"
                    }
                }
            ],
            "groups": [
                {
                    "id": "grp-929379",
                    "name": "Plants",
                    "color": "blackish",
                    "isCollapsed": false,
                    "createdBy": "682d9bdb00f2a05b9a68d06b",
                    "createdAt": 1747391746,
                    "tasks": [
                        {
                            "id": "tsk-6bb0113f",
                            "createdAt": 1747305346,
                            "createdBy": "682d9bdb00f2a05b9a68d06b",
                            "columnValues": [
                                {
                                    "colId": "col-item",
                                    "value": "Plant lavender and rosemary along walkway"
                                },
                                {
                                    "colId": "col-task-type",
                                    "value": "type_cleaning"
                                },
                                {
                                    "colId": "col-est-cost",
                                    "value": 1552
                                },
                                {
                                    "colId": "col-assigned",
                                    "value": [
                                        {
                                            "_id": "682d9bdd00f2a05b9a68d06f",
                                            "account": "acc001",
                                            "email": "tamar.avraham@hotmail.com",
                                            "firstName": "Tamar",
                                            "lastName": "Avraham",
                                            "profileImg": "https://untitledui.com/images/avatars/sophia-perez",
                                            "role": "user",
                                            "isGoogleUser": false,
                                            "lastViewedBoards": [],
                                            "createdAt": "2025-05-21T09:24:45.000Z"
                                        }
                                    ]
                                },
                                {
                                    "colId": "col-priority",
                                    "value": "prio_medium"
                                },
                                {
                                    "colId": "col-due",
                                    "value": 1748515148000
                                }
                            ],
                            "updates": []
                        },
                        {
                            "id": "tsk-1d668332",
                            "createdAt": 1745490946,
                            "createdBy": "682d9bdb00f2a05b9a68d06b",
                            "columnValues": [
                                {
                                    "colId": "col-item",
                                    "value": "Add mulch to flower beds"
                                },
                                {
                                    "colId": "col-task-type",
                                    "value": "type_electrical"
                                },
                                {
                                    "colId": "col-est-cost",
                                    "value": 166
                                },
                                {
                                    "colId": "col-assigned",
                                    "value": [
                                        {
                                            "_id": "682d9bdd00f2a05b9a68d06f",
                                            "account": "acc001",
                                            "email": "tamar.avraham@hotmail.com",
                                            "firstName": "Tamar",
                                            "lastName": "Avraham",
                                            "profileImg": "https://untitledui.com/images/avatars/sophia-perez",
                                            "role": "user",
                                            "isGoogleUser": false,
                                            "lastViewedBoards": [],
                                            "createdAt": "2025-05-21T09:24:45.000Z"
                                        }
                                    ]
                                },
                                {
                                    "colId": "col-priority",
                                    "value": "prio_low"
                                },
                                {
                                    "colId": "col-due",
                                    "value": 1748687953000
                                }
                            ],
                            "updates": []
                        }
                    ]
                },
                {
                    "id": "grp-942801",
                    "name": "Pool Area",
                    "color": "lipstick",
                    "isCollapsed": false,
                    "createdBy": "682d9bdb00f2a05b9a68d06b",
                    "createdAt": 1745490946,
                    "tasks": [
                        {
                            "id": "tsk-d07599bb",
                            "createdAt": 1745922946,
                            "createdBy": "682d9bdb00f2a05b9a68d06b",
                            "columnValues": [
                                {
                                    "colId": "col-item",
                                    "value": "Clean and refill pool"
                                },
                                {
                                    "colId": "col-task-type",
                                    "value": "type_cleaning"
                                },
                                {
                                    "colId": "col-est-cost",
                                    "value": 367
                                },
                                {
                                    "colId": "col-assigned",
                                    "value": [
                                        {
                                            "_id": "682d9bdd00f2a05b9a68d070",
                                            "account": "acc001",
                                            "email": "emily.johnson@hotmail.com",
                                            "firstName": "Emily",
                                            "lastName": "Johnson",
                                            "profileImg": "https://untitledui.com/images/avatars/nala-goins",
                                            "role": "user",
                                            "isGoogleUser": false,
                                            "lastViewedBoards": [],
                                            "createdAt": "2025-05-21T09:24:45.000Z"
                                        }
                                    ]
                                },
                                {
                                    "colId": "col-priority",
                                    "value": "prio_medium"
                                },
                                {
                                    "colId": "col-due",
                                    "value": 1748515154000
                                }
                            ],
                            "updates": []
                        },
                        {
                            "id": "tsk-db659cb0",
                            "createdAt": 1746182146,
                            "createdBy": "682d9bdb00f2a05b9a68d06b",
                            "columnValues": [
                                {
                                    "colId": "col-item",
                                    "value": "Install poolside lighting"
                                },
                                {
                                    "colId": "col-task-type",
                                    "value": "type_electrical"
                                },
                                {
                                    "colId": "col-est-cost",
                                    "value": 860
                                },
                                {
                                    "colId": "col-assigned",
                                    "value": [
                                        {
                                            "_id": "682d9bdd00f2a05b9a68d070",
                                            "account": "acc001",
                                            "email": "emily.johnson@hotmail.com",
                                            "firstName": "Emily",
                                            "lastName": "Johnson",
                                            "profileImg": "https://untitledui.com/images/avatars/nala-goins",
                                            "role": "user",
                                            "isGoogleUser": false,
                                            "lastViewedBoards": [],
                                            "createdAt": "2025-05-21T09:24:45.000Z"
                                        }
                                    ]
                                },
                                {
                                    "colId": "col-priority",
                                    "value": "prio_medium"
                                },
                                {
                                    "colId": "col-due",
                                    "value": 1748083156000
                                }
                            ],
                            "updates": []
                        },
                        {
                            "id": "tsk-85e9a061",
                            "createdAt": 1745663746,
                            "createdBy": "682d9bdb00f2a05b9a68d06b",
                            "columnValues": [
                                {
                                    "colId": "col-item",
                                    "value": "Install drip irrigation system"
                                },
                                {
                                    "colId": "col-task-type",
                                    "value": "type_cleaning"
                                },
                                {
                                    "colId": "col-est-cost",
                                    "value": 1433
                                },
                                {
                                    "colId": "col-assigned",
                                    "value": [
                                        {
                                            "_id": "682d9bdd00f2a05b9a68d06f",
                                            "account": "acc001",
                                            "email": "tamar.avraham@hotmail.com",
                                            "firstName": "Tamar",
                                            "lastName": "Avraham",
                                            "profileImg": "https://untitledui.com/images/avatars/sophia-perez",
                                            "role": "user",
                                            "isGoogleUser": false,
                                            "lastViewedBoards": [],
                                            "createdAt": "2025-05-21T09:24:45.000Z"
                                        }
                                    ]
                                },
                                {
                                    "colId": "col-priority",
                                    "value": "prio_low"
                                },
                                {
                                    "colId": "col-due",
                                    "value": 1748428751000
                                }
                            ],
                            "updates": []
                        },
                        {
                            "id": "tsk-e340ad13",
                            "createdAt": 1746786946,
                            "createdBy": "682d9bdb00f2a05b9a68d06b",
                            "columnValues": [
                                {
                                    "colId": "col-item",
                                    "value": "Repair pool deck cracks"
                                },
                                {
                                    "colId": "col-task-type",
                                    "value": "type_construction"
                                },
                                {
                                    "colId": "col-est-cost",
                                    "value": 1182
                                },
                                {
                                    "colId": "col-assigned",
                                    "value": [
                                        {
                                            "_id": "682d9bdd00f2a05b9a68d070",
                                            "account": "acc001",
                                            "email": "emily.johnson@hotmail.com",
                                            "firstName": "Emily",
                                            "lastName": "Johnson",
                                            "profileImg": "https://untitledui.com/images/avatars/nala-goins",
                                            "role": "user",
                                            "isGoogleUser": false,
                                            "lastViewedBoards": [],
                                            "createdAt": "2025-05-21T09:24:45.000Z"
                                        }
                                    ]
                                },
                                {
                                    "colId": "col-priority",
                                    "value": "prio_high"
                                },
                                {
                                    "colId": "col-due",
                                    "value": 1748255958000
                                }
                            ],
                            "updates": []
                        }
                    ]
                },
                {
                    "id": "grp-ab2267",
                    "name": "Fence Work",
                    "color": "dark_indigo",
                    "isCollapsed": false,
                    "createdBy": "682d9bdb00f2a05b9a68d06b",
                    "createdAt": 1745663746,
                    "tasks": [
                        {
                            "id": "tsk-e62c7cc2",
                            "createdAt": 1745663746,
                            "createdBy": "682d9bdb00f2a05b9a68d06b",
                            "columnValues": [
                                {
                                    "colId": "col-item",
                                    "value": "Replace broken wooden panels"
                                },
                                {
                                    "colId": "col-task-type",
                                    "value": "type_cleaning"
                                },
                                {
                                    "colId": "col-est-cost",
                                    "value": 1795
                                },
                                {
                                    "colId": "col-assigned",
                                    "value": [
                                        {
                                            "_id": "682d9bdc00f2a05b9a68d06e",
                                            "account": "acc001",
                                            "email": "sophie.dubois@outlook.com",
                                            "firstName": "Sophie",
                                            "lastName": "Dubois",
                                            "profileImg": "https://untitledui.com/images/avatars/natali-craig",
                                            "role": "user",
                                            "isGoogleUser": false,
                                            "lastViewedBoards": [],
                                            "createdAt": "2025-05-21T09:24:44.000Z"
                                        }
                                    ]
                                },
                                {
                                    "colId": "col-priority",
                                    "value": "prio_low"
                                },
                                {
                                    "colId": "col-due",
                                    "value": 1749811159000
                                }
                            ],
                            "updates": []
                        },
                        {
                            "id": "tsk-f9fae8e8",
                            "createdAt": 1747737346,
                            "createdBy": "682d9bdb00f2a05b9a68d06b",
                            "columnValues": [
                                {
                                    "colId": "col-item",
                                    "value": "Paint perimeter fence dark brown"
                                },
                                {
                                    "colId": "col-task-type",
                                    "value": "type_construction"
                                },
                                {
                                    "colId": "col-est-cost",
                                    "value": 1476
                                },
                                {
                                    "colId": "col-assigned",
                                    "value": [
                                        {
                                            "_id": "682d9bdc00f2a05b9a68d06e",
                                            "account": "acc001",
                                            "email": "sophie.dubois@outlook.com",
                                            "firstName": "Sophie",
                                            "lastName": "Dubois",
                                            "profileImg": "https://untitledui.com/images/avatars/natali-craig",
                                            "role": "user",
                                            "isGoogleUser": false,
                                            "lastViewedBoards": [],
                                            "createdAt": "2025-05-21T09:24:44.000Z"
                                        }
                                    ]
                                },
                                {
                                    "colId": "col-priority",
                                    "value": "prio_low"
                                },
                                {
                                    "colId": "col-due",
                                    "value": 1750329562000
                                }
                            ],
                            "updates": []
                        },
                        {
                            "id": "tsk-1689e582",
                            "createdAt": 1746873346,
                            "createdBy": "682d9bdb00f2a05b9a68d06b",
                            "columnValues": [
                                {
                                    "colId": "col-item",
                                    "value": "Add gate lock system"
                                },
                                {
                                    "colId": "col-task-type",
                                    "value": "type_cleaning"
                                },
                                {
                                    "colId": "col-est-cost",
                                    "value": 120
                                },
                                {
                                    "colId": "col-assigned",
                                    "value": [
                                        {
                                            "_id": "682d9bdc00f2a05b9a68d06e",
                                            "account": "acc001",
                                            "email": "sophie.dubois@outlook.com",
                                            "firstName": "Sophie",
                                            "lastName": "Dubois",
                                            "profileImg": "https://untitledui.com/images/avatars/natali-craig",
                                            "role": "user",
                                            "isGoogleUser": false,
                                            "lastViewedBoards": [],
                                            "createdAt": "2025-05-21T09:24:44.000Z"
                                        }
                                    ]
                                },
                                {
                                    "colId": "col-priority",
                                    "value": "prio_high"
                                },
                                {
                                    "colId": "col-due",
                                    "value": 1751020764000
                                }
                            ],
                            "updates": []
                        }
                    ]
                },
                {
                    "id": "grp-24e88d",
                    "name": "General",
                    "color": "coffee",
                    "isCollapsed": false,
                    "createdBy": "682d9bdb00f2a05b9a68d06b",
                    "createdAt": 1746441346,
                    "tasks": [
                        {
                            "id": "tsk-2ece7396",
                            "createdAt": 1745663746,
                            "createdBy": "682d9bdb00f2a05b9a68d06b",
                            "columnValues": [
                                {
                                    "colId": "col-item",
                                    "value": "Install motion sensor lights"
                                },
                                {
                                    "colId": "col-task-type",
                                    "value": "type_landscaping"
                                },
                                {
                                    "colId": "col-est-cost",
                                    "value": 705
                                },
                                {
                                    "colId": "col-assigned",
                                    "value": [
                                        {
                                            "_id": "682d9bdf00f2a05b9a68d073",
                                            "account": "acc001",
                                            "email": "noa.levi@gmail.com",
                                            "firstName": "Noa",
                                            "lastName": "Levi",
                                            "profileImg": "https://untitledui.com/images/avatars/florence-shaw",
                                            "role": "user",
                                            "isGoogleUser": false,
                                            "lastViewedBoards": [],
                                            "createdAt": "2025-05-21T09:24:47.000Z"
                                        }
                                    ]
                                },
                                {
                                    "colId": "col-priority",
                                    "value": "prio_low"
                                },
                                {
                                    "colId": "col-due",
                                    "value": 1751107167000
                                }
                            ],
                            "updates": []
                        },
                        {
                            "id": "tsk-eacfee8f",
                            "createdAt": 1747478146,
                            "createdBy": "682d9bdb00f2a05b9a68d06b",
                            "columnValues": [
                                {
                                    "colId": "col-item",
                                    "value": "Remove construction debris"
                                },
                                {
                                    "colId": "col-task-type",
                                    "value": "type_cleaning"
                                },
                                {
                                    "colId": "col-est-cost",
                                    "value": 1494
                                },
                                {
                                    "colId": "col-assigned",
                                    "value": [
                                        {
                                            "_id": "682d9bdf00f2a05b9a68d073",
                                            "account": "acc001",
                                            "email": "noa.levi@gmail.com",
                                            "firstName": "Noa",
                                            "lastName": "Levi",
                                            "profileImg": "https://untitledui.com/images/avatars/florence-shaw",
                                            "role": "user",
                                            "isGoogleUser": false,
                                            "lastViewedBoards": [],
                                            "createdAt": "2025-05-21T09:24:47.000Z"
                                        }
                                    ]
                                },
                                {
                                    "colId": "col-priority",
                                    "value": "prio_high"
                                },
                                {
                                    "colId": "col-due",
                                    "value": 1750847970000
                                }
                            ],
                            "updates": []
                        },
                        {
                            "id": "tsk-b2cfcb1d",
                            "createdAt": 1745231746,
                            "createdBy": "682d9bdb00f2a05b9a68d06b",
                            "columnValues": [
                                {
                                    "colId": "col-item",
                                    "value": "Level and reseed lawn"
                                },
                                {
                                    "colId": "col-task-type",
                                    "value": "type_electrical"
                                },
                                {
                                    "colId": "col-est-cost",
                                    "value": 1875
                                },
                                {
                                    "colId": "col-assigned",
                                    "value": [
                                        {
                                            "_id": "682d9bdf00f2a05b9a68d073",
                                            "account": "acc001",
                                            "email": "noa.levi@gmail.com",
                                            "firstName": "Noa",
                                            "lastName": "Levi",
                                            "profileImg": "https://untitledui.com/images/avatars/florence-shaw",
                                            "role": "user",
                                            "isGoogleUser": false,
                                            "lastViewedBoards": [],
                                            "createdAt": "2025-05-21T09:24:47.000Z"
                                        }
                                    ]
                                },
                                {
                                    "colId": "col-priority",
                                    "value": "prio_low"
                                },
                                {
                                    "colId": "col-due",
                                    "value": 1750415972000
                                }
                            ],
                            "updates": []
                        }
                    ]
                }
            ],
            "isStarred": false,
            "pos": 3,
            "account": "acc001",
            "createdBy": "682d9bdb00f2a05b9a68d06b",
            "members": [
                {
                    "_id": "682d9bdb00f2a05b9a68d06b",
                    "permission": "editor"
                }
            ],
            "createdAt": "2025-05-21T10:37:06.000Z"
        }

    }




    // === Consts
    const [newBoard, setNewBoard] = useState('')
    const navigate = useNavigate()
    const [isAi, setAi] = useState(false)
    // === Effects
    useEffect(() => {
        const board = boardService.getEmptyBoard()
        setNewBoard({ ...board, name: 'New Board' })
    }, [])

    // === Functions
    function hendleChange({ target }) {
        const field = target.name
        let value = target.value
        setNewBoard(prevNewBoard => ({ ...prevNewBoard, [field]: value }))
    }

    // ===== ai yard makeover 2025 ====
    async function handleAiBoardCreation(ev) {
        const yard = getBoardAI()
        const aiBoard = cleanMongoDBObject(yard)
        ev.preventDefault()
        try {
            const savedBoard = await addBoard(aiBoard)
            updateUser(savedBoard._id)
            closeGlobalModal()
            navigate(`/app/board/${savedBoard._id}`)
        }
        catch (err) {
            console.error('Save failed')
            showErrorMsg('Save failed')
        }


    }

    function cleanMongoDBObject(obj) {
        if (Array.isArray(obj)) {
            return obj.map(cleanMongoDBObject)
        } else if (obj && typeof obj === 'object') {
            if ('$oid' in obj) return obj.$oid
            if ('$date' in obj) return new Date(obj.$date)

            const cleaned = {}
            for (const key in obj) {
                cleaned[key] = cleanMongoDBObject(obj[key])
            }
            return cleaned
        } else {
            return obj
        }
    }






    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            const savedBoard = await addBoard(newBoard)
            updateUser(savedBoard._id)
            closeGlobalModal()
            navigate(`/app/board/${savedBoard._id}`)
        }
        catch (err) {
            console.error('Save failed')
            showErrorMsg('Save failed')
        }
    }

    const { name } = newBoard
    return (
        <section className="add-board-modal">
            <button className="close-btn clickable clear size-32 i-Close" onClick={() => closeGlobalModal()} />
            <form onSubmit={onSubmit}>
                <h1 className="title-add-modal">Create Board</h1>

                {!isAi ? <>
                    <p className="title">Board name</p>
                    <input type="text" name="name" value={name || ''} autoFocus onChange={hendleChange}
                    />
                </>
               : <p className="title">Use AI to Create Board</p>
                }
                    {isAi &&
                        <textarea className="ai-textarea"
                            name="aiBoardPrompt"
                            // value={prompt}
                            // onChange={handleChange}
                            // onClick={getFakeAiBoard}
                            placeholder="Describe the board you need. For example: 
                            'Plan a marketing campaign for a new product'"
                            rows={4}
                        />}
                <section>

                    {isAi ?  <button type="button" className="ai-btn clickable i-UserDomain icon-start clear size-48" onClick={() => setAi(false)}> Create board by yourself</button> 
                   : <button type="button" className="ai-btn clickable i-Robot icon-start clear size-48" onClick={() => setAi(true)}> Create board with ai</button>}

                </section>
                <p className="new-board-encourage">Let’s get you started with a fresh new board!</p>
                <section className="closer">
                <div className="divider" />
                <div className="add-board-btns">
                    <div className="cancel-btn clickable clear size-40" onClick={(ev) => {
                        ev.stopPropagation()
                        closeGlobalModal()
                    }}>Cancel</div>
                    <div className="create-btn clickable filled size-40" onClick={isAi ? handleAiBoardCreation : onSubmit} >Create Board</div>
                </div>
               </section>
            </form>
        </section>
    )
}