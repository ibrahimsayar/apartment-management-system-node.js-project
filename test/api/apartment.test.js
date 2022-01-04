const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let apartmentId;

describe('/GET /api/v1/apartments', () => {
    it('List apartments.', (done) => {
        chai.request(server)
            .get('/api/v1/apartments')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
    });
});

describe('/POST /api/v1/apartments', () => {
    it('Add apartments.', (done) => {
        const apartment = {
            "name": "Naylalabs Apartmanı",
            "address": "Cumhuriyet Mah. Adnan Menderes Bulv. 1. Kısım Ada Apt. No:299 Kat:1",
            "capacity": 6
        };
        chai.request(server)
            .post('/api/v1/apartments')
            .send(apartment)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('address');
                res.body.should.have.property('capacity');
                res.body.should.have.property('_id');
                res.body.should.have.property('created_at');
                apartmentId = res.body._id;
                done();
            })
    });
});

describe('/GET /api/v1/apartments/:id', () => {
    it('Apartment detail information.', (done) => {
        chai.request(server)
            .get('/api/v1/apartments/' + apartmentId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('address');
                res.body.should.have.property('capacity');
                res.body.should.have.property('created_at');
                res.body.should.have.property('_id').eql(apartmentId);
                done();
            })
    });
});

describe('/PUT /api/v1/apartments/:id', () => {
    it('Update apartments.', (done) => {
        const apartment = {
            "name": "Naylalabs Apartmanı",
            "address": "Cumhuriyet Mah. Adnan Menderes Bulv. 1. Kısım Ada Apt. No:299 Kat:1",
            "capacity": 8
        };
        chai.request(server)
            .put('/api/v1/apartments/' + apartmentId)
            .send(apartment)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql(apartment.name);
                res.body.should.have.property('address').eql(apartment.address);
                res.body.should.have.property('capacity').eql(apartment.capacity);
                res.body.should.have.property('_id').eql(apartmentId);
                res.body.should.have.property('created_at');
                done();
            })
    });
});

describe('/DELETE /api/v1/apartments/:id', () => {
    it('Delete apartments.', (done) => {
        chai.request(server)
            .delete('/api/v1/apartments/' + apartmentId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('address');
                res.body.should.have.property('capacity');
                res.body.should.have.property('_id');
                res.body.should.have.property('created_at');
                done();
            })
    });
});