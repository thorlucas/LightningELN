import isHotkey from 'is-hotkey';
import { Dispatch } from 'react';
import { KeybindingState, KeybindingCallback, KeybindingID, KeybindingTrigger } from './keybinder';

export type BindKey = {
	type: 'bind',
	trigger: KeybindingTrigger,
	callback: KeybindingCallback,
}

export type UnbindKey = {
	type: 'unbind',
	id: KeybindingID,
}

export type KeybindingAction =
	BindKey
  | UnbindKey;

export type KeybindingDispatch = Dispatch<KeybindingAction>;

function bindKey(state: KeybindingState, action: BindKey): KeybindingState {
	state.map.set(state.nextId++, {
		match: isHotkey(action.trigger),
		callback: action.callback,
	});
	return state;
}

function unbindKey(state: KeybindingState, action: UnbindKey): KeybindingState {
	state.map.delete(action.id);
	return state;
}

export function reducer(state: KeybindingState, action: KeybindingAction): KeybindingState {
	switch (action.type) {
		case 'bind':
			return bindKey(state, action);
		case 'unbind':
			return unbindKey(state, action);
	}
}
