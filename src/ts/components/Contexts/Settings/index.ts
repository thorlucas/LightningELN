import { KeybindingTrigger } from "../Keybinding/keybinder";

export { SettingsContext } from './context';
export { useSettings } from './hooks';

export type SettingPath = any;

export type Settings = {
	document: {
		keybindings: {
			save_document: KeybindingTrigger,
			close_document: KeybindingTrigger,
		}
	}
}
