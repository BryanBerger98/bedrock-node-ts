export default interface Interactor {
    execute(...args: unknown[]): Promise<unknown>;
}