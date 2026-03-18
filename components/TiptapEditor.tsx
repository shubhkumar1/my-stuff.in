"use client";
import { useEditor, EditorContent, ReactNodeViewRenderer, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useCallback, useState } from 'react'

// Tiptap Extensions
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'

// Lowlight and highlight.js for Code Block Syntax Highlighting
import { createLowlight } from 'lowlight'
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';

// Custom Components & Icons
import CodeBlockComponent from './CodeBlockComponent'
import { 
    Bold, Italic, Underline as UnderlineIcon, Strikethrough, Code, CodeSquare, 
    Highlighter, List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight, 
    Link2, Link2Off, Subscript as SubscriptIcon, Superscript as SuperscriptIcon, 
    Image as ImageIcon, Undo, Redo 
} from 'lucide-react'
import '../prose-styles.css'; // Import the shared styles

// Configure the syntax highlighter
const lowlight = createLowlight();
lowlight.register('javascript', javascript);
lowlight.register('css', css);
lowlight.register('html', html);

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const setLink = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const addImage = useCallback(() => {
    if (!editor) return
    const url = window.prompt('Image URL')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  if (!editor) return null
  
  const buttonClass = "inline-flex items-center justify-center w-8 h-8 text-text-secondary bg-transparent border-none rounded cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-colors";
  const activeButtonClass = "inline-flex items-center justify-center w-8 h-8 text-primary bg-primary/10 border-none rounded cursor-pointer transition-colors";
  const dividerClass = "w-[1px] bg-border self-stretch mx-2 my-1";

  return (
    <div className="menu-bar flex flex-wrap items-center border-b border-border bg-card p-2 gap-1 rounded-t-md">
        <button type="button" className={buttonClass} onClick={() => editor.chain().focus().undo().run()} title="Undo"><Undo size={18} /></button>
        <button type="button" className={buttonClass} onClick={() => editor.chain().focus().redo().run()} title="Redo"><Redo size={18} /></button>
        
        <div className={dividerClass}></div>

        <select onChange={e => {
            const value = e.target.value;
            if (value === "0") editor.chain().focus().setParagraph().run();
            else {
                const level = parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6;
                editor.chain().focus().toggleHeading({ level }).run();
            }
        }} className="border border-border bg-background text-foreground rounded px-2 py-1 outline-none focus:border-primary text-sm cursor-pointer">
            <option value="0">Paragraph</option>
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
        </select>
        
        <div className={dividerClass}></div>
        
        <button type="button" className={editor.isActive('bold') ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><Bold size={18} /></button>
        <button type="button" className={editor.isActive('italic') ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><Italic size={18} /></button>
        <button type="button" className={editor.isActive('underline') ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline"><UnderlineIcon size={18} /></button>
        <button type="button" className={editor.isActive('strike') ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough"><Strikethrough size={18} /></button>
        <button type="button" className={editor.isActive('code') ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().toggleCode().run()} title="Inline Code"><Code size={18} /></button>
        <button type="button" className={editor.isActive('codeBlock') ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code Block"><CodeSquare size={18} /></button>
        <button type="button" className={editor.isActive('highlight') ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().toggleHighlight().run()} title="Highlight"><Highlighter size={18} /></button>
        <button type="button" className={editor.isActive('subscript') ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().toggleSubscript().run()} title="Subscript"><SubscriptIcon size={18} /></button>
        <button type="button" className={editor.isActive('superscript') ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().toggleSuperscript().run()} title="Superscript"><SuperscriptIcon size={18} /></button>
        
        <div className={dividerClass}></div>

        <button type="button" className={editor.isActive('bulletList') ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List"><List size={18} /></button>
        <button type="button" className={editor.isActive('orderedList') ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered List"><ListOrdered size={18} /></button>
        <button type="button" className={editor.isActive('blockquote') ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote"><Quote size={18} /></button>
        
        <div className={dividerClass}></div>

        <button type="button" className={editor.isActive({ textAlign: 'left' }) ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().setTextAlign('left').run()}><AlignLeft size={18} /></button>
        <button type="button" className={editor.isActive({ textAlign: 'center' }) ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().setTextAlign('center').run()}><AlignCenter size={18} /></button>
        <button type="button" className={editor.isActive({ textAlign: 'right' }) ? activeButtonClass : buttonClass} onClick={() => editor.chain().focus().setTextAlign('right').run()}><AlignRight size={18} /></button>
        
        <div className={dividerClass}></div>

        <button type="button" className={editor.isActive('link') ? activeButtonClass : buttonClass} onClick={setLink}><Link2 size={18} /></button>
        <button type="button" className={buttonClass} onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')}><Link2Off size={18} /></button>
        <button type="button" className={buttonClass} onClick={addImage}><ImageIcon size={18} /></button>
    </div>
  )
}

const TiptapEditor = ({ content, onChange, editable = true }: { content: string, onChange: (content: string) => void, editable?: boolean }) => {
  const [, setTrigger] = useState(0);
  
  const editor = useEditor({
    editable,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent)
        },
      }).configure({ lowlight }),
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
      Highlight,
      Subscript,
      Superscript,
      Image,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onTransaction: () => {
      // Force a re-render so the menu bar buttons update their active states
      setTrigger(prev => prev + 1);
    },
    editorProps: {
        attributes: {
          class: 'ProseMirror prose dark:prose-invert prose-sm sm:prose-base focus:outline-none max-w-none p-4',
        },
    },
  })

  return (
    <div className="border border-border rounded-md overflow-hidden bg-card text-foreground flex flex-col focus-within:ring-2 focus-within:ring-primary/50 transition-all">
        <MenuBar editor={editor} />
        <div className="bg-card text-foreground min-h-[250px]">
          <EditorContent editor={editor} />
        </div>
    </div>
  )
}

export default TiptapEditor;