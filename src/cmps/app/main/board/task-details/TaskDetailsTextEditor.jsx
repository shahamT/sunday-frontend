// === Libs
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import Gapcursor from '@tiptap/extension-gapcursor'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Link from '@tiptap/extension-link'
import Code from '@tiptap/extension-code'
import Heading from '@tiptap/extension-heading'
import TextAlign from '@tiptap/extension-text-align'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Mention from '@tiptap/extension-mention'
import suggestion from '@tiptap/suggestion'
import Placeholder from '@tiptap/extension-placeholder'

// === Services

// === Actions

// === Hooks / React
import { useEffect, useState, useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'

// === Imgs

// === Child Components

// ====== Component ======
// =======================

export function TaskDetailsTextEditor({ saveUpdate }) {
    // === Consts

    const isOpen = useSelector(storeState => storeState.boardModule.isTaskPanelOpen)
    const [destroy, setDestroy] = useState(false)

    const extensions = [StarterKit, Document, Paragraph, Text, Bold, Italic, Underline, Strike, TextStyle, Color,
        OrderedList, ListItem, BulletList, Gapcursor, Table.configure({ resizable: true, }), TableRow, TableHeader,
        TableCell, Code, Heading, HorizontalRule,
        Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            // disallowed domains
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            // all checks have passed
            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },

      }), TextAlign.configure({ types: ['heading', 'paragraph'], }), Mention.configure({ HTMLAttributes: { class: 'mention',}, suggestion, }),
    Placeholder.configure({
        placeholder: 'Write an update',
        emptyEditorClass: 'is-editor-empty',
        showOnlyWhenEditable: true,
    }),
    ]

    const content = '<p></p>'

    const editor = useEditor({
        extensions,
        content,
    })

    useEffect(() => {
    return () => {
        editor?.destroy()
    }
    }, [isOpen])

    useEffect(() => {
        if(destroy) {
            setDestroy(false)
            editor?.destroy()
        }
    },[destroy])

    const [hasContent, setHasContent] = useState(false)

    useEffect(() => {
        if (!editor) return

        const updateHasContent = () => {
            const isEmpty = editor.isEmpty
            setHasContent(!isEmpty)
        }

        editor.on('update', updateHasContent)

        // Initial check
        updateHasContent()

        return () => {
            editor.off('update', updateHasContent)
            editor.destroy()
        }
    }, [editor])

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
        return
        }

        // empty
        if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink()
            .run()

        return
        }

        // update link
        try {
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run()
        } catch (e) {
        alert(e.message)
        }
    }, [editor])

    function onSaveUpdate() {
        const html = editor.getHTML()
        editor.commands.clearContent()
        saveUpdate(html)
        setDestroy(true)
    }

    if (!editor) return null
    
    return (
        <section className={`TaskDetailsTextEditor ${editor.isFocused ? 'is-focused' : ''} ${hasContent ? 'has-content' : ''}`}>
            {(editor.isFocused || hasContent) && ( <div className='tool-bar'>
                <button onClick={() => editor.commands.setParagraph()}
                    className={`${editor.isActive('paragraph') ? 'is-active' : ''} icon-btn paragraph clickable clear icon-btn size-32`} ></button>
                <button onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`${editor.isActive('bold') ? 'is-active' : ''} icon-btn bold clickable clear icon-btn size-32`}></button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`${editor.isActive('italic') ? 'is-active' : ''} icon-btn italic clickable clear icon-btn size-32`} ></button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`${editor.isActive('underline') ? 'is-active' : ''} icon-btn underline clickable clear icon-btn size-32`}></button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`${editor.isActive('strike') ? 'is-active' : ''} icon-btn strikethrough clickable clear icon-btn size-32`}></button>

                <button className='icon-btn text-height clickable clear icon-btn size-32'></button>  {/*  pop up*/}
                {/* onChange={(e) => {const fontSize = e.target.value editor.chain().focus().setMark('textStyle', { fontSize }).run() }} */}

                <label htmlFor="color-input" >
                    <div className='icon-btn paint-roller clickable clear icon-btn size-32'></div>
                </label>
                <input style={{ display: 'none' }} id='color-input' type="color" onInput={event => editor.chain().focus().setColor(event.target.value).run()}
                    value={editor.getAttributes('textStyle').color || '#000000'} data-testid="setColor"/>

                <button onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`${editor.isActive('orderedList') ? 'is-active' : ''} icon-btn list-ol clickable clear icon-btn size-32`}></button> 
                <button onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`${editor.isActive('bulletList') ? 'is-active' : ''} icon-btn list-ul clickable clear icon-btn size-32`}></button> 
                <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()}
                    className='icon-btn table clickable clear icon-btn size-32'></button>
                {/* <button onClick={() => editor.chain().focus().addColumnBefore().run()}> Add column before</button>
                <button onClick={() => editor.chain().focus().addColumnAfter().run()}>Add column after</button>
                <button onClick={() => editor.chain().focus().deleteColumn().run()}>Delete column</button>
                <button onClick={() => editor.chain().focus().addRowBefore().run()}>Add row before</button>
                <button onClick={() => editor.chain().focus().addRowAfter().run()}>Add row after</button>
                <button onClick={() => editor.chain().focus().deleteRow().run()}>Delete row</button>
                <button onClick={() => editor.chain().focus().deleteTable().run()}>Delete table</button>
                <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>Toggle header row</button> */}
                <button onClick={setLink} className={`${editor.isActive('link') ? 'is-active' : ''} icon-btn link clickable clear icon-btn size-32`}></button>
                
                <button className='icon-btn align-left clickable clear icon-btn size-32'></button>
                {/* <button onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}> Left </button>
                <button onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}> Center </button>
                <button onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}> Right </button> */}
                
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className='icon-btn horizontal-rule clickable clear icon-btn size-32'></button>
            </div>)}
            <EditorContent editor={editor} />
            <div className='text-editor-footer'>
                <button className="mention-btn clickable clear size-32">@ Mention</button>
                {(editor.isFocused || hasContent) && ( <div className="split-button size-32 filled">
                    <div className="clickable btn-left filled " onClick={onSaveUpdate}>Update</div>
                    <div className="seperator"></div>
                    <div className="clickable btn-right filled icon-btn i-DropdownChevronDown"></div>
                </div> )}
            </div>
        </section>
    )
}