describe("game", function() {
	beforeEach(function() {
		game.newGame();
	});
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
	it("should be reset game", function() {
		game.addToScore(1);
		game.newGame();
		expect(game.getScore()).to.equal(0);
	});
	it("should be able to get high score", function() {
		expect(game.getHighScore()).to.be.a("number");
	});
	it("should be able to get a random letter", function() {
		expect(game.getRandomLetter()).to.be.a("string");
		expect(game.getRandomLetter().length).to.be.below(3);
	});
	it("should be able to get random color", function() {
		expect(game.getRandomColor()).to.be.a("string");
		expect(game.getRandomColor().length).to.equal(7);
	});
	it("should be able to get random data", function() {
		expect(game.getData()).to.be.an("array");
		expect(game.getData()[0]).to.be.an("object");
		expect(game.getData()[0].id).to.be.a("number");
		expect(game.getData()[0].value).to.be.a("string");
		expect(game.getData()[0].row).to.be.a("number");
		expect(game.getData()[0].column).to.be.a("number");
		expect(game.getData()[0].color).to.be.a("string");
		expect(game.getData().length).to.equal(24);
	});
	it("should be able to remove data", function() {
		game.setData([{id: 0}, {id: 1}, {id: 2}]);
		game.removeData([0, 2]);
		expect(game.getData().length).to.equal(1);
	});
	it("should be able to remove data even if it's in the wrong order", function() {
		game.setData([{id: 0}, {id: 1}, {id: 2}]);
		game.removeData([2, 0]);
		expect(game.getData().length).to.equal(1);
	});
	//test that the high score changes
});
