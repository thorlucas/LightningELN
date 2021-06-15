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

	const renderTitle = useCallback(() => {
		return (
			<span className={ dirty ? 'italic' : '' }>{ document.path }</span>
		);
	}, [document, dirty]);

	return (
		<Panel
			renderTitle={ renderTitle }
			onClose={ onClose }
			renderInnerWrapper={ ({ attributes, children }) => (
				<div { ...attributes }>
					{ children }
				</div>
			)}
		>
			<KeybindingGroup render={ ({ attributes, children }) => (
				<div className="h-full" { ...attributes }>
					{ children }
				</div>
			)}>
				<Editor
					value={ value }
					setValue={ setValue }
				/>
			</KeybindingGroup>
		</Panel>
	);
};

export default DocumentPanel;
