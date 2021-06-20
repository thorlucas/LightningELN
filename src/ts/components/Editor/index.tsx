import React, { useEffect, useState, useCallback, useMemo, SyntheticEvent } from 'react';

import { createEditor, Descendant, Editor as SlateEditor, Transforms, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import { CustomEditor } from './types';

import Element from './element';
import Leaf from './leaf';
import { toggleBlock, toggleMark } from './util';
import { KeybindingTriggerCallbackArgMap, useKeybindings } from '@components/Contexts/Keybinding/hooks';
import { EditorAction, useSettings } from '@components/Contexts/Settings';
import _ from 'lodash';
import { KeybindingTrigger } from '@components/Contexts/Keybinding/keybinder';

//import { Keybinding, useKeybinding, useKeybindings } from '@hooks/index';

type KBHandlerMarkArg = {
	type: 'mark',
	mark: string,
}

type KBHandlerBlockArg = {
	type: 'block',
	block: SlateElement['type'],
}

type KBHandlerArg = KBHandlerMarkArg | KBHandlerBlockArg;

const toggleMappings: Map<EditorAction, KBHandlerArg> = new Map([
	['TOGGLE_BOLD', { type: 'mark', mark: 'bold' }],
	['TOGGLE_ITALIC', { type: 'mark', mark: 'italic' }],
	['TOGGLE_UNDERLINE', { type: 'mark', mark: 'underline' }],
	['TOGGLE_CODE', { type: 'mark', mark: 'code' }],
	['TOGGLE_TITLE', { type: 'block', block: 'title' }],
	['TOGGLE_HEADING', { type: 'block', block: 'heading' }],
	['TOGGLE_SUBHEADING', { type: 'block', block: 'subheading' }],
	['TOGGLE_SUBSUBHEADING', { type: 'block', block: 'subsubheading' }],
]);

const Editor = ({ value, setValue }) => {
	const editor: CustomEditor = useMemo(() => {
		return withHistory(withReact(createEditor()))
	}, []);

	const editorSettings = useSettings().Keybindings.editor;
	const keybindings = useMemo(() => {
		_.forEach(toggleMappings, () => console.log("entry"));
	}, [editorSettings]);

	const handleToggleKeybinding = useCallback((toggle: KBHandlerArg) => {
		switch (toggle.type) {
			case 'mark': return toggleMark(editor, toggle.mark);
			case 'block': return toggleBlock(editor, toggle.block);
		}
	}, []);


	const renderLeaf = useCallback(props => <Leaf { ...props }/>, []);
	const renderElement = useCallback(props => <Element { ...props }/>, []);




	// TODO: Make it so clicking on the document actually focuses

	return (
		<div className="mx-auto max-w-3xl">
			<Slate
				editor={ editor }
				value={ value }
				onChange={ (newValue) => setValue(newValue) }
			>
				<Editable
					spellCheck
					renderLeaf={ renderLeaf }
					renderElement={ renderElement }
				/>
			</Slate>
		</div>
	);
};

export default Editor;
