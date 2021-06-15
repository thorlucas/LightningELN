import isHotkey from "is-hotkey";
import React, { KeyboardEvent as ReactKeyboardEvent, useCallback, useState } from "react";

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

export const KeybindingGroup: React.FC<KeybindingGroupProps> = ({
	wrapperAttributes = {},
	renderWrapper = defaultWrapperRenderer,
	children,
}) => {
	const [keybindings, setKeybindings] = useState<Keybinding[]>([]);

	const onKeyDown = useCallback((event: ReactKeyboardEvent) => {
		// FIXME: Terribly non-performant because it will run every check on every
		// keybinding every time
		const nativeEvent = event.nativeEvent;
		keybindings
			.filter(keybinding => keybinding.match(nativeEvent))
			.forEach(keybinding => keybinding.callback());
	}, [keybindings]);

	return renderWrapper({
		children: children,
		attributes: {
			...wrapperAttributes,
			tabIndex: -1,
			onKeyDown: onKeyDown,
		},
	});
};
