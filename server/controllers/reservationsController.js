const db = require("../config/database");
const emailService = require("../utils/email");

exports.makeReservation = async (req, res) => {
  try {
    const { fullname, guests, date, hour, contact, email } = req.body;

    if (email.length > 0) {
      if (!emailService.isValidEmail(email)) {
        return res.status(400).send("Email pattern not valid");
      }

      // Reservation customer info
      const customerInfo = {
        fullname: fullname,
        guests: guests,
        date: date,
        hour: hour,
        email: email,
      };

      // Send an email confirmation with all the customer info
      // emailService.sendEmailConfirmation(customerInfo);
    }

    const result = await db.pool.query(
      `
      INSERT INTO reservations (fullname, guests, date, hour, contact, email, status)
        VALUES (?, ?, ?, ?, ?, '', 'confirmed')`,
      [fullname, guests, date, hour, contact, email]
    );

    if (result[0].affectedRows === 0) {
      return res.status(404).send("Error making reservation");
    }

    res.status(201).send("Thanks for choosing us!");
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
exports.getReservations = async (req, res) => {
  try {
    const [rows] = await db.pool.query(`
      SELECT * FROM reservations
    `);

    if (rows.length === 0) {
      return res.status(200).json({ message: "There's no reservations" });
    }

    res.status(200).send(rows);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
exports.updateReservation = async (req, res) => {
  try {
    const { id } = rreq.query;
    const { fullname, guests, date, hour, contact, email } = req.body;

    if (!emailService.isValidEmail(email) && email.length > 0) {
      return res.status(400).send("Email pattern not valid");
    }

    const result = await db.pool.query(
      `
      UPDATE reservations
      SET fullname=?, guests=?, date=?, hour=?, contact=?, email=?
      WHERE id=?
      `,
      [fullname, guests, date, hour, contact, email, id]
    );

    if (result[0].affectedRows === 0) {
      return res.status(404).send("Error updating reservation");
    }

    // If email send
    if (email.length > 0) {
      const customerInfo = {
        name: fullname,
        guests: guests,
        date: date,
        hour: hour,
        email: email,
      };

      // emailService.sendEmailConfirmation(customerInfo);
    }

    res.status(200).send("Success updating reservation");
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.query;

    const [rows] = await db.pool.query(
      `
      SELECT * FROM reservations
      WHERE id = ?
    `,
      [id]
    );

    if (rows[0].length === 0) {
      return res.status(404).send("No reservations with provided data");
    }

    // Remove the customer reservation from the database
    const result = await db.pool.query(
      `
      DELETE FROM reservations
      WHERE id=?
      `,
      [id]
    );

    if (result[0].affectedRows === 0) {
      return res.status(404).send("Error while canceling reservation");
    }

    res.status(200).send("Reservation successfully canceled");
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
exports.getItem = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.pool.query(
      `
      SELECT * FROM reservations
      WHERE id = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).send("No reservations with provided data");
    }

    res.status(200).send(rows);
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
