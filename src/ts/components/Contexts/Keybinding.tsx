import isHotkey from "is-hotkey";
import React, { Context, Dispatch, KeyboardEvent as ReactKeyboardEvent, useCallback, useContext, useEffect, useReducer, useState } from "react";

type KeybindingGroupWrapperRenderer = ({ attributes, children }: {
	attributes: any,
	children: JSX.Element | JSX.Element[],
}) => JSX.Element;

interface KeybindingGroupProps {
	wrapperAttributes?: any,
	renderWrapper?: KeybindingGroupWrapperRenderer,
	children: JSX.Element[] | JSX.Element,
}

const defaultWrapperRenderer: KeybindingGroupWrapperRenderer = ({ attributes, children }) => (
	<div { ...attributes }>
		{ children }
	</div>
);

type Keybinding = {
	match: (event: KeyboardEvent) => boolean,
	callback: () => void,
}

type AddKeybinding = {
	type: 'add',
	trigger: string,
	callback: () => void,
}

type KeybindingAction = AddKeybinding;

function keybindingReducer(state: Keybinding[], action: KeybindingAction) {
	switch (action.type) {
		case 'add':
			return state.concat({
				match: isHotkey(action.trigger),
				callback: action.callback,
			});
	}
}

const KeybindingContext = React.createContext<Dispatch<KeybindingAction>>(undefined!);

export const KeybindingGroup: React.FC<KeybindingGroupProps> = ({
	wrapperAttributes = {},
	renderWrapper = defaultWrapperRenderer,
	children,
}) => {
	const [keybindings, dispatch] = useReducer(keybindingReducer, []);

	const onKeyDown = useCallback((event: ReactKeyboardEvent) => {
		// FIXME: Terribly non-performant because it will run every check on every
		// keybinding every time
		const nativeEvent = event.nativeEvent;
		keybindings
			.filter(keybinding => keybinding.match(nativeEvent))
			.forEach(keybinding => keybinding.callback());
	}, [keybindings]);

	return renderWrapper({
		children: (
			<KeybindingContext.Provider value={ dispatch }>
				{ children }
			</KeybindingContext.Provider>
		),
		attributes: {
			...wrapperAttributes,
			tabIndex: -1,
			onKeyDown: onKeyDown,
		},
	});
};

export function useKeybinding(trigger: string, callback: () => void) {
	const dispatch = useContext(KeybindingContext);
	useEffect(() => {
		dispatch({
			type: 'add',
			trigger: trigger,
			callback: callback,
		});
	}, []);
}
