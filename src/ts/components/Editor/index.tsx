import React, { useEffect, useState, useCallback, useMemo, SyntheticEvent } from 'react';

import { createEditor, Descendant, Editor as SlateEditor, Transforms, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import { CustomEditor } from './types';

import Leaf from './leaf';
import Element from './element';
import {} from './util';

//import { Keybinding, useKeybinding, useKeybindings } from '@hooks/index';

const emptyBuffer: Descendant[] = [{
	type: 'paragraph',
	children: [{ text: '' }],
}];

//const MARK_BINDINGS: [string, string][] = [
	//['mod+b', 'bold'],
	//['mod+i', 'italic'],
	//['mod+u', 'underline'],
	//['ctrl+`', 'code'],
//];

//const BLOCK_BINDINGS: [string, SlateElement['type']][] = [
	//['mod+0', 'title'],
	//['mod+1', 'heading'],
	//['mod+2', 'subheading'],
	//['mod+3', 'subsubheading'],
//];

const Editor = ({ fileName }) => {
	const editor: CustomEditor = useMemo(() => {
		return withHistory(withReact(createEditor()))
	}, []);

	const [savedValue, setSavedValue] = useState<Descendant[] | undefined>(undefined);
	const [value, setValue] = useState<Descendant[]>(emptyBuffer);

	// TODO: Hmmm, inefficient?
	const dirty: boolean = (value !== savedValue);

	const toolbar = useMemo(() => (
		<div className="py-4 bg-white">
			Hello from { fileName }
		</div>
	), [fileName]);

	const save = useCallback(() => {
		// TODO: Do we make a copy of the value here in case it changes?
		const val = JSON.stringify(value);
		window.fs.writeFile(fileName, val)
		.then(() => {
			setSavedValue(value);
		})
		.catch((err: any) => {
			console.error(err);
		});
	}, [value]);

	// FIXME: if save func changes, this wont work (I think)
	//const keybindings: Keybinding[] = useMemo(() => {
		//return [
			//...MARK_BINDINGS.map(([combo, mark]): Keybinding => [combo, () => {
				//toggleMark(editor, mark);
			//}]),
			//...BLOCK_BINDINGS.map(([combo, block]): Keybinding => [combo, () => {
				//toggleBlock(editor, block);
			//}]),
		//];
	//}, []);

	//useKeybindings(keybindings, focused);
	//useKeybinding(['mod+s', save], focused);

	//useEffect(() => {
		//if (focused) {
			//console.log(`Focused ${fileName}`);
			////ReactEditor.focus(editor);
			//onSetToolbar(toolbar);
			//// TODO: Move cursor to the end
			//// TODO: Move cursor back to where it was originally
		//} else {
			////ReactEditor.blur(editor);
			//// FIXME: We can't unset toolbar here if we click away 
		//}
	//}, [focused]);

	useEffect(() => {
		window.fs.readFile(fileName)
		.then((data: string) => {
			const val = JSON.parse(data);
			// FIXME: Check if the descendant is valid
			//if (!Node.isNodeList(val)) {
				//throw 'Invalid document';
			//}
			// TODO: Do we combine this into one?
			setValue(val);
			setSavedValue(val);
		})
		.catch((err: any) => {
			console.error(err);
		});
	}, [fileName]);

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
