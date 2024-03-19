import { Editor } from "novel";

type NovelEditorProps = {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
};

export default function NovelEditor({
  onChange,
  initialContent,
  editable,
}: NovelEditorProps) {
  return (
    <Editor
      className="outline-none shadow-none"
      defaultValue={initialContent ? JSON.parse(initialContent) : undefined}
    />
  );
}
