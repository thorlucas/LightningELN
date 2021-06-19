import React from "react";
import { KeybindingHandler } from "./handler";
import { useKeybinder, useKeybinding } from "./hooks";
import { KeyBinder, KeybindingCallback, KeybindingTrigger } from "./keybinder";

interface KeybindingGroupWrapperProps {
	children: JSX.Element | JSX.Element[],
	attributes: any,
}

type KeybindingGroupWrapperRenderer = (props: KeybindingGroupWrapperProps) => JSX.Element;

interface KeybindingGroupProps {
	wrapperAttributes?: any,
	renderWrapper?: KeybindingGroupWrapperRenderer,
	Wrapper?: React.FC<KeybindingGroupWrapperProps>,
	children: JSX.Element[] | JSX.Element,
}

interface KeybindingProps {
	trigger: KeybindingTrigger,
	callback: KeybindingCallback,
	prevent?: boolean,
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
	Wrapper = null,
	children,
}) => {

	const [keybinder, handler]: [KeyBinder, KeybindingHandler] = useKeybinder();

	const props: KeybindingGroupWrapperProps = {
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
	};

	if (Wrapper) {
		return <Wrapper { ...props } />;
	} else {
		return renderWrapper(props);
	}
};

export const Keybinding: React.FC<KeybindingProps> = ({
	trigger,
	callback,
	prevent = false,
}) => {
	useKeybinding(trigger, callback, prevent);
	
	return null;
}
