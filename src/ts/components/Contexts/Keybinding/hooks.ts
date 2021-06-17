import _, { forEach } from "lodash";
import { useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { KeybinderContext } from ".";
import { createKeybindingHandler, KeybindingHandler } from "./handler";
import { createKeyBinder, emptyKeybindingState, KeyBinder, KeybindingCallback, KeybindingTrigger } from "./keybinder";
import { reducer } from "./reducer";

export type KeybindingTriggerCallbackArgMap<T extends unknown[]> = {
	[key in KeybindingTrigger]: T;
}

export function useKeybinding(trigger: KeybindingTrigger, callback: KeybindingCallback, keybinder?: KeyBinder) {
	const _keybinder: KeyBinder = keybinder || useContext(KeybinderContext);

	useEffect(
		() => _keybinder(trigger, callback),
		[trigger, callback]
	);
}

export function useKeybindings<T extends unknown[]>(map: KeybindingTriggerCallbackArgMap<T>, callback: KeybindingCallback<T>) {
	const keybinder = useContext(KeybinderContext);

	_.chain(map)
	.mapValues(
		(args: T): KeybindingCallback => useCallback(
			() => callback(...args),
			[callback, ...args],
		)
	)
	.forEach(
		(curried: KeybindingCallback, trigger: KeybindingTrigger) => useKeybinding(trigger, curried, keybinder)
	)
	.value();
}


export function useKeybinder(): [KeyBinder, KeybindingHandler] {
	const [state, dispatch] = useReducer(reducer, emptyKeybindingState());

	const keybinder: KeyBinder = useMemo(() => {
		return createKeyBinder(state.nextId, dispatch);
	}, [state.nextId]);

	const handler: KeybindingHandler = useMemo(() => {
		return createKeybindingHandler(state.map);
	}, [state.map]);

	return [keybinder, handler];
}
