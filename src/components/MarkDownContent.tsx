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
    const output = micromark('| a |\n| - |', {
        extensions: [gfmTable()],
        htmlExtensions: [gfmTableHtml()],
        allowDangerousHtml: true
    })

    // useEffect(() => {
    //     let path = "./Content.md"
    //     let markdown = "https://github.com/TruongMinhThuan/fl-markdown-content/blob/main/README.md"

    //     fetch(markdown)
    //         .then(res => res.text())
    //         .then(res => setContent(res))
    //         .catch(err => console.log(err));

    // }, []);

    return (
        <MarkdownJsx>
            {content}
        </MarkdownJsx>
    )

}

export default MarkDownContent;