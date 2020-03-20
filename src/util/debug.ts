import { isAbikitBrowser } from './abikit'

export const log = (message: any, ...optionalParameters: any[]) => {
  if (isAbikitBrowser()) {
    const messageString = typeof message !== 'string' ? JSON.stringify(message) : message
    window.sharedclass.write_to_stdout(messageString + '\n' + JSON.stringify(optionalParameters))
  } else {
    console.log(message, ...optionalParameters)
  }
}
