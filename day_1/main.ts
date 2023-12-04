import { readFile } from "node:fs/promises";
import { } from "node:readline"

async function main() {
    const filename = "input.txt";
    const data = await getData(filename);
    const sum = addVals(data);
    console.log(sum);
}

async function getData(filename: string) {
    const contents = await readFile(filename, { encoding: 'utf8' });
    const vals: number[] = [];
    const lines = contents.split(/\r?\n/);
    console.log(lines.length);

    for(const line of lines) {
        let firstVal: string;
        let lastVal: string;

        if (line.length <= 0) {
            continue;
        }

        for(let i = 0; i < line.length; i++) {
            const c = line[i];
            const val = +c;
            
            if (isNaN(val)) {
                continue;
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