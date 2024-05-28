import React from 'react';
import { Breadcrumb, Button, CollapseProps, Flex, Layout, theme } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useMarkdownStore } from '../store';
import 'highlight.js/styles/github.css'; // Import a highlight.js theme
import MarkDownContent from '../components/MarkDownContent';
import RegexEditorModal from '../components/RegexEditorModal';

const { Header, Content, Footer } = Layout;


const HomePage: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { content, setContent, setIsModalOpen } = useMarkdownStore(state => state)

    return (
        <Layout>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px ', }}>
                    {/* <Button style={{ marginRight: 6 }} type="primary">View</Button>
                    <Button style={{ marginRight: 6 }} type="primary"> Markdown</Button> */}
                    <Button style={{ marginRight: 6 }} type="primary" onClick={() => setIsModalOpen(true)}>Regexp</Button>
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Flex flex-direction="column" gap={12}>
                        <Flex flex={1}>
                            <TextArea
                                rows={30}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />

                        </Flex>
                        <Flex flex={1}>
                            <MarkDownContent />
                        </Flex>

                    </Flex>
                </div>
                <RegexEditorModal />

            </Content>
            <Footer style={{ textAlign: 'center' }}>

            </Footer>
        </Layout>
    );
};

export default HomePage;