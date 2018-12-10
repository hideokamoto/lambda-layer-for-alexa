/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
const { canHandle } = require('ask-utils')

const LaunchRequestHandler = {
  canHandle: (handlerInput) => canHandle(handlerInput, 'LaunchRequest'),
  handle(handlerInput) {
    const speechText = 'Welcome to the Alexa Skills Kit, you can say hello!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};
exports.LaunchRequestHandler = LaunchRequestHandler

const HelloWorldIntentHandler = {
  canHandle: (handlerInput) => {
    return canHandle(handlerInput, 'IntentRequest', 'HelloWorldIntent')
  },
  handle(handlerInput) {
    const speechText = 'Hello World!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};
exports.HelloWorldIntentHandler = HelloWorldIntentHandler

const HelpIntentHandler = {
  canHandle: (handlerInput) => canHandle(handlerInput, 'IntentRequest', 'AMAZON.HelpIntent'),
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle: (handlerInput) => {
    return canHandle(handlerInput, 'IntentRequest', 'AMAZON.CancelIntent') || canHandle(handlerInput, 'IntentRequest', 'AMAZON.StopIntent')
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle: (handlerInput) => canHandle(handlerInput, 'SessionEndedRequest'),
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle: (handlerInput) => true,
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();