import React from 'react';
import {
  BtnBulletList,
  BtnClearFormatting,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  HtmlButton,
  Separator,
  Toolbar,
  BtnItalic,
  BtnBold,
  EditorProvider,
} from 'react-simple-wysiwyg';

const Richtexteditot = ({ intial, oneditorchange }) => {
  return (
    <EditorProvider>
      <Editor
        value={intial} // Use the updated value from props
        onChange={(e) => oneditorchange(e.target.value)} // Call parent handler for every change
      >
        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <HtmlButton />
          <Separator />
          <BtnStyles />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
};

export default Richtexteditot;
