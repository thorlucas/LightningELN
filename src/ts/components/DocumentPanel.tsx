import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Panel } from '@components/UI/Panel';
import Editor from '@components/Editor';

// TODO: fix import
import { Document } from '../types/Document';

const DocumentPanel = ({ document, onClose }: {
	document: Document,
	onClose: () => void,
}) => {
	const renderTitle = useCallback(() => {
		return (
			<span>{ document.path }</span>
		);
	}, [document]);

	return (
		<Panel
			renderTitle={ renderTitle }
			onClose={ onClose }
		>
			<Editor
				fileName={ document.path }
			/>
		</Panel>
	);
};

export default DocumentPanel;
