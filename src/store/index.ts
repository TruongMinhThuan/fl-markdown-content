import { create } from "zustand";

const initialMarkdownContent = `
# Title1
## Title2
### Title3
#### Title4
##### Title5
###### Title6
text
text2
**Bold**  
*Italic*  

- [ ] a task list item
- [ ] list syntax required
- [ ] normal **formatting**, @mentions, #1234 refs
- [ ] incomplete
- [x] completed
- hogehoge
  - fuga
    - bar
    - [ ] motimot
1. fuba
1. fuba
1. fuba

|table1|table2|table3|
|:--|--:|:--:|
|align left|align right|align center|
|a|b|c|

### Quote
>This is Quote
>This is Quote
>>This is Quote
>>>This is Quote

### Code Block
\`\`\`JavaScript
// For Debug
printf = function(str){
    window.alert(str);
};
// Add the processing of applications
\`\`\`
### Horizon
---
### Link
https://ob-g.com/corpo/
[Objective Group](https://ob-g.com/corpo/)
![Logo](https://ob-g.com/obg_staging/wp-content/themes/obg/res/img/03_slider/top.jpg)
`;

export interface MarkdownExtension {
    id: number;
    title: string;
    regular_expression: string;
    replacement: string;
    is_selected?: boolean;
}

interface MarkdownState {
    content: string;
    setContent: (content: string) => void;
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
    extensions: MarkdownExtension[];
    setExtensions: (extensions: MarkdownExtension[]) => void;
    addExtension: (extension: MarkdownExtension) => void;
    removeExtension: (extension: MarkdownExtension) => void;
    updateExtension: (extension: MarkdownExtension) => void;
    selectedExtension: MarkdownExtension | null;
    onToggleSelectExtension: (extension: MarkdownExtension) => void;
    setSelectExtension: (extension: MarkdownExtension | null) => void;
}

export const useMarkdownStore = create<MarkdownState>((set, get) => ({
    content: initialMarkdownContent,
    isModalOpen: false,
    extensions: [],
    selectedExtension: null,
    setContent: (content) => set({ content }),
    setIsModalOpen: (isModalOpen: boolean) => set({ isModalOpen }),
    setExtensions: (extensions: MarkdownExtension[]) => set({ extensions }),
    addExtension: (extension: MarkdownExtension) => set((state) => ({ extensions: [...state.extensions, extension] })),
    removeExtension: (extension: MarkdownExtension) => set((state) => ({ extensions: state.extensions.filter((ext) => ext !== extension) })),
    updateExtension: (extension: MarkdownExtension) => set((state) => ({
        extensions: state.extensions.map((ext) => ext.id === extension.id ? extension : ext)
    })),
    onToggleSelectExtension: (extension: MarkdownExtension) => {
        if (get().selectedExtension?.id === extension.id) {
            set({ selectedExtension: null })
        } else {
            set({ selectedExtension: extension })
        }
    },
    setSelectExtension: (extension: MarkdownExtension | null) => set({ selectedExtension: extension }),

}));
