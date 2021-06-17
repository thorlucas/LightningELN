import { useContext, useEffect, useMemo, useReducer } from "react";
import { KeybinderContext } from ".";
import { createKeybindingHandler, KeybindingHandler } from "./handler";
import { createKeyBinder, emptyKeybindingState, KeyBinder, KeybindingCallback, KeybindingTrigger } from "./keybinder";
import { reducer } from "./reducer";

export function useKeybinding(trigger: KeybindingTrigger, callback: KeybindingCallback) {
	const keybinder = useContext(KeybinderContext);

	useEffect(() => {
		return keybinder(trigger, callback);
	}, [trigger, callback]);
}

export function useKeybinder(): [KeyBinder, KeybindingHandler] {
	const [state, dispatch] = useReducer(reducer, emptyKeybindingState());

	const keybinder: KeyBinder = useMemo(() => {
		console.log("Updating keybinder");
		return createKeyBinder(state.nextId, dispatch);
	}, [state.nextId]);

	const handler: KeybindingHandler = useMemo(() => {
		console.log("Updating handler");
		return createKeybindingHandler(state.map);
	}, [state.map]);

	return [keybinder, handler];
}
