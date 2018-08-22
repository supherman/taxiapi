const express = require('express');
const router = express.Router();
const authToken = require('../lib/auth-token');
const helpers = require('../lib/helpers');
const User = require('../models/user');
const Driver = require('../models/driver');
const Organization = require('../models/organization');
const ServiceType = require('../models/service_type');
const Vehicle = require('../models/vehicle');

// User routes

router.get('/users', async (req, res, next) => {
  const users = await new User().fetchAll();
  res.status(200).json(users.toJSON());
});

router.get('/user/:id', async (req, res, next) => {
  const user_id = req.params.id;
  const user = await new User({id: user_id}).fetch();
  if (user) {
    res.status(200).json(user.toJSON());
  }
  else {
    res.status(404).json({errors: ['Este Usuario no existe']});
  }
});

router.put('/user/:id', async (req, res, next) => {
  const user_id = req.params.id;
  let user = await new User({id: user_id}).fetch();
  if(user) {
    user = await user.save(req.body, {patch: true});
    res.status(200).json(user.toJSON());
  }
  else {
    res.status(404).json({errors: ['Este Usuario no existe']});
  }
});

router.delete('/user/:id', async (req, res, next) => {
  const user_id = req.params.id;
  let user = await new User({id: user_id}).fetch();
  if(user) {
    try {
      user = await user.destroy();
      res.status(200).json({flash: ['Usuario eliminado exitosamente']});
    }
    catch (error){
      switch (error.code){
        case '23503':
        res.status(400).json({errors: ['Este Usuario esta referenciado en otra tabla']});
        break;
      }
    }
  }
  else {
    res.status(404).json({errors: ['Este Usuario no existe']});
  }
});

// Driver routes

router.get('/drivers', async (req, res, next) => {
  const drivers = await new Driver().fetchAll();
  res.status(200).json(drivers.toJSON());
});

router.get('/driver/:id', async (req, res, next) => {
  const driver_id = req.params.id;
  const driver = await new Driver({id: driver_id}).fetch();
  if (driver) {
    res.status(200).json(driver.toJSON());
  }
  else {
    res.status(404).json({errors: ['Este Conductor no existe']});
  }
});

router.put('/driver/:id', async (req, res, next) => {
  const driver_id = req.params.id;
  let driver = await new Driver({id: driver_id}).fetch();
  if(driver) {
    driver = await driver.save(req.body, {patch: true});
    res.status(200).json(driver.toJSON());
  }
  else {
    res.status(404).json({errors: ['Este Conductor no existe']});
  }
});

router.delete('/driver/:id', async (req, res, next) => {
  const driver_id = req.params.id;
  let driver = await new Driver({id: driver_id}).fetch();
  if(driver) {
    try {
      driver = await driver.destroy();
      res.status(200).json({flash: ['Conductor eliminado exitosamente']});
    }
    catch (error){
      switch (error.code){
        case '23503':
        res.status(400).json({errors: ['Este Conductor esta referenciado en otra tabla']});
        break;
      }
    }
  }
  else {
    res.status(404).json({errors: ['Este Conductor no existe']});
  }
});

// Organization routes

router.get('/organizations', async (req, res, next) => {
  const organizations = await new Organization().fetchAll();
  res.status(200).json(organizations.toJSON());
})

router.post('/organizations', async (req, res, next) => {
  const name = req.body.name
  const organization = await new Organization({ name }).save();
  if (organization)
    res.status(201).json(organization.toJSON());
  else
    res.status(422).json({errors: ['No se pudo crear la Organización']});
});

router.get('/organization/:id', async (req, res, next) => {
  const organization_id = req.params.id;
  const organization = await new Organization({id: organization_id}).fetch();
  if (organization) {
    res.status(200).json(organization.toJSON());
  }
  else {
    res.status(404).json({errors: ['Esta Organización no existe']});
  }
});

router.put('/organization/:id', async (req, res, next) => {
  const organization_id = req.params.id;
  let organization = await new Organization({id: organization_id}).fetch();
  if (organization) {
    organization = await organization.save(req.body, {patch: true});
    res.status(200).json(organization.toJSON());
  }
  else {
    res.status(404).json({errors: ['Esta Organización no existe']});
  }
});

