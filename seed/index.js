const Event = require("../event/model");
const Ticket = require("../ticket/model");
const User = require("../user/model");

async function seedEventsAndTickets() {
  const user = await User.create({
    username: "user",
    password: "user",
  });

  const event1 = await Event.create({
    title: "Event one",
    description: "This is the description for event one",
    image:
      "https://www.holland.com/upload_mm/8/7/1/20266_fullimage_nicholas-vos-ukorjbn_pza-unsplash-1360.jpg",
    start_date: "2016-08-09",
    end_date: "2016-09-10",
  });

  const event2 = await Event.create({
    title: "Event two",
    description: "This is the description for event two",
    image:
      "https://www.kegcoach.nl/_WORDPRESS/wp-content/uploads/2016/09/events.jpg",
    start_date: "2016-08-09",
    end_date: "2016-09-10",
  });

  const ticket1 = await Ticket.create({
    image:
      "https://image.freepik.com/vrije-photo/gele-ticket-bovenaanzicht_1101-121.jpg?1",
    price: 10,
    description: "Description for ticket one",
    author: "user",
    eventId: 1,
    userId: 1,
    risk: 15,
  });

  const ticket2 = await Ticket.create({
    image:
      "https://image.freepik.com/vrije-photo/gele-ticket-bovenaanzicht_1101-121.jpg?1",
    price: 20,
    description: "Description for ticket two",
    author: "user",
    eventId: 1,
    userId: 1,
    risk: 40,
  });

  // event1.addOosProducts(toiletPaper, {
  //   through: { status: "Moderate" },
  // });

  // event1.addOosProducts(cannedTuna, {
  //   through: { status: "Out of Stock" },
  // });

  // albertHeijn2.addOosProducts(sunflowerOil, {
  //   through: { status: "Out of Stock" },
  // });

  // albertHeijn3.addOosProducts(pasta, {
  //   through: { status: "Moderate" },
  // });
}

seedEventsAndTickets();
