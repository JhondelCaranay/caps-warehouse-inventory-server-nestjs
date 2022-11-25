import * as randomize from "randomatic";

export const codeGenerator = (length: number) => {
    return randomize("Aa0", length);
};
