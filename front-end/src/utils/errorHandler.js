class ErrorHandler {

  constructor(setMessage) {
    this.send = setMessage;
  }

  log(error) {
    this.send({ text: error.message, variant: 'warning' });
    console.log(error.toJSON());
  }
}

export default ErrorHandler;