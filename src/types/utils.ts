export type EntryOf<Value, Key> = Value extends object ? Key extends keyof Value ? Value[Key] : unknown : unknown
