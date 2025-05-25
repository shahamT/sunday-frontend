import OpenAI from "openai";
import Ajv from "ajv";
import addFormats from "ajv-formats";

// import boardSchema from "./boardSchema.json";
import { useSelector } from "react-redux";


export function DevPage1({ }) {
    const openai = new OpenAI({
        apiKey: "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",
        dangerouslyAllowBrowser: true,
    })

    const userPrompt = 'board about running to win my city elections'
    const boardName = 'my ai board'
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const boardSchema = null



    async function generateBoard(userPrompt, boardName, user) {

        const { _id: userId, account: userAccount } = user

        /* ░1  Board skeleton in the system prompt ░ */
        const skeleton = {
            name: "",
            account: userAccount,          // ⚑ required & pre-filled
            createdBy: userId,             // ⚑ required & pre-filled
            activities: [],
            columns: [
                {
                    id: "col-item",
                    name: "Task",
                    width: 450,
                    createdAt: 1746961477549,
                    createdBy: userId,
                    type: { variant: "item" }
                },
                {
                    id: "col-status",
                    name: "Status",
                    width: 140,
                    createdAt: 1746961477549,
                    createdBy: userId,
                    type: {
                        variant: "status",
                        labels: [
                            { id: "stat_inprog", name: "In Progress", color: "grass_green" },
                            { id: "stat_done", name: "Done", color: "done-green" }
                        ]
                    }
                },
                /* …4–6 more columns… */
            ],
            groups: [
                {
                    id: "grp-example",
                    name: "Example Group",
                    color: "teal",
                    isCollapsed: false,
                    createdAt: 1746961477549,
                    createdBy: userId,
                    tasks: [
                        {
                            id: "tsk-1",
                            createdAt: 1746961477549,
                            createdBy: userId,
                            columnValues: [
                                { colId: "col-item", value: "Example task A" },
                                { colId: "col-status", value: "stat_inprog" },
                                { colId: "col-date", value: 1746961477549 }
                            ],
                            updates: []
                        },
                        {
                            id: "tsk-2",
                            createdAt: 1746961477549,
                            createdBy: userId,
                            columnValues: [
                                { colId: "col-item", value: "Example task B" },
                                { colId: "col-status", value: "stat_done" },
                                { colId: "col-date", value: 1746961477549 }
                            ],
                            updates: []
                        },
                        {
                            id: "tsk-3",
                            createdAt: 1746961477549,
                            createdBy: userId,
                            columnValues: [
                                { colId: "col-item", value: "Example task C" },
                                { colId: "col-status", value: "stat_inprog" },
                                { colId: "col-date", value: 1746961477549 }
                            ],
                            updates: []
                        }
                    ]
                }
            ],
            isStarred: false,
            createdAt: 1746961477549
        };

        const systemPrompt = `
You are an API that produces JSON for a task-management board.
Return ONE object that matches this skeleton (exact keys, no extras):

${JSON.stringify(skeleton, null, 2)}

Rules — strict:
• Add 4–7 additional columns (status|people|date|text|number|file)
• Board must contain 3–5 groups. Each group must contain 3–6 tasks
• All colours must come from: grass_green, done-green, … (full list)
• All dates must be Unix-epoch milliseconds (e.g. 1746961477549)
• Every "createdBy" field must equal **${userId}**
• The board-level "account" must equal **${userAccount}**
• people / file columns must have NO values in any task
• updates array always []
Return raw JSON only – no markdown fences, no wrapper object
`.trim();

        const { choices } = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0,
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ]
        });

        const raw = choices[0].message.content;
        console.log("%c🟡 Raw JSON string from OpenAI ↓", "color:orange;font-weight:bold");
        console.log(raw);          // <-- exactly as received (may contain \n)

        /* --- 2️⃣  Pretty-print helper (optional) ---------------------- */
        try {
            const pretty = JSON.stringify(JSON.parse(raw), null, 2);
            console.log("%c🟢 Pretty-printed preview ↓", "color:green;font-weight:bold");
            console.log(pretty);
        } catch (err) {
            console.warn("Raw output was not valid JSON:", err);
        }

        const board = JSON.parse(raw);
        board.name = boardName;
        board.account = userAccount;
        board.createdBy = userId;
        board.createdAt = Date.now();

        board.columns.forEach(c => (c.createdBy = userId));
        board.groups.forEach(g => {
            g.createdBy = userId;
            g.tasks.forEach(t => (t.createdBy = userId));
        });

        /* ░3 Validate ░ */
        const ajv = new Ajv({ allErrors: true, strict: false });
        addFormats(ajv);
        const validate = ajv.compile(boardSchema);
        if (!validate(board)) {
            console.error(validate.errors);
            throw new Error("🛑 Generated board failed schema validation");
        }

        /* ░4 Domain checks: item value present & people/file empty ░ */
        const colVariant = Object.fromEntries(board.columns.map(c => [c.id, c.type.variant]));
        board.groups.forEach(g =>
            g.tasks.forEach(t => {
                if (!t.columnValues.some(v => v.colId === "col-item" && typeof v.value === "string" && v.value.trim()))
                    throw new Error(`Task ${t.id} missing 'item' value`);

                t.columnValues.forEach(v => {
                    if (["people", "file"].includes(colVariant[v.colId]) && v.value !== "")
                        throw new Error(`Task ${t.id} must not have value for ${colVariant[v.colId]} column ${v.colId}`);
                });
            })
        );

        console.log("✅ board:", board);
        return board;          // ← ready to POST to backend
    }


    return (
        <section className="DevPage1">
            <h1>DevPage1</h1>
            <div
                className="clickable filled size-40"
                onClick={() => generateBoard(userPrompt, boardName, user)}
            >
                generate somthing
            </div>
        </section>
    )
}