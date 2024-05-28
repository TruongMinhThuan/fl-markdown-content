import React from 'react';
import { Breadcrumb, Button, Flex, Layout, Menu, theme } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useMarkdownStore } from '../store';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import 'highlight.js/styles/github.css'; // Import a highlight.js theme
import MarkDownContent from '../components/MarkDownContent';
import RegexEditor from '../components/RegexEditor';

const { Header, Content, Footer } = Layout;

const items = new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
}));

const HomePage: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const { content, setContent } = useMarkdownStore(state => state)

    return (
        <Layout>
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        /> */}
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px ', }}>
                    {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item> */}
                    <Button style={{ marginRight: 6 }} type="primary">View</Button>
                    <Button style={{ marginRight: 6 }} type="primary"> Markdown</Button>
                    <RegexEditor />
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
                            />

                        </Flex>
                        <Flex flex={1}>
                            <MarkDownContent />
                        </Flex>

                    </Flex>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>

            </Footer>
        </Layout>
    );
};

export default HomePage;