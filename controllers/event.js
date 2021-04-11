
class EventController {

  async connect(db) {
    this.db = db;
  }

  async all_events() {
    var matchEvents;

    matchEvents = (await this.db.get());

    return matchEvents;
  }

  async new_event() {
    var matchEvents;
    var retEvent;

    matchEvents = (await this.db.get({"ID": "0"}));

    retEvent = matchEvents[0];

    retEvent["ID"] = "Determined by server";

    return retEvent;
  }

  async add_event(newEvent) {
    var matchEvents;
    var retEvent;

    matchEvents = (await this.db.get());

    newEvent["ID"] = matchEvents.length;

    matchEvents = (await this.db.add(newEvent));

    retEvent = matchEvents[0];

    return retEvent;
  }

  async get_event(id) {
    var matchEvents;
    var retEvent;

    matchEvents = (await this.db.get({"ID": id}))

    retEvent = matchEvents[0];

    return retEvent;
  }

  async set_event(id, newEvent) {
    var matchEvents;
    var retEvent;

    matchEvents = (await this.db.edit({"ID": id}, newEvent));

    retEvent = matchEvents[0];

    return retEvent;
  }

  async clone_event(id) {
    var matchEvents;
    var retEvent;

    matchEvents = (await this.db.get({"ID": id}));

    retEvent = matchEvents[0];

    retEvent["ID"] = "Determined by server";

    return retEvent;
  }

}

module.exports = new EventController;
