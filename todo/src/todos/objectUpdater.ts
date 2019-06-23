interface PathAndValue<V, T> {
    path: [keyof T][];
    value: V;
};

const deepReplace = <T>(t: T, replacements: PathAndValue<string | number | object | [], T>[]) => {
    const key = replacements[0].path[0]
    //    const value = t[key]
}

interface KeysOf<T> {
    vals: (keyof T)[]
}

interface SomeInterface {
    key1: string;
    key2: number;
    anotherkey: string;
}

type keys = keyof SomeInterface;

export { deepReplace };
