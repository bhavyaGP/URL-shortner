const sessionIdTouserMap = new Map();

function setUser(sessionId, user) {
    sessionIdTouserMap.set(sessionId, user);
}

function getUser(sessionId) {
    return sessionIdTouserMap.get(sessionId);
}

module.exports = {
    setUser,
    getUser
}
