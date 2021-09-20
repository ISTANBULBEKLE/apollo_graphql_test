const sessions = require("../data/sessions.json");
const { DataSource } = require("apollo-datasource");
const _ = require("lodash");

class SessionsAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    // this.context = config.context;
  }

  async getSession(id) {
    return sessions.find((session) => session.id === id);
  }
  getSessionById(id) {
    const session = _.filter(sessions, { id: parseInt(id) });
    return session[0];
  }
}

module.exports = SessionsAPI;
