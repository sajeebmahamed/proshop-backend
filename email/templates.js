const getWelcomeMailTemplate = (user) => {
   return `
        <p>Hello ${user.name}, Welcome to The Network</p>
    `;
};

module.exports = {
   getWelcomeMailTemplate,
};
