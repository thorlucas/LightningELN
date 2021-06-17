import React from "react";
import { KeybindingHandler } from "./handler";
import { useKeybinder } from "./hooks";
import { KeyBinder } from "./keybinder";

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

export const KeybinderContext = React.createContext<KeyBinder>(undefined!);

export { useKeybinding } from './hooks';

export const KeybindingGroup: React.FC<KeybindingGroupProps> = ({
	wrapperAttributes = {},
	renderWrapper = defaultWrapperRenderer,
	children,
}) => {

	const [keybinder, handler]: [KeyBinder, KeybindingHandler] = useKeybinder();

	return renderWrapper({
		children: (
			<KeybinderContext.Provider value={ keybinder }>
				{ children }
			</KeybinderContext.Provider>
		),
		attributes: {
			...wrapperAttributes,
			tabIndex: -1,
			onKeyDown: handler,
		},
	});
};
