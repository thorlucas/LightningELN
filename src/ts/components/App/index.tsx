import React, { useReducer } from 'react';

import WithSidebar from '@components/UI/WithSidebar';
import WithToolbar from '@components/UI/WithToolbar';
import PanelContainer from '@components/UI/PanelContainer';
import Browser from '@components/Browser';
import DocumentPanel from '@components/DocumentPanel';
import { appStateReducer } from './reducer';
import { Document } from '../../types/Document';
import { SettingsContext } from '@components/Contexts/Settings/context';
import { Settings } from '@components/Contexts/Settings';

//const defaultSettings: Settings = {
	//keybindings: {
		//editor: new Map([
			//['TOGGLE_BOLD', 'mod+b'],
			//['TOGGLE_ITALIC', 'mod+i'],
			//['TOGGLE_UNDERLINE', 'mod+u'],
			//['TOGGLE_CODE', 'ctrl+`'],
			//['TOGGLE_TITLE', 'mod+0'],
			//['TOGGLE_HEADING', 'mod+1'],
			//['TOGGLE_SUBHEADING', 'mod+2'],
			//['TOGGLE_SUBSUBHEADING', 'mod+3'],
		//]),
		//document: {
			//SAVE: 'mod+s',
			//CLOSE: 'mod+w',
		//}
	//}
//}

const defaultSettings: Settings = {
	document: {
		keybindings: {
			save_document: 'mod+s',
			close_document: 'mod+w',
		}
	}
}

const App = () => {
	const [state, dispatch] = useReducer(appStateReducer, {
		documents: [{
			type: 'file',
			path: 'procedures/foo.txt',
		}],
		focused: null,
		toolbar: null,
	});

	const documentPanels = state.documents.map((doc) => {
		const key = Document.key(doc);
		return (
			<DocumentPanel
				key={ key }
				document={ doc }
				onClose={ () => {
					dispatch({
						type: 'close',
						key: key,
					});
				}}
			/>
		);
	});

	return (
		<SettingsContext.Provider value={ defaultSettings }>
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
		</SettingsContext.Provider>
	);
};

export default App;
