
export {};
declare global {
    interface Fn<T = any> {
        (...arg: T[]): T
    }

    type Nullable<T> = T | null
}