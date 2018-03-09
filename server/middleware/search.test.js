/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
const {expect} = require('chai');
const sinon = require('sinon');
const YouTube = require('youtube-node');
const {
	mwYoutubeSearch
} = require('./search');

const youTube = new YouTube();

describe('youtube search middleware', () => {
	let mockNext;

    // Set youtube stub
    sinon.stub(youTube, 'search')
    	.yields(null, {statusCode: 200}, [{name: 'org-one'}, {name: 'org-two'}]);

    beforeEach(next => {
    	// Set spy for the next() method
    	mockNext = sinon.spy();
        next();
    });

    it('should call next on success', done => {
        mwYoutubeSearch({body: {}}, {locals: {}}, mockNext);
        expect(mockNext.called).to.equal(true);
        done();
    });

    it('should call next on error', done => {
        mwYoutubeSearch({body: {}}, {locals: {}}, mockNext);
        expect(mockNext.called).to.equal(true);
        done();
    });

    it('should send console message on error', done => {
        sinon.spy(console, 'log');
        mwYoutubeSearch({body: {}}, {locals: {}}, mockNext);
        expect(console.log.called).to.equal(true);
        done();
    });

    it('should parse response correctly', done => {
        done();
    });
});
