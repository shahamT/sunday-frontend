import { useState } from "react";

export function LongTxt({ txt, length = 100 }) {
    
    const [isShowFullTxt, setIsShowFullTxt] = useState(false)

    function onToggleIsShowFullTxt() {
        setIsShowFullTxt(isShowFullTxt => !isShowFullTxt)
    }

    const isLongText = txt.length > length
    const textToShow = (isShowFullTxt || !isLongText) ? txt : (txt.substring(0, length)) + '...'
    return (
        <span className="long-txt">
                <span className="txt">{textToShow}</span>
                {isLongText &&
                    <span> <em><br />...open to read more</em>
                        {/* <button className="show-txt-btn" onClick={onToggleIsShowFullTxt}>
                            {isShowFullTxt ? 'Show Less' : 'Read More'}
                        </button> */}
                    </span>
                }
        </span>
    );
}