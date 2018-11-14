describe('My first test', () => {
    let sut; // System Under Test

    // Common set up to run before every test.
    // This will reset the state so that I know that with every 
    // test we don't have any effects from a previous test  
    // that's holding over and perhaps polluting the state of future tests
    beforeEach( () => {
        sut = {};
    })

    // Actual test
    it('should be true if true', () => {
        // Arrange
        sut.a = false;

        // Act
        sut.a = true;

        // Assert
        expect(sut.a).toBe(true);
    })
}) 