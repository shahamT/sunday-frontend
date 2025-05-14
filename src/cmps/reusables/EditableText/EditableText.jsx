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
    emojiPicker = false,
    value = '',
    handleChange,
    onBlur,
    onPressEnter,
    type = 'text',
    color = null,
    centered = false,
    additionalClass = '',
}) {
    const spanRef = useRef(null);
    const [inputWidth, setInputWidth] = useState(1)
    const inputRef = useRef(null)
    const skipBlurRef = useRef(false)

    useEffect(() => {
        if (!full && spanRef.current) {
            setInputWidth(spanRef.current.offsetWidth + 13)
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
        <div className={`EditableText ${centered ? 'centered' : ''}`}>
            <input
                ref={inputRef}
                id='activeInput'
                type={type}
                value={value}
                placeholder={placeholder}
                className={`text-input ${full ? 'full' : ''} ${size} ${emojiPicker ? 'xl-padding-end' : ''} ${additionalClass}`}
                onClick={(e) => e.stopPropagation()}
                onChange={handleChange}
                onBlur={(e) => {
                    if (skipBlurRef.current) return
                    onBlur?.(e)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        skipBlurRef.current = true // set the flag
                        onPressEnter()
                        inputRef.current?.blur()

                        // reset flag after event loop (ensures blur won't act)
                        setTimeout(() => {
                            skipBlurRef.current = false
                        }, 0)
                    }
                }}
                style={{
                    ...(paddingStart ? { paddingInlineStart: paddingStart + 'px' } : {}),
                    ...(full ? {} : { maxWidth: `${inputWidth}px` })
                    // ...(color ? { color: `${color}` } : {})
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
