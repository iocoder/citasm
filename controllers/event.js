
class EventController {

  async connect(conn) {
    this.conn = conn;
  }

  async get_events() {
    return await this.conn.get();
  }

}

module.exports = new EventController;
