var moment = require("moment");
moment().format();

module.exports = function riskAlgorithm(allTickets, ticket) {
  const allTicketCreatorsIds = allTickets.map((ticket) => ticket.userId);
  const ticketCreatorId = ticket.userId;

  // if the ticket price is lower than the average ticket price for that event, that's a risk:

  const ticketPrice = ticket.price;

  // let allTicketPrices;

  // if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk:

  const timeOfTicketCreation = ticket.createdAt;

  // if there are >3 comments on the ticket, add 5% to the risk:

  const numberOfComments = ticket.comments.length;

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  let risk = 0;

  // if the ticket is the only ticket of the author, add 10%:
  let ticketCount = 0;
  allTicketCreatorsIds.map((id) => {
    if (id === ticketCreatorId) {
      ticketCount++;
    }
  });

  if (ticketCount <= 1) {
    risk += 10;
  }

  // if the ticket price is lower than the average ticket price for that event, that's a risk:

  const eventTickets = allTickets.filter((t) => t.eventId === ticket.eventId);
  const pricesArr = eventTickets.map((t) => t.price);
  const pricesSum = pricesArr.reduce((acc, curr) => acc + curr, 0);
  const averagePrice = pricesSum / eventTickets.length;

  console.log("averagePrice is:", averagePrice);

  const limitValue = (value, max) => (value > max ? max : value);

  // if a ticket is X% cheaper than the average price, add X% to the risk:

  if (ticket.price < averagePrice) {
    const percentage = ((averagePrice - ticket.price) / averagePrice) * 100;
    risk += Math.floor(percentage);
  } else {
    // if a ticket is X% more expensive than the average price, deduct X% from the risk, with a maximum of 10% deduction:

    const percentage = ((ticket.price - averagePrice) / averagePrice) * 100;
    const percentageLimited = limitValue(percentage, 10);
    risk -= percentageLimited;
  }

  // if the ticket was added during business hours (9-17), deduct 10% from the risk, if not, add 10% to the risk:

  const createdAtFormated = moment(timeOfTicketCreation).format("HH:mm");

  console.log("createdAtFormated is:", createdAtFormated);
  if (createdAtFormated < "09:00" || createdAtFormated > "17:00") {
    risk += 10;
  } else {
    risk -= 10;
  }

  // if there are >3 comments on the ticket, add 5% to the risk:

  // const ticketComments = this.props.comments.filter(
  //   (comment) => comment.ticketId === parseInt(this.props.match.params.ticketId)
  // );

  if (numberOfComments > 3) {
    risk += 5;
  }

  const riskLimit = (value, min, max) => {
    if (value < min) {
      return min;
    } else if (value > max) {
      return max;
    } else {
      return value;
    }
  };

  const finalRisk = riskLimit(risk, 5, 95);

  console.log("ticket is:", ticket);
  const ticketPlusUpdatedRisk = { ...ticket.dataValues, risk: finalRisk };
  console.log("ticketPlusUpdatedRisk is:", ticketPlusUpdatedRisk);

  return ticketPlusUpdatedRisk;

  // from 5% to 30% = green
  // from 31% to 50% = yellow
  // from 51% to 95% = red

  /*   if (finalRisk >= 5 && finalRisk < 31) {
    return <h3 style={{ color: "green" }}>Risk of fraud: {finalRisk}%</h3>;
  } else if (finalRisk >= 30 && finalRisk < 51) {
    return <h3 style={{ color: "yellow" }}>Risk of fraud: {finalRisk}%</h3>;
  } else {
    return <h3 style={{ color: "red" }}>Risk of fraud: {finalRisk}%</h3>;
  } */
};

// riskAlgorithm();
