export enum MOVEMENT {
    DESCEND, ASCEND
}

export type converter<R> = (navigationOptions: Set<MOVEMENT>) => R;

const getNavigationChooser = (
    { start, finish }: { start: number; finish: number; }
) => <R>(
    index: number,
    converter: converter<R>
): R => {
        const navigationOptions: Set<MOVEMENT> = new Set();

        if (index > start) {
            navigationOptions.add(MOVEMENT.ASCEND);
        }

        if (index < finish) {
            navigationOptions.add(MOVEMENT.DESCEND);
        }

        return converter(navigationOptions);
    }

export {
    getNavigationChooser
}
