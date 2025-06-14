import { authenticateUser, product, UserNameToLowerCase } from "../../src/BasicUtils"

describe("BasicUtils test suite ", () => {
    it("should return the product of 3 and 2 ", () => {
        const actual = product(3, 2)
        expect(actual).toBe(6)
        expect(actual).not.toBe(5) // This is a negative test case
        expect(actual).toEqual(6) // This is a positive test case
        expect(actual).toBeLessThan(10) // toBeLessThan is a matcher that checks if the value is less than the expected value
        expect(actual).toBeLessThanOrEqual(6) // toBeLessThanOrEqual is a matcher that checks if the value is less than or equal to the expected value
        expect(actual).toBeGreaterThan(5) // This is a positive test case
        expect(actual).toBeGreaterThanOrEqual(6) // This is a positive test case
        expect(actual).toBeCloseTo(6.0) // This is a positive test case
    })

    // step 2:  if any of the above test cases fail, it will show the error message in the console and the test will fail
    describe('User authentication test', () => {
        it('returns the lowercase of a valid user', () =>{
        // Arrange
        const sut = authenticateUser // System Under Test
        // Act
        const actual = sut("deveLOPER", "dev") // System Under Test
        // Assert
        expect(actual.usernameToLower).toBe("developer")
        })

        it("Return the username characters of a valid user", () => {
            // Arrange
            const sut = authenticateUser // System Under Test
            // Act
            const actual = sut("deveLOPER", "dev") // System Under Test
            // Assert
            expect(actual.usernameCharacters).toEqual(['d', 'e', 'v', 'e', 'L', 'O', 'P', 'E', 'R'])
            expect(actual.usernameCharacters).toContain('e') // toContain is a matcher that checks if the array contains the expected value
        });
        
    })
})

describe("UsernameToLowerCase test suite ", () => {
    // setup 
    let sut: UserNameToLowerCase
    beforeEach(() => {
        console.log("Setup is here");
        sut = new UserNameToLowerCase()
    })
    // teardown
    afterEach(() => {
        console.log("Tear down is here");
    })

    it("should return the lowercase username of a valid user", () => {
        const actual = sut.toLowerCase("Bob");
        console.log("I am here");
        expect(actual).toBe("bob")
    })
})