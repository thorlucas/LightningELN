import React, { Context, createContext } from 'react';
import { Settings } from '.';

const defaultSettings: Settings = undefined!;

export const SettingsContext: Context<Settings> = createContext(defaultSettings);
