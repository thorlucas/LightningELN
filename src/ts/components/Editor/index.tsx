import React, { useEffect, useState, useCallback, useMemo, SyntheticEvent } from 'react';

import { createEditor, Descendant, Editor as SlateEditor, Transforms, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import { CustomEditor } from './types';

import Leaf from './leaf';
import Element from './element';
import {} from './util';

//import { Keybinding, useKeybinding, useKeybindings } from '@hooks/index';


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

const Editor = ({ value, setValue }) => {
	const editor: CustomEditor = useMemo(() => {
		return withHistory(withReact(createEditor()))
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
