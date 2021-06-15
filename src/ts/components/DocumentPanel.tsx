import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Panel } from '@components/UI/Panel';
import Editor from '@components/Editor';

// TODO: fix import
import { Document } from '../types/Document';
import { useFile } from '@hooks/file';
import { Descendant } from 'slate';
import { KeybindingGroup } from './Contexts/Keybinding';

const emptyBuffer: Descendant[] = [{
	type: 'paragraph',
	children: [{ text: '' }],
}];

function deserializeDocument(data: string): Descendant[] {
	const json: any = JSON.parse(data);
	// FIXME: validate
	const parsed: Descendant[] = json as Descendant[];
	return parsed;
}

function serializeDocument(data: Descendant[]): string {
	return JSON.stringify(data);
}

const DocumentPanel = ({ document, onClose }: {
	document: Document,
	onClose: () => void,
}) => {
	const [value, setValue, save, dirty] = useFile<Descendant[]>(document.path, {
		serializer: serializeDocument,
		deserializer: deserializeDocument,
	}, emptyBuffer);

	const titleElement = useMemo(() => (
		<span className={ dirty ? 'italic' : '' }>{ document.path }</span>
	), [document, dirty]);

	return (
		<Panel
			title={ titleElement }
			onClose={ onClose }
			renderInnerWrapper={ ({ children }) => (
				<KeybindingGroup wrapperAttributes={{ className: "h-full focus:outline-none" }}>
					{ children }
				</KeybindingGroup>
			)}
		>
			<Editor
				value={ value }
				setValue={ setValue }
			/>
		</Panel>
	);
};

export default DocumentPanel;
