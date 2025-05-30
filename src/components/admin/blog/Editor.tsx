"use client";

import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  Noop,
  RefCallBack,
} from "react-hook-form";
import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Braces,
  Code,
  Dot,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
  Unlink,
  YoutubeIcon,
} from "lucide-react";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";

type ControllerRenderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  onChange: (...event: string[]) => void;
  onBlur: Noop;
  value: FieldPathValue<TFieldValues, TName>;
  disabled?: boolean;
  name: TName;
  ref: RefCallBack;
};

function MenuBar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert(e);
    }
  };

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b ">
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded ${
          editor.isActive("bold") ? "bg-primary text-secondary" : ""
        }`}
      >
        <Bold />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${
          editor.isActive("italic") ? "bg-primary text-secondary" : ""
        }`}
      >
        <Italic />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-2 rounded ${
          editor.isActive("strike") ? "bg-primary text-secondary" : ""
        }`}
      >
        <Strikethrough />
      </Button>

      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCode().run();
        }}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={`p-2 rounded ${
          editor.isActive("code") ? "bg-primary text-secondary" : ""
        }`}
      >
        <Code />
      </Button>
      {/* <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().unsetAllMarks().run();
        }}
        className="p-2 rounded "
      >
        Clear marks
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().clearNodes().run();
        }}
        className="p-2 rounded "
      >
        Clear nodes
      </button> */}
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setParagraph().run();
        }}
        className={`p-2 rounded ${
          editor.isActive("paragraph") ? "bg-primary text-secondary" : ""
        }`}
      >
        <Pilcrow />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={`p-2 rounded ${
          editor.isActive("heading", { level: 1 })
            ? "bg-primary text-secondary"
            : ""
        }`}
      >
        <Heading1 />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={`p-2 rounded ${
          editor.isActive("heading", { level: 2 })
            ? "bg-primary text-secondary"
            : ""
        }`}
      >
        <Heading2 />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
        className={`p-2 rounded ${
          editor.isActive("heading", { level: 3 })
            ? "bg-primary text-secondary"
            : ""
        }`}
      >
        <Heading3 />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 4 }).run();
        }}
        className={`p-2 rounded ${
          editor.isActive("heading", { level: 4 })
            ? "bg-primary text-secondary"
            : ""
        }`}
      >
        <Heading4 />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 5 }).run();
        }}
        className={`p-2 rounded ${
          editor.isActive("heading", { level: 5 })
            ? "bg-primary text-secondary"
            : ""
        }`}
      >
        <Heading5 />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 6 }).run();
        }}
        className={`p-2 rounded ${
          editor.isActive("heading", { level: 6 })
            ? "bg-primary text-secondary"
            : ""
        }`}
      >
        <Heading6 />
      </Button>
      <Button
        size="icon"
        onClick={setLink}
        className={editor.isActive("link") ? "is-active" : ""}
      >
        <Link2 />
      </Button>
      <Button
        size="icon"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
      >
        <Unlink />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={`p-2 rounded ${
          editor.isActive("bulletList") ? "bg-primary text-secondary" : ""
        }`}
      >
        <List />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={`p-2 rounded ${
          editor.isActive("orderedList") ? "bg-primary text-secondary" : ""
        }`}
      >
        <ListOrdered />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCodeBlock().run();
        }}
        className={`p-2 rounded ${
          editor.isActive("codeBlock") ? "bg-primary text-secondary" : ""
        }`}
      >
        <Braces />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBlockquote().run();
        }}
        className={`p-2 rounded ${
          editor.isActive("blockquote") ? "bg-primary text-secondary" : ""
        }`}
      >
        <Quote />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setHorizontalRule().run();
        }}
        className="p-2 rounded "
      >
        <Minus />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setHardBreak().run();
        }}
        className="p-2 rounded "
      >
        <Dot />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-2 rounded "
      >
        <Undo2 />
      </Button>
      <Button
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-2 rounded "
      >
        <Redo2 />
      </Button>
      {/* <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setColor("#958DF1").run();
        }}
        className={`p-2 rounded ${
          editor.isActive("textStyle", { color: "#958DF1" })
            ? "bg-primary text-secondary"
            : ""
        }`}
      >
        Purple
      </button> */}
      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file || !editor) return;

          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const result = await response.json();

          editor
            .chain()
            .focus()
            .setImage({ src: result?.url, alt: file.name })
            .run();

          const caption = prompt("Add a caption for your image (optional):");
          if (caption) {
            editor
              .chain()
              .focus()
              .insertContent(
                `<figure><img src="${result?.url}" alt="${file.name}"/><figcaption>${caption}</figcaption></figure>`
              )
              .run();
          }
        }}
        className="p-2 rounded "
      />
      <Button size="icon" id="add" onClick={addYoutubeVideo}>
        <YoutubeIcon />
      </Button>
    </div>
  );
}

const Editor = ({ field }: { field: ControllerRenderProps }) => {
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    Image.extend({
      addAttributes() {
        return {
          ...this.parent?.(),
          alt: { default: null },
          title: { default: null },
        };
      },
    }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: "https",
      protocols: ["http", "https"],
      isAllowedUri: (url, ctx) => {
        try {
          // construct URL
          const parsedUrl = url.includes(":")
            ? new URL(url)
            : new URL(`${ctx.defaultProtocol}://${url}`);

          // use default validation
          if (!ctx.defaultValidate(parsedUrl.href)) {
            return false;
          }

          // disallowed protocols
          const disallowedProtocols = ["ftp", "file", "mailto"];
          const protocol = parsedUrl.protocol.replace(":", "");

          if (disallowedProtocols.includes(protocol)) {
            return false;
          }

          // only allow protocols specified in ctx.protocols
          const allowedProtocols = ctx.protocols.map((p) =>
            typeof p === "string" ? p : p.scheme
          );

          if (!allowedProtocols.includes(protocol)) {
            return false;
          }

          // disallowed domains
          const disallowedDomains = [
            "example-phishing.com",
            "malicious-site.net",
          ];
          const domain = parsedUrl.hostname;

          if (disallowedDomains.includes(domain)) {
            return false;
          }

          // all checks have passed
          return true;
        } catch {
          return false;
        }
      },
      shouldAutoLink: (url) => {
        try {
          // construct URL
          const parsedUrl = url.includes(":")
            ? new URL(url)
            : new URL(`https://${url}`);

          // only auto-link if the domain is not in the disallowed list
          const disallowedDomains = [
            "example-no-autolink.com",
            "another-no-autolink.com",
          ];
          const domain = parsedUrl.hostname;

          return !disallowedDomains.includes(domain);
        } catch {
          return false;
        }
      },
    }),
    Youtube.configure({
      controls: false,
      nocookie: true,
    }),
  ];

  return (
    <div className="p-2 border rounded min-h-[300px] w-full prose max-w-none">
      <EditorProvider
        slotBefore={<MenuBar />}
        immediatelyRender={false}
        extensions={extensions}
        content={field?.value}
        enableCoreExtensions={true}
        onUpdate={({ editor }) => {
          field.onChange(editor.getHTML());
        }}
      ></EditorProvider>
    </div>
  );
};

export default Editor;
