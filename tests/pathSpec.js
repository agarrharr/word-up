define(['path'], function(path) {
	describe("path", function() {
		it("should exist", function() {
			expect(path).to.exist;
		});
		it("should be an object", function() {
			expect(path).to.be.an('object');
		});
		it("should have a getPaths method", function() {
			expect(path.getPaths).to.be.a('function');
		});
		it("should calculate all available paths", function() {
			var expPaths = [
				[
					[
						{x: 0, y:0},
						{x: 1, y:0}
					],
					[
						{x: 0, y:0},
						{x: 1, y:1}
					],
					[
						{x: 0, y:0},
						{x: 0, y:1}
					]
				],
				[
					[
						{x: 1, y:0},
						{x: 1, y:1}
					],
					[
						{x: 1, y:0},
						{x: 0, y:1}
					],
					[
						{x: 1, y:0},
						{x: 0, y:0}
					]
				],
				[
					[
						{x: 0, y:1},
						{x: 1, y:1}
					],
					[
						{x: 0, y:1},
						{x: 0, y:0}
					],
					[
						{x: 0, y:1},
						{x: 1, y:0}
					]
				],
				[
					[
						{x: 1, y:1},
						{x: 0, y:1}
					],
					[
						{x: 1, y:1},
						{x: 0, y:0}
					],
					[
						{x: 1, y:1},
						{x: 1, y:0}
					]
				]
			];

			var paths = path.getPaths();
			expect(paths).to.be.deep.equal(expPaths);
		});
	});
});

