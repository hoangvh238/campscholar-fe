import React from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";

import { FormatType } from "./format-type";

import { Toggle } from "@/components/core/common/toggle";
import { ToggleGroup, Toolbar } from "@/components/core/common/toolbar";

interface EditorToolbarProps {
  editor: Editor;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  return (
    <Toolbar
      aria-label="Formatting options"
      className="m-0 flex items-center justify-between p-2"
    >
      <ToggleGroup className="flex flex-row items-center" type="multiple">
        <Toggle
          className="mr-1"
          disabled={!editor.can().chain().focus().toggleBold().run()}
          pressed={editor.isActive("bold")}
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          className="mr-1"
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          pressed={editor.isActive("italic")}
          size="sm"
          value="italic"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          className="mr-1"
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          pressed={editor.isActive("strike")}
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>

        <Toggle
          className="mr-1"
          pressed={editor.isActive("bulletList")}
          size="sm"
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List className="h-4 w-4" />
        </Toggle>

        <Toggle
          className="mr-1"
          pressed={editor.isActive("orderedList")}
          size="sm"
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Toggle
          className="mr-1"
          pressed={editor.isActive("codeBlock")}
          size="sm"
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code className="h-4 w-4" />
        </Toggle>

        <Toggle
          className="mr-1"
          pressed={editor.isActive("blockquote")}
          size="sm"
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
        >
          <Quote className="h-4 w-4" />
        </Toggle>

        <Toggle
          className="mr-1"
          size="sm"
          onPressedChange={() =>
            editor.chain().focus().setHorizontalRule().run()
          }
        >
          <Minus className="h-4 w-4" />
        </Toggle>

        <FormatType editor={editor} />
      </ToggleGroup>

      <ToggleGroup
        className="invisible flex flex-row items-center sm:visible"
        type="multiple"
      >
        <Toggle
          className="mr-1"
          disabled={!editor.can().chain().focus().undo().run()}
          size="sm"
          onPressedChange={() => editor.chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Toggle>

        <Toggle
          className="mr-1"
          disabled={!editor.can().chain().focus().redo().run()}
          size="sm"
          onPressedChange={() => editor.chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>
    </Toolbar>
  );
};
export default EditorToolbar;
