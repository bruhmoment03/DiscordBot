const mongoose = require("mongoose")

/**
 * Role structure
 * - RoleId: string;
 * - roleDescription: string
 * -roleEmoji: string
 */

const Schema = new mongoose.Schema({
    guildId: String,
    roles: Array
});

module.exports = mongoose.model("reaction-roles", Schema);