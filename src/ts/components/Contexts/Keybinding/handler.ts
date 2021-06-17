import { KeyboardEvent } from 'react';
import { KeybindingMap } from "./keybinder";

export type KeybindingHandler = (event: KeyboardEvent) => void;

export function createKeybindingHandler(map: KeybindingMap): KeybindingHandler {
	const handler: KeybindingHandler = (event: KeyboardEvent) => {
		const nativeEvent = event.nativeEvent;
		[...map.values()]
			.filter(keybinding => keybinding.match(nativeEvent))
			.forEach(keybinding => keybinding.callback());
	};
	return handler;
}
