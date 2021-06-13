import React, { useState, useEffect, useMemo, useCallback, useReducer } from 'react';

import WithSidebar from '@components/UI/WithSidebar';
import WithToolbar from '@components/UI/WithToolbar';
import PanelContainer from '@components/UI/PanelContainer';
import DocumentPanel from '@components/UI/DocumentPanel';

import Browser from '@components/Browser';
import EditorPanel from '@components/EditorPanel';

type FileDocument = {
	type: 'file';
	path: string;
};

type Document = FileDocument;

const Document = {
	key: (doc: Document): string => {
		switch (doc.type) {
			case 'file':
				return doc.path;
		}
	},
	isEqual: (lhs: Document, rhs: Document): boolean => {
		if (lhs.type !== rhs.type) return false;
		switch (lhs.type) {
			case 'file':
				return lhs.path === rhs.path;
		}
	},
};

type OpenDocument = {
	type: 'open',
	document: Document,
}

type CloseDocument = {
	type: 'close',
	key: string,
}

type FocusDocument = {
	type: 'focus',
	key: string,
}

type SetToolbar = {
	type: 'setToolbar',
	toolbar: JSX.Element,
}

type AppAction =
	OpenDocument
	| CloseDocument
	| FocusDocument
	| SetToolbar;

type AppState = {
	documents: Document[],
	focused: string | null,
	toolbar: JSX.Element | null,
}

function appStateReducer(state: AppState, action: AppAction): AppState {
	switch (action.type) {
		case 'open':
			const doc = state.documents.find((doc) => Document.key(doc) === Document.key(action.document));
			if (doc === undefined) {
				return { 
					...state,
					documents: [action.document].concat(state.documents),
					focused: Document.key(action.document),
				};
			} else {
				return {
					...state,
					focused: Document.key(doc),
				};
			}
		case 'close':
			return {
				documents: state.documents.filter((doc) => Document.key(doc) !== action.key),
				focused: state.focused === action.key ? null : state.focused,
				toolbar: state.focused === action.key ? null : state.toolbar,
			};
		case 'focus':
			return {
				...state,
				focused: action.key,
			};
		case 'setToolbar':
			return {
				...state,
				toolbar: action.toolbar,
			};
	}
}

const App = () => {
	const [state, dispatch] = useReducer(appStateReducer, {
		documents: [],
		focused: null,
		toolbar: null,
	});

	const documentPanels = state.documents.map((doc) => {
		const key = Document.key(doc);
		switch (doc.type) {
			case 'file':
				return (
					<EditorPanel 
						key={ key }
						fileName={ doc.path }
						focused={ state.focused === key }
						onClose={ () => {
							dispatch({
								type: 'close',
								key: key,
							});
						}}
						onFocus={ () => {
							dispatch({
								type: 'focus',
								key: key,
							});
						}}
						onSetToolbar={ (toolbar: JSX.Element) => {
							dispatch({
								type: 'setToolbar',
								toolbar: toolbar,
							});
						}}
					/>
				);
		}
	});

	return (
		<WithSidebar sidebar={
			<Browser
				onSelectDocument={ (document: Document) => {
					dispatch({
						type: 'open',
						document: document,
					});
				}}
			/>
		}>
			<WithToolbar toolbar={ state.toolbar }>
				<PanelContainer>
					{ documentPanels }
				</PanelContainer>
			</WithToolbar>
		</WithSidebar>
	);
};

export default App;
