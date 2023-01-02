const getAvatarURL = (user, size = 256) => user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith('a_') ? 'gif' : 'png'}?size=${size}` : `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator) % 5}.png?size=${size}`;

export default getAvatarURL;