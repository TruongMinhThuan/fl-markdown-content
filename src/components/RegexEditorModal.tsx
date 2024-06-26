import React, { useEffect, useState } from 'react';
import { MarkdownExtension, useMarkdownStore } from '../store';
import { Checkbox, CheckboxProps, Flex, GetProp, Input, notification, Space } from 'antd';
import { Button, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import InfiniteScroll from 'react-infinite-scroll-component';
import ButtonGroup from 'antd/es/button/button-group';
import { MinusCircleFilled, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

import type { NotificationArgsProps } from 'antd';


const Context = React.createContext({ name: 'Default' });

const RegexEditorModal: React.FC = () => {
    const [regex, setRegex] = useState('[T]itle1');
    const [replacement, setReplacement] = useState('TitleUpdated');
    const [title, setTitle] = useState('Title');
    const [isAddExtensionVisible, setIsAddExtensionVisible] = useState(false);

    const {
        content,
        setContent,
        isModalOpen,
        setIsModalOpen,
        extensions,
        updateExtension,
        addExtension,
        removeExtension,
        onToggleSelectExtension,
        selectedExtension,
        setExtensions,
        setSelectExtension
    } = useMarkdownStore((state) => state);
    const [api, contextHolder] = notification.useNotification();



    const handleApplyRegex = () => {
        try {

            // let pattern = `/${regex}/g`;
            // const pattern = new RegExp(regex);
            // string to regular expression
            let newContent = content;
            extensions.forEach((extension) => {
                if (extension.is_selected) {
                    let pattern = new RegExp(extension.regular_expression, 'g');
                    console.log('pattern:', regex);

                    newContent = newContent.replace(pattern, extension.replacement);
                    // console.log('newContent:', newContent);

                }
            })
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
        setSelectExtension(null);
        cleanExtensionValues();
        setIsAddExtensionVisible(false);

    };

    const onChangeExtension = (e: MarkdownExtension) => {
        console.log(`checked = ${e.id}`);
        e.is_selected = !e.is_selected;
        updateExtension(e);
    };

    const onAddExtension = () => {

        if (!title || !regex || !replacement) {
            api.error({ duration: 4, message: `Please fill all fields`, description: 'Title, Regular Expression and Replacement are required' });
            return;
        }

        if (selectedExtension) {
            const updatedExtension: MarkdownExtension = {
                ...selectedExtension,
                title: title,
                regular_expression: regex,
                replacement: replacement,
            };
            updateExtension(updatedExtension);

            api.success({ duration: 2, message: `Extension updated`, description: `Extension ${title} updated successfully` });
        }
        else {
            const newExtension: MarkdownExtension = {
                id: extensions.length + 1,
                title: title,
                regular_expression: regex,
                replacement: replacement,
                is_selected: true,
            };
            addExtension(newExtension);
            onSelectExtension(newExtension)

            api.success({ duration: 2, message: `Extension added`, description: `Extension ${title} added successfully` });
        }

    }

    const onSelectExtension = (extension: MarkdownExtension) => {
        if (selectedExtension?.id !== extension.id) {
            setTitle(extension.title);
            setRegex(extension.regular_expression);
            setReplacement(extension.replacement);
            setIsAddExtensionVisible(true);
            setSelectExtension(extension);
        } else {
            setSelectExtension(null);
            setIsAddExtensionVisible(false);

        }
    }

    const onAddNewExtensionClick = () => {
        cleanExtensionValues();
        setSelectExtension(null);
        setIsAddExtensionVisible(true);
    }

    const onRemoveExtensionClick = () => {
        if (selectedExtension) {
            removeExtension(selectedExtension);
            cleanExtensionValues()
        }
    }

    const cleanExtensionValues = () => {
        setTitle('');
        setRegex('');
        setReplacement('');
    }

    useEffect(() => {
        setExtensions([
            {
                id: 1,
                title: 'Title1',
                regular_expression: '[T]itle1',
                replacement: 'Title_Updated1',
            },
            {
                id: 2,
                title: 'Title2',
                regular_expression: '[T]itle2',
                replacement: 'Title_Updated2',
                is_selected: true,
            }
        ])
        return () => {
            console.log('cleanup');
            cleanExtensionValues();
            setSelectExtension(null);
            setIsAddExtensionVisible(false);
        }
    }, []);

    return (
        <Modal
            open={isModalOpen}
            // onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ style: { display: 'none' } }}
            cancelButtonProps={{ style: { display: 'none' } }}
        >
            {contextHolder}
            <Flex vertical>
                <div>
                    <h1>Markdown Extension</h1>
                    <div
                        id="scrollableDiv"
                        style={{
                            maxHeight: 140,
                            minHeight: 80,
                            overflow: 'auto',
                            border: '1px solid #d9d9d9',
                            borderRadius: 4,
                        }}
                    >
                        <InfiniteScroll
                            dataLength={extensions.length}
                            next={() => { }}
                            hasMore={false}
                            loader={<h4>Loading...</h4>}
                            scrollableTarget="scrollableDiv"
                            style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.

                        >
                            {
                                extensions.map((extension) => (
                                    <Flex
                                        key={extension.title}
                                        style={{
                                            backgroundColor: selectedExtension?.id == extension.id ? '#4169E1' : 'white',
                                            paddingLeft: 5,
                                        }}
                                    >
                                        <Checkbox
                                            onChange={() => onChangeExtension(extension)}
                                            style={{ fontWeight: 'bolder' }}
                                            checked={extension.is_selected}
                                            value={extension.title}
                                        >
                                        </Checkbox>
                                        <div
                                            onClick={() => onSelectExtension(extension)}
                                            style={{
                                                cursor: 'pointer',
                                                flex: 1,
                                                padding: 5,
                                                color: selectedExtension?.id == extension.id ? 'white' : 'black',
                                                fontWeight: 'bolder',
                                            }}
                                        >
                                            {extension.title}
                                        </div>
                                    </Flex>
                                ))
                            }
                        </InfiniteScroll>
                    </div>
                    <Flex
                        style={{
                            justifyContent: 'flex-end',
                            gap: 6,
                            marginTop: 6,
                        }}
                    >
                        <Button onClick={handleApplyRegex} style={{ marginRight: 26 }}>
                            Apply
                        </Button>
                        <Flex gap={6} >
                            <MinusCircleFilled onClick={onRemoveExtensionClick} style={{ fontSize: 24, color: 'gray' }} />
                            <PlusCircleOutlined onClick={onAddNewExtensionClick} style={{ fontSize: 24, color: 'gray' }} />
                        </Flex>
                    </Flex>
                </div>

                {/* Add Extension */}
                {
                    isAddExtensionVisible && (
                        <>
                            <div>
                                <h2>Regexp</h2>
                                <TextArea
                                    value={regex}
                                    onChange={(e) => setRegex(e.target.value)}
                                    rows={5}
                                    cols={50}
                                    placeholder='Enter regular expression'
                                />
                            </div>
                            <div>
                                <h2>Replace</h2>
                                <TextArea
                                    value={replacement}
                                    onChange={(e) => setReplacement(e.target.value)}
                                    rows={5}
                                    cols={50}
                                    placeholder='Enter replacement '
                                />
                            </div>
                            <div>
                                <h2>Title & Comment</h2>
                                <Input
                                    placeholder="Enter title & comment"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div
                                style={{
                                    marginTop: 30,
                                    display: 'flex',
                                    justifyItems: 'flex-end',
                                    justifyContent: 'center',
                                    gap: 50,
                                }}
                            >
                                <Button onClick={handleCancel}>Cancel</Button>
                                <Button onClick={onAddExtension}>Save</Button>
                            </div>
                        </>
                    )
                }
            </Flex>
            {/* <button onClick={handleApplyRegex}>Apply Regex</button> */}
        </Modal>
    );

};

export default RegexEditorModal;
