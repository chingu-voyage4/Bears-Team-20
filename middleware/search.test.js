/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-undef */
/* eslint-disable no-warning-comments */
const {expect} = require('chai');
const sinon = require('sinon');
const YouTube = require('youtube-node');
const {
	__youtube
} = require('./search');

const youTube = new YouTube();

// TODO
// TESTS NOT WORKING RIGHT
// Got stuck. Gotta focus on getting features working atm

describe('youtube search middleware', () => {
	let mockNext;
	let youTubeStub;
	let consoleSpy;

	youTubeStub = sinon.stub(youTube, 'search')
		.yields(null, {statusCode: 200}, [{name: 'org-one'}, {name: 'org-two'}]);
	consoleSpy = sinon.spy(console, 'log');

    beforeEach(next => {
    	mockNext = sinon.spy();
        consoleSpy.restore();
        youTubeStub.restore();
        next();
    });

    it('should call next on success', done => {
    	youTubeStub = sinon.stub(youTube, 'search')
    		.yields(null, {statusCode: 200}, [{name: 'org-one'}, {name: 'org-two'}]);
    	consoleSpy = sinon.spy(console, 'log');
        __youtube({body: {}}, {locals: {}}, mockNext);
        expect(mockNext.called).to.equal(true);
        done();
    });

    it('should call next on error', done => {
    	youTubeStub = sinon.stub(youTube, 'search')
    		.yields(null, {statusCode: 500}, [{name: 'org-one'}]);
    	consoleSpy = sinon.spy(console, 'log');
        __youtube({body: {}}, {locals: {}}, mockNext);
        expect(mockNext.called).to.equal(true);
        done();
    });

    it('should send console message on error', done => {
    	youTubeStub = sinon.stub(youTube, 'search')
    		.yields(null, {statusCode: 500}, [{name: 'org-one'}]);
    	consoleSpy = sinon.spy(console, 'log');
        __youtube({body: {}}, {locals: {}}, mockNext);
        expect(consoleSpy.called).to.equal(true);
        done();
    });

    it('should parse response correctly', done => {
        __youtube({body: {}}, {locals: {}}, mockNext);
        done();
    });
});
