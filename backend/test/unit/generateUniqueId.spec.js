const generationUniqueId = require('../../src/utils/generateUniqueId');

describe('Generation Unique Id', () => {
    it('should generation an unique id', () => {
        const id = generationUniqueId();
        expect(id).toHaveLength(8);
    })
});

