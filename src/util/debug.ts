import { isAbikitBrowser } from './abikit'

export const log = (message: any, ...optionalParameters: any[]) => {
  if (isAbikitBrowser()) {
    const messageString = typeof message !== 'string' ? JSON.stringify(message) : message
    const optionalString = optionalParameters.length > 0 ? JSON.stringify(optionalParameters) : ''
    window.sharedclass.write_to_stdout(messageString + optionalString)
  } else {
    console.log(message, ...optionalParameters)
  }
}
