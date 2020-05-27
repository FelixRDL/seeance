var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('Auth', () => {
    describe('Get Token From Access Code', () => {
        it('Should return valid token', function(done) {
            request.get('/api/auth/token?code=')
        })
    })
})