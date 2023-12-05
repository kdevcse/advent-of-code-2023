import { readFile } from "node:fs/promises";
import { } from "node:readline"

async function main() {
    const filename = "input.txt";
    const data = await getData(filename);
    const sum = addVals(data);
    console.log(`SUM: ${sum}`);
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
        console.log(`LINE: ${line}`);

        // Cut out blank lines
        if (line.length <= 0) {
            continue;
        }

        const stuff = Array.from(line.matchAll(/(?=(zero|one|two|three|four|five|six|seven|eight|nine|\d))/g));
        const firstMatch = stuff[0][1];
        const firstVal = isNaN(+firstMatch) ? spellsAnumber(firstMatch) : +firstMatch[0];
        const lastMatch = stuff[stuff.length - 1][1];
        const lastVal = isNaN(+lastMatch) ? spellsAnumber(lastMatch) : +lastMatch[0];
        const finalVal = +`${firstVal}${lastVal}`;

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