const app = require("../app");

describe("Addition Function", ()=>{
    it("Addint two numbers A and B to be Z", ()=>{
        expect(app.add(5,10)).toEqual(15);
    });

});