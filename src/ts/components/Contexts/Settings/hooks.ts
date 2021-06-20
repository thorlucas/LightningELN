import { useContext } from "react";
import { Settings } from ".";
import { SettingsContext } from "./context";

export function useSettings(): Settings {
	const settings = useContext(SettingsContext);
	return settings;
}
