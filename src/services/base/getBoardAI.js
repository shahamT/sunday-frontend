export function getBoardAI() {
  
  return {
    activities: [
    ],
    columns: [
      {
        id: "col-item",
        name: "Task",
        createdAt: 1747046146,
        createdBy: "682d9bdb00f2a05b9a68d06b",
        width: 457,
        type: { variant: "item" }
      },
      {
        id: "col-task-type",
        name: "Task Type",
        createdAt: 1747391746,
        createdBy: "682d9bdb00f2a05b9a68d06b",
        width: 170,
        type: {
          variant: "status",
          labels: [
            { id: "type_landscaping",  name: "Landscaping",  color: "grass_green"   },
            { id: "type_construction", name: "Construction", color: "working_orange"},
            { id: "type_cleaning",     name: "Cleaning",     color: "bubble"        },
            { id: "type_electrical",   name: "Electrical",   color: "chili-blue"    }
          ]
        }
      },
      {
        id: "col-assigned",
        name: "Assigned",
        createdAt: 1745663746,
        createdBy: "682d9bdb00f2a05b9a68d06b",
        width: 80,
        type: { variant: "people" }
      },
      {
        id: "col-priority",
        name: "Priority",
        createdAt: 1746786946,
        createdBy: "682d9bdb00f2a05b9a68d06b",
        width: 120,
        type: {
          variant: "status",
          labels: [
            { id: "prio_high",   name: "High",   color: "dark-red" },
            { id: "prio_medium", name: "Medium", color: "sunset"   },
            { id: "prio_low",    name: "Low",    color: "bright-green" }
          ]
        }
      },
      {
        id: "col-est-cost",
        name: "Estimated Cost",
        createdAt: 1745145346,
        createdBy: "682d9bdb00f2a05b9a68d06b",
        width: 80,
        type: { variant: "number" }
      },
      {
        id: "col-due",
        name: "Due Date",
        createdAt: 1742985346,
        createdBy: "682d9bdb00f2a05b9a68d06b",
        width: 100,
        type: { variant: "date" }
      }
    ],
    groups: [
      /* -------------------------------------------------- */
      /*  Plants                                            */
      /* -------------------------------------------------- */
      {
        id: "grp-929379",
        name: "Plants",
        color: "blackish",
        isCollapsed: false,
        createdBy: "682d9bdb00f2a05b9a68d06b",
        createdAt: 1747391746,
        tasks: [
          {
            id: "tsk-6bb0113f",
            createdAt: 1747305346,
            createdBy: "682d9bdb00f2a05b9a68d06b",
            columnValues: [
              { colId: "col-item",      value: "Plant lavender and rosemary along walkway" },
              { colId: "col-task-type", value: "type_cleaning"                             },
              { colId: "col-priority",  value: "prio_medium"                               }
            ],
            updates: []
          },
          {
            id: "tsk-1d668332",
            createdAt: 1745490946,
            createdBy: "682d9bdb00f2a05b9a68d06b",
            columnValues: [
              { colId: "col-item",      value: "Add mulch to flower beds" },
              { colId: "col-task-type", value: "type_electrical"          },
              { colId: "col-priority",  value: "prio_low"                 }
            ],
            updates: []
          }
        ]
      },
      /* -------------------------------------------------- */
      /*  Pool Area                                         */
      /* -------------------------------------------------- */
      {
        id: "grp-942801",
        name: "Pool Area",
        color: "lipstick",
        isCollapsed: false,
        createdBy: "682d9bdb00f2a05b9a68d06b",
        createdAt: 1745490946,
        tasks: [
          {
            id: "tsk-d07599bb",
            createdAt: 1745922946,
            createdBy: "682d9bdb00f2a05b9a68d06b",
            columnValues: [
              { colId: "col-item",      value: "Clean and refill pool" },
              { colId: "col-task-type", value: "type_cleaning"         },
              { colId: "col-priority",  value: "prio_medium"           }
            ],
            updates: []
          },
          {
            id: "tsk-db659cb0",
            createdAt: 1746182146,
            createdBy: "682d9bdb00f2a05b9a68d06b",
            columnValues: [
              { colId: "col-item",      value: "Install poolside lighting" },
              { colId: "col-task-type", value: "type_electrical"           },
              { colId: "col-priority",  value: "prio_medium"               }
            ],
            updates: []
          },
          {
            id: "tsk-85e9a061",
            createdAt: 1745663746,
            createdBy: "682d9bdb00f2a05b9a68d06b",
            columnValues: [
              { colId: "col-item",      value: "Install drip irrigation system" },
              { colId: "col-task-type", value: "type_cleaning"                  },
              { colId: "col-priority",  value: "prio_low"                       }
            ],
            updates: []
          },
          {
            id: "tsk-e340ad13",
            createdAt: 1746786946,
            createdBy: "682d9bdb00f2a05b9a68d06b",
            columnValues: [
              { colId: "col-item",      value: "Repair pool deck cracks" },
              { colId: "col-task-type", value: "type_construction"       },
              { colId: "col-priority",  value: "prio_high"               }
            ],
            updates: []
          }
        ]
      },
      /* -------------------------------------------------- */
      /*  Fence Work                                        */
      /* -------------------------------------------------- */
      {
        id: "grp-ab2267",
        name: "Fence Work",
        color: "dark_indigo",
        isCollapsed: false,
        createdBy: "682d9bdb00f2a05b9a68d06b",
        createdAt: 1745663746,
        tasks: [
          {
            id: "tsk-e62c7cc2",
            createdAt: 1745663746,
            createdBy: "682d9bdb00f2a05b9a68d06b",
            columnValues: [
              { colId: "col-item",      value: "Replace broken wooden panels" },
              { colId: "col-task-type", value: "type_cleaning"                },
              { colId: "col-priority",  value: "prio_low"                     }
            ],
            updates: []
          },
          {
            id: "tsk-f9fae8e8",
            createdAt: 1747737346,
            createdBy: "682d9bdb00f2a05b9a68d06b",
            columnValues: [
              { colId: "col-item",      value: "Paint perimeter fence dark brown" },
              { colId: "col-task-type", value: "type_construction"                },
              { colId: "col-priority",  value: "prio_low"                         }
            ],
            updates: []
          },
          {
            id: "tsk-1689e582",
            createdAt: 1746873346,
            createdBy: "682d9bdb00f2a05b9a68d06b",
            columnValues: [
              { colId: "col-item",      value: "Add gate lock system" },
              { colId: "col-task-type", value: "type_cleaning"        },
              { colId: "col-priority",  value: "prio_high"            }
            ],
            updates: []
          }
        ]
      },
      /* -------------------------------------------------- */
      /*  General                                           */
      /* -------------------------------------------------- */
      {
        id: "grp-24e88d",
        name: "General",
        color: "coffee",
        isCollapsed: false,
        createdBy: "682d9bdb00f2a05b9a68d06b",
        createdAt: 1746441346,
        tasks: [
          {
            id: "tsk-2ece7396",
            createdAt: 1745663746,
            createdBy: "682d9bdb00f2a05b9a68d06b",
            columnValues: [
              { colId: "col-item",      value: "Install motion sensor lights" },
              { colId: "col-task-type", value: "type_landscaping"             },
              { colId: "col-priority",  value: "prio_low"                     }
            ],
            updates: []
          },
          {
            id: "tsk-eacfee8f",
            createdAt: 1747478146,
            createdBy: "682d9bdb00f2a05b9a68d06b",
            columnValues: [
              { colId: "col-item",      value: "Remove construction debris" },
              { colId: "col-task-type", value: "type_cleaning"              },
              { colId: "col-priority",  value: "prio_high"                  }
            ],
            updates: []
          },
          {
            id: "tsk-b2cfcb1d",
            createdAt: 1745231746,
            createdBy: "682d9bdb00f2a05b9a68d06b",
            columnValues: [
              { colId: "col-item",      value: "Level and reseed lawn" },
              { colId: "col-task-type", value: "type_electrical"       },
              { colId: "col-priority",  value: "prio_low"              }
            ],
            updates: []
          }
        ]
      }
    ],
    isStarred: false,
    pos: 3,
    account: "acc001",
    createdBy: "682d9bdb00f2a05b9a68d06b",
    members: [
      { _id: "682d9bdb00f2a05b9a68d06b", permission: "editor" }
    ],
    createdAt: "2025-05-21T10:37:06.000Z"
  };
}
