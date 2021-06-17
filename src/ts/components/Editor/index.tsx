import React, { useEffect, useState, useCallback, useMemo, SyntheticEvent } from 'react';

import { createEditor, Descendant, Editor as SlateEditor, Transforms, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import { CustomEditor } from './types';

import Element from './element';
import Leaf from './leaf';
import { toggleBlock, toggleMark } from './util';
import { useKeybinding } from '@components/Contexts/Keybinding';
import { KeybindingTriggerCallbackArgMap, useKeybindings } from '@components/Contexts/Keybinding/hooks';

//import { Keybinding, useKeybinding, useKeybindings } from '@hooks/index';


const MARK_BINDINGS: KeybindingTriggerCallbackArgMap<[string]> = {
	'mod+b': ['bold'],
	'mod+i': ['italic'],
	'mod+u': ['underline'],
	'ctrl+`': ['code'],
};

const BLOCK_BINDINGS: KeybindingTriggerCallbackArgMap<[SlateElement['type']]> = {
	'mod+0': ['title'],
	'mod+1': ['heading'],
	'mod+2': ['subheading'],
	'mod+3': ['subsubheading'],
};

const Editor = ({ value, setValue }) => {
	const editor: CustomEditor = useMemo(() => {
		return withHistory(withReact(createEditor()))
	}, []);

	const renderLeaf = useCallback(props => <Leaf { ...props }/>, []);
	const renderElement = useCallback(props => <Element { ...props }/>, []);

	const toggleMarkKeybinding = useCallback((mark: string) => {
		toggleMark(editor, mark);
	}, []);

	const toggleBlockKeybinding = useCallback((block: SlateElement['type']) => {
		toggleBlock(editor, block);
	}, []);

	useKeybindings(MARK_BINDINGS, toggleMarkKeybinding);
	useKeybindings(BLOCK_BINDINGS, toggleBlockKeybinding);

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