router.delete('/organization/:id', async (req, res, next) => {
  const organization_id = req.params.id
  let organization = await new Organization({id: organization_id}).fetch();
  if (organization){
    try {
      organization = await new Organization({id: organization_id}).destroy();
      res.status(200).json({flash: ['Organizción elimnada con exito']});
    }
    catch(error) {
      switch (error.code){
        case '23503':
        res.status(400).json({errors: ['Esta Organización esta referenciada en otra tabla']});
        break;
      }
    }
  }
  else
    res.status(404).json({errors: ['Esta Organización no existe']});
});

//Service_types_routes

router.get('/services', async (req, res, next) => {
  const services = await new ServiceType().fetchAll();
  res.status(200).json(services.toJSON());
});

router.post('/services', async (req, res, next) => {
  const name = req.body.name;
  const service = await new ServiceType({ name }).save();
  if (service)
    res.status(201).json(service.toJSON());
  else
    res.status(422).json({errors: ['No se pudo crear el Servicio']});
});

router.get('/service/:id', async (req, res, next) => {
  const service_id = req.params.id;
  let service = await new ServiceType({id: service_id}).fetch();
  if (service) {
    res.status(200).json(service.toJSON());
  }
  else {
    res.status(422).json({errors: ['Este Servicio no existe']});
  }
});

router.put('/service/:id', async (req, res, next) => {
  const service_id = req.params.id;
  let service = await new ServiceType({id: service_id}).fetch();
  if (service) {
    service = await service.save(req.body, {patch: true});
    res.status(200).json(service.toJSON());
  }
  else {
    res.status(422).json({errors: ['Este Servicio no existe']});
  }
});

router.delete('/service/:id', async (req, res, next) => {
  const service_id = req.params.id;
  let service = await new ServiceType({id: service_id}).fetch();
  if (service){
    try {
      service = await service.destroy();
      res.status(200).json({flash: ['Servicio eliminado con exito']});
    }
    catch(error) {
      switch (error.code){
        case '23503':
        res.status(400).json({errors: ['Esta Servicio esta referenciada en otra tabla']});
        break;
      }
    }
  }
});

// Vehicles routes

router.get('/vehicles', async (req, res, next) => {
  const vehicles = await new Vehicle().fetchAll();
  res.status(200).json(vehicles.toJSON());
});

router.get('/vehicle/:id', async (req, res, next) => {
  const vehicle_id = req.params.id;
  const vehicle = await new Vehicle({id: vehicle_id}).fetch();
  if (vehicle) {
    res.status(200).json(vehicle.toJSON());
  }
  else {
    res.status(404).json({errrors: ['Este Vehiculo no existe']});
  }
});

router.post('/vehicles', async (req, res, next) => {
  try {
    const vehicle = await new Vehicle(req.body).save();
    res.status(201).json(vehicle.toJSON());
  }
  catch(error) {
    res.status(400).json({errors: ['No se puede guardar el Vehiculo'], error_code: error.code});
  }
});

router.put('/vehicle/:id', async (req, res, next) => {
  const vehicle_id = req.params.id;
  let vehicle = await new Vehicle({id: vehicle_id}).fetch();
  if (vehicle) {
    try {
      vehicle = await vehicle.save(req.body, {patch: true})
      res.status(201).json(vehicle.toJSON());
    }
    catch(error) {
      res.status(400).json({errors: ['No se puede actualizar el Vehiculo'], error_code: error.code});
    }
  }
  else {
    res.status(404).json({errors: ['Este Vehiculo no existe']});
  }
});

router.delete('/vehicle/:id', async (req, res, next) => {
  const vehicle_id = req.params.id;
  let vehicle = await new Vehicle({id: vehicle_id}).fetch();
  if (vehicle) {
    try {
      vehicle = await vehicle.destroy()
      res.status(201).json({flash: ['Vehiculo eliminado con exito']});
    }
    catch(error) {
      switch (error.code){
        case '23503':
        res.status(400).json({errors: ['Este Vehiculo esta referenciado en otra tabla']});
        break;
      }
    }
  }
  else {
    res.status(404).json({errors: ['Este Vehiculo no existe']});
  }
});

module.exports = router;
