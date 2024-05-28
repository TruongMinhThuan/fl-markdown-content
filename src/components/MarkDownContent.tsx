import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import Markdown from 'react-markdown'
import { useMarkdownStore } from '../store'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { gfmTable, gfmTableHtml } from 'micromark-extension-gfm-table'
import { micromark } from 'micromark'
import MarkdownJsx from 'markdown-to-jsx'

// const readmePath = require("src/dummy/Content.mdx");

const MarkDownContent: React.FC = () => {
    const { content, setContent } = useMarkdownStore(state => state)

    return (
        <MarkdownJsx>
            {content}
        </MarkdownJsx>
    )

}

export default MarkDownContent;