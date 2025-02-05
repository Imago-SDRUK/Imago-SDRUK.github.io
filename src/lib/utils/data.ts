import { DateTime } from 'luxon'

export const dateExpired = (date: DateTime<true> | DateTime<false>) =>
	DateTime.now().diff(date).milliseconds - 86400000 > 0

export const dateAvailable = (date: DateTime<true> | DateTime<false>) =>
	DateTime.now().diff(date).milliseconds - 86400000 < 0
