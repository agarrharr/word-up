describe("game", function() {
	it("should check if string is a word", function(done) {
		var trueCallback = function(success) {
			expect(success).to.be.true;
			done();
		};
		var falseCallback = function(success) {
			expect(success).to.be.false;
			done();
		};
		game.isAWord('asdf', falseCallback);
	});
});
