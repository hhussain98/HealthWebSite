/*
This file has a requirement on the following;
  - express (npm i --save express)
  - body-parser (npm i --save body-parser)
*/

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const db = require('./database-driver');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())


router.get('/', function (req, res) {
    console.log('Testing for route registration: Success');
    res.send('Successfully registered Database routes\n');
});
router.delete('/HealthNotification', function (req, res) {
    db.ArchiveHealthNotification(req.body.id).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/AssignPatientToGP', function (req, res) {
    db.AssignPatientToGP(req.body.patientId, req.body.gpId).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/ComparePassword', function (req, res) {
    db.ComparePassword(req.body.hash, req.body.email).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.delete('/Account', function (req, res) {
    db.DeleteAccount(req.body.id).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.delete('/AccountRoles', function (req, res) {
    db.DeleteAccountRoles(req.body.accountId, req.body.roleId).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.delete('/GPRoleFromAccount', function (req, res) {
    db.DeleteGPRoleFromAccount(req.body.id).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.delete('/Graph', function (req, res) {
    db.DeleteGraph(req.body.id).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.delete('/GraphType', function (req, res) {
    db.DeleteGraphType(req.body.id).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.delete('/HealthNotification', function (req, res) {
    db.DeleteHealthNotification(req.body.id).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.delete('/MeasurementType', function (req, res) {
    db.DeleteMeasurementType(req.body.id).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.delete('/Measurements', function (req, res) {
    db.DeleteMeasurements(req.body.id).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.delete('/Password', function (req, res) {
    db.DeletePassword(req.body.id).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.delete('/PatientRoleFromAccount', function (req, res) {
    db.DeletePatientRoleFromAccount(req.body.id).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.delete('/Roles', function (req, res) {
    db.DeleteRoles(req.body.id).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.delete('/Scheduler', function (req, res) {
    db.DeleteScheduler(req.body.id).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/Account', function (req, res) {
    db.InsertAccount(req.body.hash, req.body.email, req.body.name, req.body.dob, req.body.address, req.body.phone).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/Graph', function (req, res) {
    db.InsertGraph(req.body.Title, req.body.GraphTypeID, req.body.HealthNotificationID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/GraphType', function (req, res) {
    db.InsertGraphType(req.body.Type).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/HealthNotification', function (req, res) {
    db.InsertHealthNotification(req.body.accountID, req.body.startDatetime, req.body.endDatetime, req.body.measurementTypeID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/MeasurementType', function (req, res) {
    db.InsertMeasurementType(req.body.Type).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/Measurements', function (req, res) {
    db.InsertMeasurements(req.body.accountID, req.body.reading, req.body.measurementType).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/Roles', function (req, res) {
    db.InsertRoles(req.body.RoleType).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/Scheduler', function (req, res) {
    db.InsertScheduler(req.body.PredictionTimePeriodtime, req.body.SyncTimePeriodtime).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/MarkHealthNotificationRead', function (req, res) {
    db.MarkHealthNotificationRead(req.body.ID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
});
});
router.post('/SelectAccountByEmailAndPassword', function (req, res) {
    db.SelectAccountByEmailAndPassword(req.body.accountEmail, req.body.accountPasswordHash).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectAccountByID', function (req, res) {
    db.SelectAccountByID(req.body.accountID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectGPOfPatientByID', function (req, res) {
    db.SelectGPOfPatientByID(req.body.accountID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectGraphByAccountID', function (req, res) {
    db.SelectGraphByAccountID(req.body.healthNotificationID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectGraphByHealthNotificationID', function (req, res) {
    db.SelectGraphByHealthNotificationID(req.body.graphID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectGraphByID', function (req, res) {
    db.SelectGraphByID(req.body.graphID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectGraphTypeByID', function (req, res) {
    db.SelectGraphTypeByID(req.body.graphID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectHealthNotificationByAccountID', function (req, res) {
    db.SelectHealthNotificationByAccountID(req.body.accountID, req.body.archived, req.body.notificationRead).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectHealthNotificationByID', function (req, res) {
    db.SelectHealthNotificationByID(req.body.notificationID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectMeasurementTypeByID', function (req, res) {
    db.SelectMeasurementTypeByID(req.body.measurementTypeID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectMeasurementsByAccountID', function (req, res) {
    db.SelectMeasurementsByAccountID(req.body.accountID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectMeasurementsByAccountIDBetweenDates', function (req, res) {
    db.SelectMeasurementsByAccountIDBetweenDates(req.body.accountID, req.body.startDatetime, req.body.endDatetime).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectMeasurementsByID', function (req, res) {
    db.SelectMeasurementsByID(req.body.measurementID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectMeasurementsForHealthNotification', function (req, res) {
    db.SelectMeasurementsForHealthNotification(req.body.healthNotificationID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectPatientsOfGPbyID', function (req, res) {
    db.SelectPatientsOfGPbyID(req.body.accountID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectRoleByAccountID', function (req, res) {
    db.SelectRoleByAccountID(req.body.accountID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectRoleByID', function (req, res) {
    db.SelectRoleByID(req.body.roleID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectSchedulerByID', function (req, res) {
    db.SelectSchedulerByID(req.body.schedulerID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectSchedulers', function (req, res) {
    db.SelectSchedulers().then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.post('/SelectUnreadHealthNotificationByAccountID', function (req, res) {
    db.SelectUnreadHealthNotificationByAccountID(req.body.accountID).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.put('/Account', function (req, res) {
    db.UpdateAccount(req.body.Id, req.body.Email, req.body.Name, req.body.Dob, req.body.Address, req.body.Phone).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.put('/Graph', function (req, res) {
    db.UpdateGraph(req.body.ID, req.body.Title).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.put('/GraphType', function (req, res) {
    db.UpdateGraphType(req.body.ID, req.body.Type).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.put('/HealthNotification', function (req, res) {
    db.UpdateHealthNotification(req.body.ID, req.body.StartDatetime, req.body.EndDatetime).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.put('/MeasurementType', function (req, res) {
    db.UpdateMeasurementType(req.body.ID, req.body.Type).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.put('/Measurements', function (req, res) {
    db.UpdateMeasurements(req.body.ID, req.body.Reading).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.put('/Password', function (req, res) {
    db.UpdatePassword(req.body.ID, req.body.Hash).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.put('/Roles', function (req, res) {
    db.UpdateRoles(req.body.ID, req.body.RolesType).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});
router.put('/Scheduler', function (req, res) {
    db.UpdateScheduler(req.body.ID, req.body.PredictionTimePeriodtime, req.body.SyncTimePeriodtime).then(data => {
        try { res.send(JSON.stringify(data)); } catch { res.send('Unable to parse json'); }
    });
});

module.exports = router
