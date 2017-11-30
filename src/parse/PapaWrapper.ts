import * as Papa from 'papaparse';
import ParseResult = PapaParse.ParseResult;

const PapaWrapper = {
    parseFile(file: File): Promise<ParseResult> {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                encoding: 'cp1251',
                skipEmptyLines: true,
                complete: results => resolve(results),
                error: error => reject(error)
            });
        });
    }
};

export default PapaWrapper;