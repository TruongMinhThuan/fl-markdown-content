import React, { useState } from 'react';
import { useMarkdownStore } from '../store';

const RegexEditor: React.FC = () => {
    const [regex, setRegex] = useState('[T]itle');
    const [replacement, setReplacement] = useState('TitleUpdated');
    const { content, setContent } = useMarkdownStore((state) => state);

    const handleApplyRegex = () => {
        try {

            // let pattern = `/${regex}/g`;
            // const pattern = new RegExp(regex);
            // string to regular expression
            let pattern = new RegExp(regex,'g');
            console.log('pattern:', regex);
            
            const newContent = content.replace(pattern, replacement);
            // console.log('newContent:', newContent);
            
            setContent(newContent);
        } catch (error) {
            console.error('Invalid regex pattern:', error);
        }
    };

    return (
        <div>
            <div>
                <h2>Regexp</h2>
                <textarea
                    value={regex}
                    onChange={(e) => setRegex(e.target.value)}
                    rows={5}
                    cols={50}
                />
            </div>
            <div>
                <h2>Replace</h2>
                <textarea
                    value={replacement}
                    onChange={(e) => setReplacement(e.target.value)}
                    rows={5}
                    cols={50}
                />
            </div>
            <button onClick={handleApplyRegex}>Apply Regex</button>
        </div>
    );
};

export default RegexEditor;
