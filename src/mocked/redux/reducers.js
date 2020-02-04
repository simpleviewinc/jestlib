// TODO: Looks at passing in custom test reducers, or just remove entirely
const appState = {}
const itemsState = {}
const tapState = {}

// Default reducers
export const app = jest.fn(() => { return appState })
export const items = jest.fn(() => { return itemsState })
export const tap = jest.fn(() => { return tapState })
