import { useRef, useEffect, useState } from 'react';
import './EditableText.scss'
import { PopUpMenu } from '../PopUpMenu/PopUpMenu';
import { Tooltip } from '../tooltip/Tooltip';
import { CustomEmojiPicker } from '../customEmojiPicker/customEmojiPicker';


export function EditableText({
    full = false,
    size = 'normal',
    placeholder = '',
    paddingStart = null,
    emojiPicker = true,
    value = '',
    handleChange,
    type = 'text',
}) {
    const spanRef = useRef(null);
    const [inputWidth, setInputWidth] = useState(1)
    const inputRef = useRef(null)

    useEffect(() => {
        if (!full && spanRef.current) {
            setInputWidth(spanRef.current.offsetWidth+12)
        }
    }, [value, placeholder, full]);


    function onSelectEmoji(emoji) {
        const emojiChar = emoji.native
        const input = inputRef.current

        if (!input) return

        const start = input.selectionStart
        const end = input.selectionEnd

        const newValue = value.slice(0, start) + emojiChar + value.slice(end)

        // Update the input value
        handleChange({
            target: {
                value: newValue,
                type: input.type,
            },
        })

    }

    return (
        <div className="EditableText">
            <input
                ref={inputRef}
                id='activeInput'
                type={type}
                value={value}
                placeholder={placeholder}
                className={`text-input ${full ? 'full' : ''} ${size} ${emojiPicker ? 'xl-padding-end' : ''}`}
                onChange={handleChange}
                style={{
                    ...(paddingStart ? { paddingInlineStart: paddingStart + 'px' } : {}),
                    ...(full ? {} : { width: `${inputWidth}px` }),
                }}
            />

            {emojiPicker &&
                <label htmlFor='activeInput' className="emoji-picker">
                    <PopUpMenu
                        position="bottom-end"
                        renderContent={() => (
                            <CustomEmojiPicker onSelect={onSelectEmoji} />
                        )}>
                        <Tooltip title='Add an emoji' position='top'>
                            <div className="emoji-btn clickable select clear icon-btn size-24 i-Emoji"
                                onMouseDown={(e) => e.preventDefault()}
                            />
                        </Tooltip>
                    </PopUpMenu>
                </label>}

            {!full && (
                <span
                    ref={spanRef}
                    className={`input-mirror ${size}`}
                >
                    {value || placeholder}
                </span>
            )}

        </div>
    );
}
