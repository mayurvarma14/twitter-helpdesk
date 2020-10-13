export const removeMention = (text) => text.replace(/\B@[a-z0-9_-]+/gi, '');
