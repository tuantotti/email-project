const showMessage = (state = {}, action) => {
  switch (action.type) {
    case "sendMailData":
      const message = {
        id: action.id,
        company_Name: action.company,
        description: action.description,
        time: action.time,
        subject: action.subject,
        email_address: action.email_address,
        isRead: action.isRead || true
      };
      state = message;
      return state;
    default:
      return state;
  }
};

export default showMessage;
