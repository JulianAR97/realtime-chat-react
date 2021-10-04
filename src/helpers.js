export const avatarSrc = (username) => {
  let slug = username.split(' ').slice(0, 2).map(x => x[0]).join('')
  return `https://avatars.dicebear.com/api/initials/${slug}.svg`
}

export const timestampToString = (timestamp) => {
  return timestamp.toDate().toLocaleString()
}