export const avatarSrc = (username) => {
  let slug = username.split(' ').slice(0, 2).map(x => x[0]).join('')
  return `https://avatars.dicebear.com/api/initials/${slug}.svg`
}

// Firebase timestamp to locale string
export const timestampToString = (timestamp) => {
  if (timestamp)
    return timestamp.toDate()?.toLocaleString()
}

/**
 * 
 * @param {object} timestamp (Firebase Timestamp)
 */
export const getLastSeen = (timestamp) => {
  const tsStr = timestampToString(timestamp)
  const dates = [new Date(tsStr), new Date()]
  const diff = dates[1] - dates[0]
  let lastSeenStr = 'Last Seen '
  
  let seconds;
  let minutes;
  let hours;
  let days;
  let months;
  let years;
  
  if (diff) {
    seconds = diff / 1000
    if (seconds > 60) minutes = seconds / 60
    if (minutes > 60) hours = minutes / 60
    if (hours > 24) days = hours / 24
    if (days > 30) months = days / 30
    if (months > 12) years = months / 12
  
    if (years) lastSeenStr += `${Math.floor(years)} year${years > 1 ? 's' : ''} ago`
    else if (months) lastSeenStr += `${Math.floor(months)} month${months > 1 ? 's' : ''} ago`
    else if (days) lastSeenStr += `${Math.floor(days)} day${days > 1 ? 's' : ''} ago`
    else if (hours) lastSeenStr += `${Math.floor(hours)} hour${hours > 1 ? 's' : ''} ago`
    else if (minutes) lastSeenStr += `${Math.floor(minutes)} minute${minutes > 1 ? 's' : ''} ago`
    else lastSeenStr += `${Math.floor(seconds)} second${seconds > 1 ? 's' : ''} ago`
  } 

  return lastSeenStr
}

export const sortChronological = (groupA, groupB) => {
  const lastMessageA = groupA.messages[groupA.messages.length - 1]
  const lastMessageB = groupB.messages[groupB.messages.length - 1]

  return lastMessageA.timestamp.toDate() > lastMessageB.timestamp.toDate() ? -1 : 1
}