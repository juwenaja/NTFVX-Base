// FUNCTION-REMINDER
const fs = require("fs")
const toMs = require('ms')
const reminder = JSON.parse(fs.readFileSync('./database/reminder.json'))

const addReminder = (userId, message, time) => {
  const obj = { id: userId, msg: message, time: Date.now() + toMs(time) }
  reminder.push(obj)
  fs.writeFileSync('./database/reminder.json', JSON.stringify(reminder))
}

const getReminderTime = (userId) => {
  let position = false
  Object.keys(reminder).forEach((i) => {
      if(reminder[i].id === userId) {
          position = i
      }
  })
  if (position !== false) {
      return reminder[position].time
  }
}

const getReminderMsg = (userId) => {
  let position = false
  Object.keys(reminder).forEach((i) => {
      if (reminder[i].id === userId) {
          position = i
      }
  })
  if (position !== false) {
      return reminder[position].msg
  }
}

const getReminderPosition = (userId) => {
  let position = false
  Object.keys(reminder).forEach((i) => {
      if (reminder[i].id === userId) {
          position = i
      }
  })
  return position
}

module.exports = {
  addReminder,
  getReminderTime,
  getReminderMsg,
  getReminderPosition
}