import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import updateLocale from 'dayjs/plugin/updateLocale'

// Extend dayjs with plugins
dayjs.extend(relativeTime)
dayjs.extend(updateLocale)

// Customize the time thresholds for a more modern feel
dayjs.updateLocale('en', {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: 'a few seconds',
    m: "a minute",
    mm: "%d minutes",
    h: "an hour",
    hh: "%d hours",
    d: "a day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years"
  }
})

export const useTimeAgo = (date: string | Date): string => {
  if (!date) return '';
  return dayjs(date).fromNow()
}