import ResultsParser from './ResultsParser';
import { PapaWrapper } from './PapaWrapper';
import ParseResult = PapaParse.ParseResult;
import ParseError = PapaParse.ParseError;
import { TeamData, Tour } from '../data/ResultsData';

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

it('parse team data', () => {
    const PapaWrapperStub = jest.fn<PapaWrapper>(() => ({
        parseFile(): Promise<ParseResult> {
            const result = new ParseResultMock;
            result.errors = [];
            result.data = [
                [' Номер команды', 'Название', 'Город', 'Тур'],
                ['49804', 'Борский корабел', 'Москва', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1'],
                ['49804', 'Борский корабел', 'Москва', '2', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1'],
                ['49804', 'Борский корабел', 'Москва', '3', '1', '1', '1', '1', '1', '1', '1', '1', '1', '0', '1'],
                [' Номер команды', 'Название', 'Город', 'Тур'],
                ['59865', 'Обниматься', 'Санкт-Петербург', '1', '1', '1', '0', '1', '1', '1', '1', '1', '1', '1', '0'],
                ['59865', 'Обниматься', 'Санкт-Петербург', '2', '1', '1', '0', '1', '1', '1', '1', '1', '1', '1', '0'],
                ['59865', 'Обниматься', 'Санкт-Петербург', '3', '1', '1', '0', '1', '1', '1', '1', '1', '1', '1', '0']
            ];
            return Promise.resolve(result);
        }
    }));
    const parser = new ResultsParser(new PapaWrapperStub);
    const teamData1 = new TeamData(49804, 'Борский корабел', 'Москва');
    teamData1.tours = [
        new Tour(1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1]),
        new Tour(2, [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1]),
        new Tour(3, [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1])
    ];
    const teamData2 = new TeamData(59865, 'Обниматься', 'Санкт-Петербург');
    teamData2.tours = [
        new Tour(1, [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0]),
        new Tour(2, [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0]),
        new Tour(3, [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0]),
    ];
    return expect(parser.parse(new FileMock)).resolves.toEqual([teamData1, teamData2]);
});