
class EventController {

  connect(conn) {
    this.conn = conn;
  }

}

module.exports = new EventController;
