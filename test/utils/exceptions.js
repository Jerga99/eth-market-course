const PREFIX = "Returned error: VM Exception while processing transaction: ";

async function tryCatch(promise, message) {
    try {
        await promise;
        throw null;
    }
    catch (error) {
        assert(error, "Expected an error but did not get one");
        assert(error.message.startsWith(PREFIX + message), "Expected an error starting with '" + PREFIX + message + "' but got '" + error.message + "' instead");
    }
};

module.exports = {
    catchRevert: async (promise) => await tryCatch(promise, "revert"),
    catchOutOfGas: async (promise) => await tryCatch(promise, "out of gas"),
    catchInvalidJump: async (promise) => await tryCatch(promise, "invalid JUMP"),
    catchInvalidOpcode: async (promise) => await tryCatch(promise, "invalid opcode"),
    catchStackOverflow: async (promise) => await tryCatch(promise, "stack overflow"),
    catchStackUnderflow: async (promise) => await tryCatch(promise, "stack underflow"),
    catchStaticStateChange: async (promise) => await tryCatch(promise, "static state change"),
};
