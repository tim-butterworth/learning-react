export interface CoreServiceObserver<T> {
    success: () => T;
    failure: () => T;
}

const coreService = <T>(
    n: number,
    observer: CoreServiceObserver<T>
): T => {
    if (n > .5) {
        return observer.success();
    } else {
        return observer.failure();
    }
}

export { coreService }
