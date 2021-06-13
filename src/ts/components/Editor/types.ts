import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type ParagraphElement = {
	type: 'paragraph';
	children: Descendant[];
};

export type TitleElement = {
	type: 'title';
	children: Descendant[];
};

export type HeadingElement = {
	type: 'heading';
	children: Descendant[];
};

export type SubheadingElement = {
	type: 'subheading';
	children: Descendant[];
};

export type SubsubheadingElement = {
	type: 'subsubheading';
	children: Descendant[];
};

export type StyledText = {
	bold?: boolean;
	italic?: boolean;
	underline?: boolean;
	code?: boolean;
	text: string;
}

export type EmptyText = {
	text: string;
}

export type CustomText = EmptyText | StyledText;
export type CustomElement =
	ParagraphElement
  | TitleElement
  | HeadingElement
  | SubheadingElement
  | SubsubheadingElement;
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
	interface CustomTypes {
		Editor: CustomEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
