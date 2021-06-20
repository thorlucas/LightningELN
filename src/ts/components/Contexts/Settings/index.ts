import { KeybindingTrigger } from "../Keybinding/keybinder";

export { SettingsContext } from './context';
export { useSettings } from './hooks';

/**
 * These are actions that can be done in the editor.
 */
export type EditorAction =
	'TOGGLE_BOLD'
  | 'TOGGLE_ITALIC'
  | 'TOGGLE_UNDERLINE'
  | 'TOGGLE_CODE'
  | 'TOGGLE_TITLE'
  | 'TOGGLE_HEADING'
  | 'TOGGLE_SUBHEADING'
  | 'TOGGLE_SUBSUBHEADING';

/**
 * These are actions that can be done in a document.
 */
export type DocumentAction = 
	'SAVE'
  | 'CLOSE';

/**
 * These are all actions that can be done in the application.
 */
export type Action = EditorAction | DocumentAction;

export type KeybindingSettings = {
	editor: Map<EditorAction, KeybindingTrigger>,
	document: Map<DocumentAction, KeybindingTrigger>,
}

export type Settings = {
	Keybindings: KeybindingSettings,
}
