describe("Mock Function Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should call the mock function", () => {
        const mockFunction = jest.fn()

        mockFunction() //fn call

        expect(mockFunction).toHaveBeenCalled()
    })

    it("should be called two times", () => {
        const mockFunction = jest.fn();

        mockFunction()
        mockFunction()

        expect(mockFunction).toHaveBeenCalledTimes(2)

    })

    it("should be called with specific arguments", () => {
        const mockFunction = jest.fn();
        mockFunction("hello", 42, true)

        expect(mockFunction).toHaveBeenCalledWith("hello", 42, true)
    })

    it("should return a specific value", () => {
        const mockFunction = jest.fn().mockReturnValue("6");

        const result = mockFunction()

        expect(result).toBe("6")

    })

    it("should return a resolved promise with specific data", async () => {
        const mockFunction = jest.fn().mockResolvedValue({ name: "John", age: 30 });

        const result = await mockFunction()

        expect(mockFunction).toHaveBeenCalled()
        expect(result).toEqual({ name: "John", age: 30 })


    })


})