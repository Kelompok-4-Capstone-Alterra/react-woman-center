import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import './index.css';

import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { useEffect, useState } from 'react';
import Placeholder from '@tiptap/extension-placeholder';
import { Controller, useController, useForm, useFormContext } from 'react-hook-form';

const ColorPicker = ({ editor }) => {
  const initialColor = editor.getAttributes('textStyle').color;
  const [color, setColor] = useState(initialColor || '#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    const newColor = event.target.value;
    setColor(newColor);
    editor.chain().focus().setColor(newColor).run();
  };

  const handleShowColorPicker = (event) => {
    event.preventDefault();
    if (!showColorPicker) {
      setShowColorPicker(true);
    } else {
      setShowColorPicker(false);
    }
  };

  return (
    <div className="flex flex-row items-center justify-content">
      <button onClick={handleShowColorPicker}>
        <FormatColorFillIcon className="h-[50%]" style={{ color }} />
      </button>
      {showColorPicker ? <input type="color" value={color} onChange={handleChange} /> : null}
    </div>
  );
};

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const handleClick = (event, action) => {
    event.preventDefault();
    action();
  };

  return (
    <div className="menuBar prose border border-solid mb-4 flex h-[47px] items-center p-4 gap-x-4">
      <div>
        <button onClick={(event) => handleClick(event, () => editor.chain().focus().toggleBold().run())} className={editor.isActive('bold') ? 'is_active text-primaryMain' : ''}>
          <FormatBoldIcon />
        </button>
        <button onClick={(event) => handleClick(event, () => editor.chain().focus().toggleItalic().run())} className={editor.isActive('italic') ? 'is_active text-primaryMain' : ''}>
          <FormatItalicIcon />
        </button>
        <button onClick={(event) => handleClick(event, () => editor.chain().focus().toggleUnderline().run())} className={editor.isActive('underline') ? 'is_active text-primaryMain' : ''}>
          <FormatUnderlinedIcon />
        </button>
      </div>

      <div>
        <button
          onClick={(event) =>
            handleClick(event, () => {
              if (editor.isActive({ textAlign: 'center' })) {
                return editor.chain().focus().setTextAlign('left').run();
              } else {
                return editor.chain().focus().setTextAlign('center').run();
              }
            })
          }
          className={editor.isActive({ textAlign: 'center' }) ? 'is_active text-primaryMain' : ''}
        >
          <FormatAlignCenterIcon />
        </button>
        <button
          onClick={(event) =>
            handleClick(event, () => {
              if (editor.isActive({ textAlign: 'right' })) {
                return editor.chain().focus().setTextAlign('left').run();
              } else {
                return editor.chain().focus().setTextAlign('right').run();
              }
            })
          }
          className={editor.isActive({ textAlign: 'right' }) ? 'is_active text-primaryMain' : ''}
        >
          <FormatAlignRightIcon />
        </button>
        <button
          onClick={(event) =>
            handleClick(event, () => {
              if (editor.isActive({ textAlign: 'justify' })) {
                return editor.chain().focus().setTextAlign('left').run();
              } else {
                return editor.chain().focus().setTextAlign('justify').run();
              }
            })
          }
          className={editor.isActive({ textAlign: 'justify' }) ? 'is_active text-primaryMain' : ''}
        >
          <FormatAlignJustifyIcon />
        </button>
      </div>

      <div>
        <button onClick={(event) => handleClick(event, () => editor.chain().focus().toggleBulletList().run())} className={editor.isActive('bulletList') ? 'is_active text-primaryMain' : ''}>
          <FormatListBulletedIcon />
        </button>
        <button onClick={(event) => handleClick(event, () => editor.chain().focus().toggleOrderedList().run())} className={editor.isActive('orderedList') ? 'is_active text-primaryMain' : ''}>
          <FormatListNumberedIcon />
        </button>
      </div>

      <div className="flex">
        <ColorPicker editor={editor} />
      </div>
    </div>
  );
};

export const TextEditor = ({ label, name, register, control, errors }) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // bulletList: false,
        // orderedList: false,
      }),
      Underline,
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color.configure({
        types: ['textStyle'],
      }),
      Placeholder.configure({
        placeholder: "Write your article! You're the journalist.",
      }),
    ],
    content: value,

    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="flex flex-col mb-4 gap-y-2">
      <label>{label}</label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="textEditor w-full flex flex-col border border-solid p-[32px]">
            <MenuBar editor={editor} />
            <EditorContent
              className="prose prose-p:m-0 prose-ul:m-0 prose-ol:m-0 max-w-none border border-solid h-[378px] overflow-auto"
              editor={editor}
              {...register(name, {
                required: `The ${name} field is required`,
              })}
            />
          </div>
        )}
      />
      <p className="mt-2 text-red-800 font-xs font-medium"> {errors[name] && errors[name].message}</p>
    </div>
  );
};
