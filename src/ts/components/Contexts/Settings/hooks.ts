import { useContext } from "react";
import { SettingPath, Settings } from ".";
import { SettingsContext } from "./context";

export function useSettings(): Settings {
	const settings = useContext(SettingsContext);
	return settings;
}

/**
 * Uses the particular setting based on a setting key.
 * TODO
 */
export function useSetting(path: SettingPath): Settings['document'] {
	if (path !== 'document') {
		throw 'Unimplemented';
	}

	return useContext(SettingsContext).document;
}
