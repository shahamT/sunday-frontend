// import '@remirror/styles/all.css';
// import './RichTextEditor.scss';


// import React from 'react';
// import {
//   Remirror,
//   useRemirror,
//   EditorComponent,
//   useRemirrorContext,
// } from '@remirror/react';
// import {
//   BoldExtension,
//   ItalicExtension,
//   UnderlineExtension,
//   NodeFormattingExtension,
//   PlaceholderExtension,
// } from 'remirror/extensions';
// import '@remirror/styles/all.css';

// export function RichTextEditor() {
//   const { manager, state, onChange } = useRemirror({
//     extensions: () => [
//       new BoldExtension(),
//       new ItalicExtension(),
//       new UnderlineExtension(),
//       new NodeFormattingExtension(),
//       new PlaceholderExtension({ placeholder: 'Start typing...' }),
//     ],
//     content: '<p>Hello, world!</p>',
//     stringHandler: 'html',
//   });

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
//       <div style={{ width: '100%', maxWidth: '700px' }}>
//         <Remirror manager={manager} initialContent={state} onChange={onChange}>
//           <CustomToolbar />
//           <EditorComponent />
//         </Remirror>
//       </div>
//     </div>
//   );
// }

// function CustomToolbar() {
//   const { commands } = useRemirrorContext();
//   return (
//     <div style={{ display: 'flex', gap: '8px', marginBottom: '0.5rem' }}>
//       <button onClick={() => commands.toggleBold()}>Bold</button>
//       <button onClick={() => commands.toggleItalic()}>Italic</button>
//       <button onClick={() => commands.toggleUnderline()}>Underline</button>
//       <button onClick={() => commands.leftAlign()}>Left</button>
//       <button onClick={() => commands.centerAlign()}>Center</button>
//       <button onClick={() => commands.rightAlign()}>Right</button>
//     </div>
//   );
// }


import React from 'react';
import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';
import '@remirror/styles/all.css';
import './RichTextEditor.scss';

export function RichTextEditor() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: '#f9f9f9',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '700px',
        background: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}>
        <WysiwygEditor placeholder="Write your update..." />
      </div>
    </div>
  );
}