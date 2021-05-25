export interface ThrottleFun {
    (fn: () => any, duration?: number): () => any;
}
