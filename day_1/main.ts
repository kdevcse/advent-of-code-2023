import { readFile } from "node:fs/promises";
import { } from "node:readline"

async function main() {
    const filename = "input.txt";
    const data = await getData(filename);
    const sum = addVals(data);
    console.log(`SUM: ${sum}`);
}

function findNumber(str: string) {
    for(let i = 0; i < str.length; i++) {
        let word = str[i];
        let intFound = !isNaN(+word);

        for (let j = i + 1; j < str.length; j++) {
            // Number was found but not a number anymore
            if (intFound && isNaN(+(word + str[j]))) {
                return +word;
            }

            // increment
            word += str[j];

            // Actual number was found so no spell check
            if (intFound) {
                continue;
            }

            // Spells a number
            const spellsNum = spellsAnumber(word);
            if (spellsNum > -1) {
                return spellsNum;
            }
        }
    }

    return -1;
}

function spellsAnumber(str: string) {
    switch(str.toLowerCase()) {
        case 'zero':
            return 0;
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        default:
            return -1;
    }
}

async function getData(filename: string) {
    const contents = await readFile(filename, { encoding: 'utf8' });
    const vals: number[] = [];
    const lines = contents.split(/\r?\n/);

    for(const line of lines) {
        let firstVal: string;
        let lastVal: string;
        console.log(line);

        if (line.length <= 0) {
            continue;
        }

        for(let i = 0; i < line.length; i++) {
            let c = line[i];
            const val = +c;
            
            if (isNaN(val)) {
                const spellsNum = findNumber(line.substring(i));

                if (spellsNum < 0) {
                    continue;
                }

                c = spellsNum.toString();
            }

            if (!firstVal) {
                firstVal = c;
                continue;
            }

            lastVal = c;
        }

        const finalVal = parseInt(`${firstVal}${lastVal}`);
        console.log(finalVal);
        vals.push(finalVal);
    };

    return vals;
}

function addVals(data: number[]) {
    let sum = 0;
    for(const d of data) {
        sum += d;
    }
    return sum;
}

main();