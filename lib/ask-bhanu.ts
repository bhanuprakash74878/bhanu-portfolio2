export const ASK_BHANU_EVENT = "ask-bhanu:open"

/** Opens the Ask Bhanu assistant from anywhere in the app. */
export function openAskBhanu(prompt?: string) {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(ASK_BHANU_EVENT, { detail: { prompt } }))
}
