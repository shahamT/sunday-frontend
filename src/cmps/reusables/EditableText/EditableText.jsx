import { forwardRef, useRef, useEffect, useState, useImperativeHandle } from 'react';
import './EditableText.scss'
import { PopUpMenu } from '../PopUpMenu/PopUpMenu';
import { Tooltip } from '../tooltip/Tooltip';
import { CustomEmojiPicker } from '../customEmojiPicker/customEmojiPicker';
import { ColorPicker } from '../../app/main/board/value-setter/ColorPicker';


export const EditableText = forwardRef(function EditableText({
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
    centerText = false,
    colorPicker = null,
}, ref) {
    const spanRef = useRef(null);
    const [inputWidth, setInputWidth] = useState(1)
    const inputRef = useRef(null)
    const skipBlurRef = useRef(false)
    const [isFocused, setIsFocused] = useState(false)
    const [isPickingColor, setIsPickingColor] = useState(false);


    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current?.focus()
    }), [])


    useEffect(() => {
        if (!full && spanRef.current) {
            setInputWidth(spanRef.current.offsetWidth + 13)
        }
    }, [value, placeholder, full])


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

            {/* colorpicker */}
            {colorPicker && isFocused && (
                <div className="color-picker-wrap">
                    <PopUpMenu
                        position="bottom-start"
                        renderContent={({ onCloseModal }) => (
                            <ColorPicker
                                onCloseModal={() => {
                                    setIsPickingColor(false); // 🛠️ <- Add this here
                                    onCloseModal();
                                }}
                                selectedColor={colorPicker?.selectedColor}
                                setColor={colorPicker?.setColor}
                                variant={colorPicker?.variant}
                                setIsPickingColor={setIsPickingColor}
                            />
                        )}
                    >
                        <div
                            className={`color-picker-button ${colorPicker.selectedColor}-bg`}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                setIsPickingColor(true);
                            }}
                        />
                    </PopUpMenu>
                </div>
            )}

            {/* input */}
            <input
                ref={inputRef}
                id='activeInput'
                type={type}
                value={value}
                placeholder={placeholder}
                className={`text-input ${full ? 'full' : ''} ${size} ${emojiPicker ? 'xl-padding-end' : ''} ${centerText ? 'text-centered' : ''} ${additionalClass}`}
                onClick={(e) => e.stopPropagation()}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                    setIsFocused(false);
                    if (skipBlurRef.current || isPickingColor) return;
                    onBlur?.(e);
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
                    ...(full ? {} : { width: `${inputWidth}px` }),
                    ...(colorPicker && isFocused
                        ? { paddingInlineStart: (paddingStart || 0) + 32 + 'px' }
                        : paddingStart
                            ? { paddingInlineStart: paddingStart + 'px' }
                            : {}),
                }}
            />

            {/* emojiPicker */}
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

            {/* input mirror */}
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
})
