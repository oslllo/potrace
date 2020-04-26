const potrace = require('../src');
const fg = require('fast-glob');
const path = require('path');
const fs = require('fs-extra');

const app_root_path = path.resolve('./');
const svgs_path = path.join(app_root_path, 'tests/svgs');
const inputs_path = path.join(svgs_path, 'inputs');
const outputs_path = path.join(svgs_path, 'outputs');

beforeAll(() => {
    // inputs = fg.sync(path.join(inputs_path, '*.png'));
    // outputs = fg.sync(path.join(outputs_path, '*.svg'));
    // console.log('BEFORE!')
})

describe('Test SVG output', () => {
    var inputs = fg.sync(path.join(inputs_path, '*.png'));
    inputs = inputs.map((p, i) => {
        return [p, i]
    })
    var outputs = fg.sync(path.join(outputs_path, '*.svg'));
    var Potrace = new potrace.Potrace();
    test.each(inputs)(`Outputs expected data for image %p`, async (p, i) => {
        // console.log(i)
        await Potrace.loadImageFromPath(p);
        await Potrace.process();
        var svg = Potrace.getSVG(1);
        var output = fs.readFileSync(outputs[i], 'utf8')
        // Potrace.process(function () {
        //     var svg = Potrace.getSvg()
        // })
        // console.log('Svg', svg);
        // console.log('\n');
        // console.log(output, '\n');
        // console.log(svg === output)
        expect(svg).toBe(output);
    })
})

// var ttt = [1,1,3]

// for(var t in ttt) {
//     test(`Number ${t}`, function () {
//         console.log(ttt[t])
//         expect(ttt[t]).toBe(1)
//     })
// }

// describe('TEst', () => {
//     test.each`
//         a    | b    | expected
//         ${1} | ${1} | ${2}
//         `('returns $expected when $a is added $b', ({a, b, expected}) => {
//         expect(a + b).toBe(expected);
//     });
//     // test.each([[1,2,3]])('Test %% %i', (i) => {
//     //     // console.log(i)
//     //     expect(i).toBe(i)
//     // })
//     // test.each([
//     //     [1, 1, 2],
//     //     [1, 2, 3],
//     //     [2, 1, 3],
//     //   ])('.add(%i, %i)', (a, b, expected) => {
//     //     expect(a + b).toBe(expected);
//     //   });
// })


// test.each(inputs)((() => { return 'Test' })(), async (input) => {
//     await Potrace.loadImageFromPath(inputs[input]);
//     await Potrace.process();
//     var svg = Potrace.getSVG(1);
//     var output = fs.readFileSync(outputs[input], 'utf8')
//     // Potrace.process(function () {
//     //     var svg = Potrace.getSvg()
//     // })
//     // console.log('Svg', svg);
//     // console.log('\n');
//     // console.log(output, '\n');
//     // console.log(svg === output)
//     expect(svg).toBe(output);
// })

// test('outputs expected svg data', async () => {
//     for(var input in inputs) {
//         await Potrace.loadImageFromPath(inputs[input]);
//         await Potrace.process();
//         var svg = Potrace.getSVG(1);
//         var output = fs.readFileSync(outputs[input], 'utf8')

//         // Potrace.process(function () {
//         //     var svg = Potrace.getSvg()
//         // })
//         console.log('Svg', svg);
//         console.log('\n');
//         console.log(output, '\n');
//         console.log(svg === output)
//         // var svg = Potrace.getSvg(() => {
//         //     console.log(svg)
//         // })
//         break;
//     }
//     expect(3).toBe(3);
// })

// var input = await fg()

// console.log('Test', inputs_path)

// test('outputs expected svg data', () => {
//     // console.log('Test', [inputs, outputs])
//     expect(3).toBe(3);
// })