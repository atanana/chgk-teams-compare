import { PapaWrapper } from './PapaWrapper';

export default class ResultsParser {
    wrapper: PapaWrapper;

    constructor(wrapper: PapaWrapper) {
        this.wrapper = wrapper;
    }

    parse(file: File): Promise<TeamData[]> {
        return this.wrapper.parseFile(file)
            .then(result => {
                if (!result.errors.length) {
                    return [];
                } else {
                    throw new Error();
                }
            });
    }
}