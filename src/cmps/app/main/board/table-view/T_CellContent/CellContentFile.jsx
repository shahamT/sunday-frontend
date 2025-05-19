// === Libs

// === Services
import { uploadService } from "../../../../../../services/board/upload.service";

// === Actions
import { showSuccessMsg } from "../../../../../../services/base/event-bus.service";

// === Hooks / React
import { useState } from "react";

// === Imgs

// === Child Components
import { removeColumnValue, setColumnValue } from "../../../../../../store/actions/board.actions";
import { PopUpMenu } from "../../../../../reusables/PopUpMenu/PopUpMenu";
import { Loader } from "../../../../../reusables/Loader/Loader";
import { MiniFilePreview } from "../../value-setter/MiniFilePreview";
import { FileModal } from "../../popupMenu/FileModal";
import { openGlobalModal } from "../../../../../../store/actions/app.actions";

// ====== Component ======
// =======================

export function CellContentFile({ task, column, columnValue }) {
    // === Consts
    const taskId = task.id
    const inputId = `imgUpload-${taskId}`
    const [isUploading, setIsUploading] = useState(false)
    // === Effects
    // === Functions

    async function uploadImg(ev, passedTaskId) {

        setIsUploading(true)
        const { secure_url } = await uploadService.uploadImg(ev)
        setIsUploading(false)

        onSetFile(secure_url, passedTaskId)
    }

    async function onSetFile(fileUrl, passedTaskId) {

        try {
            await setColumnValue(passedTaskId, column.id, fileUrl)
            showSuccessMsg('Uploaded 1 file')
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }

    function onClearFile() {
        try {
            removeColumnValue(taskId, column.id)
        }
        catch (err) {
            showErrorMsg(`Somthing went wrong`)
        }
    }


    return (
        <div className={`CellContentFile cell-content`}>


            {columnValue
                ?
                <>
                    <div
                        className="clear-btn clickable clear icon-btn size-24 i-CloseSmall"
                        onClick={onClearFile}
                    />
                    <>
                        <div className="clickable-area"
                            onClick={() => openGlobalModal(<FileModal imgUrl={columnValue.value} />)}>

                            <div className="img-wraper">
                                <PopUpMenu
                                    position="bottom"
                                    noArrow={false}
                                    showOnHover={true}
                                    mouseInDelay={300}
                                    mouseOutDelay={300}
                                    renderContent={({ onCloseModal }) => (
                                        <MiniFilePreview
                                            onCloseModal={onCloseModal}
                                            imgUrl={columnValue.value}
                                        />
                                    )}
                                >
                                    <img className="img-preview" src={columnValue?.value} />
                                </PopUpMenu>

                            </div>
                        </div>
                    </>
                </>
                :
                <div className="file-empty-state">

                    {isUploading
                        ?
                        <Loader color='#323338' size={1.5} />
                        :
                        <>
                            <div className="img-uploader">
                                <label  htmlFor={inputId}></label>
                                <input
                                    className="hidden-input"
                                    type="file"
                                       onChange={(e) => uploadImg(e, taskId)}
                                    accept="image/*"
                                    id={inputId} 
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>

                            <div className="plus-btn">
                                <div className="plus-icon i-AddSmall" />
                            </div>
                            <div className="file-icon i-File" />
                        </>
                    }
                </div>
            }
        </div >
    )
}