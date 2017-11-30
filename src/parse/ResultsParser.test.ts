import ResultsParser from './ResultsParser';
import { PapaWrapper } from './PapaWrapper';
import ParseResult = PapaParse.ParseResult;
import ParseError = PapaParse.ParseError;

const FileMock = jest.fn<File>();

const ParseResultMock = jest.fn<ParseResult>();

const ParseErrorMock = jest.fn<ParseError>();

it('rethrows error from wrapper', () => {
    const fileMock = new FileMock;
    const PapaWrapperStub = jest.fn<PapaWrapper>(() => ({
        parseFile(file: File): Promise<ParseResult> {
            if (file === fileMock) {
                return Promise.reject(new Error());
            } else {
                let result = new ParseResultMock;
                result.errors = [];
                return Promise.resolve(result);
            }
        }
    }));
    const parser = new ResultsParser(new PapaWrapperStub);
    return expect(parser.parse(fileMock)).rejects.toMatchObject(new Error());
});

it('throws an error when there are errors in result', () => {
    const PapaWrapperStub = jest.fn<PapaWrapper>(() => ({
        parseFile(file: File): Promise<ParseResult> {
            const result = new ParseResultMock;
            result.errors = [new ParseErrorMock];
            return Promise.resolve(result);
        }
    }));
    const parser = new ResultsParser(new PapaWrapperStub);
    return expect(parser.parse(new FileMock)).rejects.toMatchObject(new Error());
});