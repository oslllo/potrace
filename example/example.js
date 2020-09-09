const path = require("path");
const Potrace = require("..");
const fs = require("fs-extra");
const Svg2 = require("oslllo-svg2");

async function example1() {
    var source = path.resolve("example/tree.jpg");
    var destination = path.resolve("example/tree.svg");
    var traced = await Potrace(source).trace();
    fs.writeFileSync(destination, traced);
    await Svg2(traced).png().extend(10).toFile("example/tree.png");
}

async function example2() {
    var source = path.resolve("example/tree.jpg");
    var destination = path.resolve("example/tree.svg");
    var instance = Potrace(source);
    var traced = await instance.trace();
    fs.writeFileSync(destination, traced);
    await Svg2(traced).png().extend(10).toFile("example/tree.png");
}

module.exports = {
    example1,
    example2,
};
