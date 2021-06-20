// TODO: Fix import here
import { Document } from '../../types/Document';

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

export function appStateReducer(state: AppState, action: AppAction): AppState {
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

