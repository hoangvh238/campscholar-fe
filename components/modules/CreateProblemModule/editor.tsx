import { Checkbox } from "@/components/core/common/checkbox";
import { Label } from "@/components/core/common/label";

import { CheckedState } from "@radix-ui/react-checkbox";
import { Mathematics } from "@tiptap-pro/extension-mathematics";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "katex/dist/katex.min.css";
import { useCallback, useEffect } from "react";

import "./styles.scss";
import EditorToolbar from "./editor-toolbar";

interface EditorProps {
  content: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

Mathematics.configure({
  shouldRender: (state, pos, node) => {
    const $pos = state.doc.resolve(pos);
    return node.type.name === "text" && $pos.parent.type.name !== "codeBlock";
  },
});

const Editor = ({ content, placeholder, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Mathematics],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const toggleEditing = useCallback(
    (e: CheckedState) => {
      if (!editor) return;
      const checked = e;
      editor.setEditable(!checked, true);
      editor.view.dispatch(editor.view.state.tr.scrollIntoView());
    },
    [editor],
  );
  if (!editor) {
    return null;
  }
  return (
    <>
      <div className="prose w-full max-w-none border border-input bg-background dark:prose-invert">
        <EditorToolbar editor={editor} />
        <div className="editor">
          <EditorContent editor={editor} placeholder={placeholder} />
        </div>
      </div>
    </>
  );
};
export default Editor;
