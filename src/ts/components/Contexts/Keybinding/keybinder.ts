import { KeybindingDispatch } from "./reducer";

export type KeybindingID = number;
export type KeybindingCallback = () => void;
export type KeybindingTrigger = string;

export type KeybindingMatcher = (event: KeyboardEvent) => boolean;

export type Keybinding = {
	match: KeybindingMatcher,
	callback: KeybindingCallback,
}

export type KeybindingMap = Map<KeybindingID, Keybinding>;

export type KeybindingState = {
	map: KeybindingMap,
	nextId: KeybindingID,
}

export type KeyUnbinder = () => void;
export type KeyBinder = (trigger: KeybindingTrigger, callback: KeybindingCallback) => KeyUnbinder;

export function createKeyBinder(id: KeybindingID, dispatch: KeybindingDispatch): KeyBinder {
	return (trigger, callback) => {
		dispatch({
			type: 'bind',
			trigger: trigger,
			callback: callback,
		});
		return () => {
			dispatch({
				type: 'unbind',
				id: id,
			});
		};
	};
}

export function emptyKeybindingState(): KeybindingState {
	return {
		map: new Map(),
		nextId: 0,
	};
}