import './reusables.scss'

// === Style

// === Libs

// === Services

// === Actions
import { closeGlobalModal, closeSidePanel, openGlobalModal, openSidePanel } from "../../../store/actions/app.actions.js";

// === React
import { useToggle } from "../../../hooks/useToggle.js";
import { useSelector } from "react-redux";
import { useControlledInput } from '../../../hooks/useControlledInput';

// === Imgs

// === Child Components
import { PopUpMenu } from "../../../cmps/reusables/PopUpMenu/PopUpMenu.jsx";
import { RichTextEditor } from "../../../cmps/reusables/RichTextEditor/RichTextEditor.jsx";
import { TaskPanel } from "../../../cmps/app/main/board/TaskPanel.jsx";
import { EditableText } from '../../../cmps/reusables/EditableText/EditableText';
import { CustomEmojiPicker } from '../../../cmps/reusables/customEmojiPicker/customEmojiPicker';

// ====== Component ======
// =======================

export function Reusables() {
    const [isBtnActive, toggleBtn] = useToggle(false)
    const [isBtnLoading, toggleLoad] = useToggle(false)
    const isSidePanelOpen = useSelector(storeState => storeState.appModule.isSidePanelOpen)
    const [value, handleChange, resetForm] = useControlledInput('Text')

    return (
        <section className="reusables">

            <h1>Reusables</h1>

            <h2>Clickables</h2>
            <p>Can be applied on every element - not specifically a button. this allows more versetile designs</p>

            <h3>Filled variant</h3>

            <p>className="___-btn clickable filled size-32"</p>
            <div className="clickable filled size-32">Button</div>
            <p>className="___-btn clickable filled size-40"</p>
            <div className="clickable filled size-40">Button</div>
            <p>className="___-btn clickable filled size-48"</p>
            <div className="clickable filled size-48">Button</div>

            {/*  */}
            <h3>Filled variant with warning and success colors</h3>
            {/*  */}

            <p>className="___-btn clickable filled positive size-40" </p>
            <div className="clickable filled positive size-40">Button</div>
            <p>className="___-btn clickable filled negative size-40" </p>
            <div className="clickable filled negative size-40">Button</div>

            {/*  */}
            <h3>Clear variant</h3>
            {/*  */}

            <p>className="___-btn clickable clear size-32"</p>
            <div className="clickable clear size-32">Button</div>
            <p>className="___-btn clickable clear size-40"</p>
            <div className="clickable clear size-40">Button</div>
            <p>className="___-btn clickable clear size-48"</p>
            <div className="clickable clear size-48">Button</div>

            {/*  */}
            <h3>Icons suffix/prefix variants</h3>
            {/*  */}

            <p>className="___-btn clickable filled size-40 icon-start i-Launch"</p>
            <div className="clickable filled size-40 icon-start i-Launch">Button</div>
            <p>className="___-btn clickable clear size-32 icon-end i-Integrations"</p>
            <div className="clickable clear size-40 icon-end i-Launch">Button</div>
            <p>className="___-btn clickable clear size-32 icon-start i-Integrations"</p>
            <div className="clickable clear size-32 icon-start i-Integrations">Integrate</div>
            <p>className="___-btn clickable filled size-32 icon-end i-Integrations"</p>
            <div className="clickable filled size-32 icon-end i-Integrations">Integrate</div>

            {/*  */}
            <h3>Icons btns</h3>
            {/*  */}

            <p>className="___-btn clickable filled icon-btn size-24 i-Erase"</p>
            <div className="clickable filled icon-btn size-24 i-Erase"></div>
            <p>className="___-btn clickable filled icon-btn size-32 i-Edit""</p>
            <div className="clickable filled icon-btn size-32 i-Edit"></div>
            <p>className="___-btn clickable filled icon-btn size-40 i-Integrations"</p>
            <div className="clickable filled icon-btn size-40 i-Integrations"></div>
            <p>className="___-btn clickable clear icon-btn size-24 i-Info"</p>
            <div className="clickable clear icon-btn size-24 i-Info"></div>
            <p>className="___-btn clickable clear icon-btn size-40 icon-big i-Switcher"</p>
            <div className="clickable clear icon-btn size-40 icon-big i-Switcher"></div>

            {/*  */}
            <h3>'select' btns (removes the clicking animation) + active state </h3>
            {/*  */}

            <p>classNa
                me="___-btn clickable clear size-32 icon-start i-Integrations select"</p>

            <div className={`clickable clear size-32 icon-start i-Integrations select ${isBtnActive ? "active" : ""}`}
                onClick={() => toggleBtn()}
            >Click to activate</div>

            {/*  */}
            <h3>Disabled </h3>
            {/*  */}

            <p>className="___-btn clickable filled icon-btn size-32 i-Edit disabled""</p>
            <div className="clickable filled icon-btn size-32 i-Edit disabled"></div>
            <p>className="___-btn clickable clear size-32 icon-start i-Integrations disabled"</p>
            <div className="clickable clear size-32 icon-start i-Integrations disabled">Integrate</div>



            {/*  */}
            <h3>Loading... </h3>
            {/*  */}


            <p>Added 'loading' class</p>
            <pre>
                <code>
                    {`
const [isBtnLoading, toggleLoad] = useToggle(false)

<div className={\`clickable filled icon-btn size-32 i-Edit \${isBtnLoading ? "loading" : ""}\`}
onClick={() => toggleLoad()}>
>Click me</div>
`}
                </code>
            </pre>

            <div className={`clickable filled icon-btn size-32 i-Edit ${isBtnLoading ? "loading" : ""}`}
                onClick={() => toggleLoad()}
            ></div>

            <div className={`clickable clear size-48 ${isBtnLoading ? "loading" : ""}`}
                onClick={() => toggleLoad()}
            >Click to load</div>

            <div className={`clickable filled size-40 icon-start i-Launch ${isBtnLoading ? "loading" : ""}`}
                onClick={() => toggleLoad()}
            >Click to load</div>


            {/*  */}
            <h3>Split button </h3>
            {/*  */}


            <pre>
                <code>
                    {`
<div className="split-button size-48 filled">
    <div className="clickable filled icon-start i-Add">Add</div>
    <div className="seperator"></div>
    <div className="clickable filled icon-btn i-DropdownChevronDown"></div>
</div>
`}
                </code>
            </pre>

            <p>basic structure</p>

            <div className="split-button size-48 filled">
                <div className="clickable btn-left filled icon-start i-Add">Add</div>
                <div className="seperator"></div>
                <div className="clickable btn-right filled icon-btn i-DropdownChevronDown"></div>
            </div>



            <pre>
                <code>
                    {`
<div className="split-button size-48 filled">
    <div className="clickable btn-left filled icon-start i-Add">Add</div>
    <div className="seperator"></div>
    <PopUpMenu
        position="bottom-end"
        renderContent={({ onCloseModal }) => (
            <RenderedContent name="Somone" onCloseModal={onCloseModal} />
        )}>
        <div className="clickable btn-right filled icon-btn i-DropdownChevronDown"></div>
     </PopUpMenu>

</div>
`}
                </code>
            </pre>

            <p>with dropdown menu</p>

            <div className="split-button size-48 filled">
                <div className="clickable btn-left filled icon-start i-Add">Add</div>
                <div className="seperator"></div>
                <PopUpMenu
                    position="bottom-end"
                    renderContent={({ onCloseModal }) => (
                        <RenderedContent name="Somone" onCloseModal={onCloseModal} />
                    )}>
                    <div className="clickable btn-right filled icon-btn i-DropdownChevronDown"></div>
                </PopUpMenu>

            </div>


            {/* .................... */}
            {/* .................... */}

            <h3></h3>
            <h2>popup menu with dynamic content</h2>
            <p>closed when clicked outside</p>
            <p>rendering a component with passed props and onClose function</p>
            <p>6 optional positions - switch between top and bottom position if outside of viewport</p>

            <pre>
                <code>{`
<PopUpMenu
position="top-start"
renderContent={({ onCloseModal }) => (
<RenderedContent name="Somone"
onCloseModal={onCloseModal} />
)}>
<div className="clickable filled size-40">top-start</div>
</PopUpMenu>
`}
                </code>
            </pre>
            <PopUpMenu
                position="top-start"
                renderContent={({ onCloseModal }) => (
                    <RenderedContent name="Somone" onCloseModal={onCloseModal} />
                )}>
                <div className="clickable filled size-40">top-start</div>
            </PopUpMenu>
            <PopUpMenu
                position="bottom-end"
                renderContent={({ onCloseModal }) => (
                    <RenderedContent name="Somone" onCloseModal={onCloseModal} />
                )}>
                <div className="clickable filled size-40">bottom-end</div>
            </PopUpMenu>
            <PopUpMenu
                position="top"
                renderContent={({ onCloseModal }) => (
                    <RenderedContent name="Somone" onCloseModal={onCloseModal} />
                )}>
                <div className="clickable filled size-40">top</div>
            </PopUpMenu>
            <PopUpMenu
                position="bottom"
                renderContent={({ onCloseModal }) => (
                    <RenderedContent name="Somone" onCloseModal={onCloseModal} />
                )}>
                <div className="clickable filled size-40">bottom</div>
            </PopUpMenu>

            <p>more props - gap, arrow, animaton</p>

            <pre>
                <code>{`
<PopUpMenu
position="top"
gap={40}
noArrow={false}
noAnimation={false}
renderContent={({ onCloseModal }) => (
<RenderedContent name="Somone"
onCloseModal={onCloseModal} />
)}>
<div className="clickable filled size-40">top-start</div>
</PopUpMenu>
`}
                </code>
            </pre>
            <PopUpMenu
                position="top"
                gap={40}
                renderContent={({ onCloseModal }) => (
                    <RenderedContent name="Somone" onCloseModal={onCloseModal} />
                )}>
                <div className="clickable filled size-40">custom gap - 40px</div>
            </PopUpMenu>
            <PopUpMenu
                position="top"
                noArrow={false}
                noAnimation={false}
                renderContent={({ onCloseModal }) => (
                    <RenderedContent name="Somone" onCloseModal={onCloseModal} />
                )}>
                <div className="clickable filled size-40">with arrow tip</div>
            </PopUpMenu>
            <PopUpMenu
                position="top"
                noAnimation={true}
                renderContent={({ onCloseModal }) => (
                    <RenderedContent name="Somone" onCloseModal={onCloseModal} />
                )}>
                <div className="clickable filled size-40">No in/out animation</div>
            </PopUpMenu>

            <p>emoji Picker</p>

            <PopUpMenu
                position="bottom-end"
                renderContent={({ onCloseModal }) => (
                    <CustomEmojiPicker onCloseModal={onCloseModal} />
                )}>
                <div className="clickable filled size-40">Emoji Picker</div>
            </PopUpMenu>

            {/*  */}
            <h3>Modal </h3>
            {/*  */}

            <div
                className="clickable filled size-40 icon-start i-Launch"
                onClick={() => openGlobalModal(<ModalContent />)}
            >Open Modal</div>


            {/*  */}
            <h3>Side Panel </h3>
            {/*  */}

            <div
                className="clickable filled size-40 icon-start i-Launch"
                onClick={() => isSidePanelOpen ? closeSidePanel() : openSidePanel()}
            >Open side panel</div>


            {/*  */}
            <h3>Text editor... </h3>
            {/*  */}

            <RichTextEditor />

            <TaskPanel>
                <ModalContent />
            </TaskPanel>


            {/*  */}
            <h3>Editable Text</h3>
            {/*  */}


            <div className="input-container">
                <EditableText value={value} handleChange={handleChange} />
            </div>


        </section >
    )
}


function RenderedContent({ name, onCloseModal }) {
    return (
        <div className="rendered-content">
            <p>Hello {name}</p>
            <div onClick={onCloseModal}
                className="clickable filled negative size-40">Close</div>
        </div>
    )
}
function ModalContent({ name, onCloseModal }) {
    return (
        <div className="rendered-content">
            <p>Hello {name}</p>
            <div onClick={() => closeGlobalModal()}
                className="clickable filled negative size-40">Close</div>
        </div>
    )
}
