import {debug} from 'debug'
export const useDebug = (namespace: string) => {
    return debug(namespace)
}