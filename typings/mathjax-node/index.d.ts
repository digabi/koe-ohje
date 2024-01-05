declare module 'mathjax-node'

export function typeset(a: any): Promise<MathjaxNodeTypesetResponse>
export function config(a: any): void

export interface MathjaxNodeTypesetResponse {
  svg?: string
  mml?: string
}
