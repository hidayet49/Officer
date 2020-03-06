import React, { useEffect } from "react";
import { View, Text, Button, Platform } from "react-native";
import * as Calendar from "expo-calendar";
var moment = require("moment");

export default function calendar(expiryDate) {
  setEvents(expiryDate);

  async function getDefaultCalendarSourceId() {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(
      each => each.source.name === "Default"
    );
    return defaultCalendars[0].id;
  }

  async function getCalendarId() {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(
      each => each.allowsModifications === true && each.accessLevel == "owner"
    );

    const defaultCalendarId =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : defaultCalendars[0].id;

    return defaultCalendarId;
  }

  async function setEvents(expiryDate) {
    const dates = expiryDateToDate(expiryDate);
    const calendarId = await getCalendarId();
    console.log("calendar:"+expiryDate);
    try {
      const events = await Calendar.createEventAsync(calendarId.toString(), {
        title: "Passport Extend",
        startDate: dates.sDate,
        endDate: dates.eDate,
        alarms: [
          {
            relativeOffset: 960,
            method: Calendar.AlarmMethod.DEFAULT
          }
        ]
      });

      
    } catch (error) {
      console.log(error);
    }
  }

  function expiryDateToDate(expiryDate) {
    const year = expiryDate.substring(0, 2);
    const month = expiryDate.substring(2, 4);
    const day = expiryDate.substring(4);
    const expiry = moment(`20${year}-${month}-${day}`);
    const sDate = expiry.subtract(3, "months").toDate();
    const eDate = expiry.add(4, "d").toDate();
    return {
      sDate: sDate,
      eDate: eDate
    };
  }
}
