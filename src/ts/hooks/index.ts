import Mousetrap from 'mousetrap';
import { useCallback, useEffect } from 'react';

Mousetrap.prototype.stopCallback = function(e, element, combo): boolean {
	return false;
}

export type Keybinding = [string, (event?: Event) => void];

// TODO: typing
export function useKeybinding([combo, callback]: Keybinding, enabled: boolean) {
	// TODO: Calls bind twice on set up because of both use effects. Use some clever
	// trick here to only call it once on setup.
	useEffect(() => {
		if (enabled) {
			Mousetrap.bind(combo, callback);
		} else {
			// TODO: This will unbind something else if we hadn't already bound
			Mousetrap.unbind(combo);
		}
	}, [enabled]);

	useEffect(() => {
		if (enabled) {
			Mousetrap.bind(combo, callback);
		}
	}, [callback]);

	useEffect(() => {
		return () => {
			// FIXME: This could remove the callback from somebody else
			Mousetrap.unbind(combo);
		};
	}, []);
}

export function useKeybindings(bindings: Keybinding[], enabled: boolean) {
	useEffect(() => {
		if (enabled) {
			bindings.forEach(([combo, callback]) => {
				Mousetrap.bind(combo, callback);
			});
		} else {
			bindings.forEach(([combo]) => {
				Mousetrap.unbind(combo);
			});
		}
	}, [enabled]);

	useEffect(() => {
		return () => {
			bindings.forEach(([combo]) => {
				Mousetrap.unbind(combo);
			});
		};
	}, []);
}
