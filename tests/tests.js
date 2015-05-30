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
		expect(game.getData()[0]).to.be.an("array");
		expect(game.getData().length).to.equal(4);
		expect(game.getData()[0].length).to.equal(6);
		expect(game.getData()[0][0].id).to.be.a("number");
		expect(game.getData()[0][0].value).to.be.a("string");
		expect(game.getData()[0][0].color).to.be.a("string");
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
	it("show convert data", function() {
		var oldData = {
			0: {
				0: {
					id: 0,
					value: 'A',
					whatever: 'hi'
				},
				1: {
					id: 1,
					value: 'B'
				}
			},
			1: {
				0: {
					id: 2,
					value: 'X'
				},
				2: {
					id: 3,
					value: 'Y'
				}
			}
		};
		var newData = [
			{
				id: 0,
				value: 'A',
				whatever: 'hi',
				row: 0,
				column: 0
			}, {
				id: 1,
				value: 'B',
				row: 1,
				column: 0
			}, {
				id: 2,
				value: 'X',
				row: 0,
				column: 1
			}, {
				id: 3,
				value: 'Y',
				row: 2,
				column: 1
			}
		];
		expect(game.convertData(oldData)).to.be.deep.equal(newData);
	});
	//test that the high score changes
});
