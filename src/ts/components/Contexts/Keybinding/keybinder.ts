import { KeybindingDispatch } from "./reducer";

export type KeybindingID = number;
export type KeybindingCallback<T extends unknown[] = []> = (...args: T) => void;
export type KeybindingTrigger = string;

export type KeybindingMatcher = (event: KeyboardEvent) => boolean;

type Keybinding = {
	match: KeybindingMatcher,
	callback: KeybindingCallback,
	prevent: boolean,
}

export type KeybindingMap = Map<KeybindingID, Keybinding>;

export type KeybindingState = {
	map: KeybindingMap,
	nextId: KeybindingID,
}

export type KeyUnbinder = () => void;
export type KeyBinder = (trigger: KeybindingTrigger, callback: KeybindingCallback, prevent: boolean) => KeyUnbinder;

export function createKeyBinder(id: KeybindingID, dispatch: KeybindingDispatch): KeyBinder {
	return (trigger, callback, prevent) => {
		dispatch({
			type: 'bind',
			trigger: trigger,
			callback: callback,
			prevent: prevent,
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
