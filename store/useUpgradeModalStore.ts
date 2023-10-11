import { create } from "zustand"

interface State {
  show: boolean
}

interface Actions {
  toggle: (value: boolean) => void
}

export const useUpgradeModalStore = create<State & Actions>((set) => ({
  show: false,
  toggle: (value) => set(() => ({ show: value })),
}))
