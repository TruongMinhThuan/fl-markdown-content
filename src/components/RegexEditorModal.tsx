import React, { useState } from 'react';
import { useMarkdownStore } from '../store';
import { Flex } from 'antd';
import { Button, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';


const RegexEditorModal: React.FC = () => {
    const [regex, setRegex] = useState('[T]itle1');
    const [replacement, setReplacement] = useState('TitleUpdated');
    const { content, setContent, isModalOpen, setIsModalOpen } = useMarkdownStore((state) => state);

    const handleApplyRegex = () => {
        try {

            // let pattern = `/${regex}/g`;
            // const pattern = new RegExp(regex);
            // string to regular expression
            let pattern = new RegExp(regex, 'g');
            console.log('pattern:', regex);

            const newContent = content.replace(pattern, replacement);
            // console.log('newContent:', newContent);

            setContent(newContent);
        } catch (error) {
            console.error('Invalid regex pattern:', error);
        }
    };

    const handleOk = () => {
        handleApplyRegex()
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <Flex vertical>
                <div>
                    <h2>Regexp</h2>
                    <TextArea
                        value={regex}
                        onChange={(e) => setRegex(e.target.value)}
                        rows={5}
                        cols={50}
                    />
                </div>
                <div>
                    <h2>Replace</h2>
                    <TextArea
                        value={replacement}
                        onChange={(e) => setReplacement(e.target.value)}
                        rows={5}
                        cols={50}
                    />
                </div>

            </Flex>
            {/* <button onClick={handleApplyRegex}>Apply Regex</button> */}
        </Modal>
    );

};

export default RegexEditorModal;
