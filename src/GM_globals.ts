declare function GM_getValue<T>(name: string, defaultValue: T): T;
declare function GM_setValue<T>(name: string, value: T): void;
declare function GM_registerMenuCommand(name: string, fn: () => void): void;
