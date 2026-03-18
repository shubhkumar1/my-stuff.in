import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

export default function CodeBlockComponent({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }: any) {
  return (
    <NodeViewWrapper className="relative group">
      <select
        className="absolute top-2 right-2 bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded border border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={event => updateAttributes({ language: event.target.value })}
      >
        <option value="null">
          auto
        </option>
        <option disabled>
          —
        </option>
        {extension.options.lowlight.listLanguages().map((lang: string, index: number) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <pre>
        <NodeViewContent className="code" />
      </pre>
    </NodeViewWrapper>
  )
}
