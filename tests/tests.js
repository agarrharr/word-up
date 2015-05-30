describe("game", function() {
	it("should exist", function() {
		expect(game).to.exist;
	});
	it("should be a function", function() {
		expect(game).to.be.an('object');
	});
	it("should start score at 0", function() {
		expect(game.getScore()).to.equal(0);
	});
	it("should be able to add to score", function() {
		game.addToScore(1);
		expect(game.getScore()).to.equal(1);
	});
	it("should be able to get high score", function() {
		expect(game.getHighScore()).to.be.a("number");
	});
});
