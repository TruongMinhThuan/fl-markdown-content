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

interface MarkdownState {
    content: string;
    setContent: (content: string) => void;
}

export const useMarkdownStore = create<MarkdownState>((set) => ({
    content: initialMarkdownContent,
    setContent: (content) => set({ content }),
}));
