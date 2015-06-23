define(['path'], function(path) {
	describe("path", function() {
		it("should exist", function() {
			expect(path).to.exist;
		});
		it("should be an object", function() {
			expect(path).to.be.an('object');
		});
		// it("should", function(done) {
		// 	expect(tree).to.be.deep.equal(actualTree);
		// });
	});
});

