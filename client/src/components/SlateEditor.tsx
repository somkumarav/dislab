import { useEffect, useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { Node } from 'slate';
import { Msg } from '../pages/ChatWindow';

interface Props {
  setCurrentMessage: React.Dispatch<React.SetStateAction<Msg[]>>;
  clearMessage: boolean;
  setClearMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SlateEditor: React.FC<Props> = ({
  setCurrentMessage,
  clearMessage,
  setClearMessage,
}) => {
  const initialValue: Descendant[] = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  useEffect(() => {
    const data = { text: value.map((n) => Node.string(n)) };
    const msg = data.text.map((a) => {
      return { text: a };
    });
    setCurrentMessage(msg);
  }, [value]);

  useEffect(() => {
    if (clearMessage) {
      editor.children = [{ type: 'paragraph', children: [{ text: '' }] }];
      // setValue(initialValue);
      setClearMessage(false);
    }
  }, [clearMessage]);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable
        placeholder="Type Message"
        className="textarea"
        style={{
          height: '100%',
          width: '80%',
          overflow: 'scroll',
          padding: '5px 10px ',
          backgroundColor: '#786a9d',
          color: '#262d31',
          fontSize: '18px',
        }}
        renderPlaceholder={({ children, attributes }) => (
          <div {...attributes}>
            <p>{children}</p>
          </div>
        )}
      />
    </Slate>
  );
};
