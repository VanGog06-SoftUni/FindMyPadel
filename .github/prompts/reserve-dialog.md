Now that I have the timeslots component, we can proceed with the next functionality. It will be a dialog component, that will show when user clicks on a specific time slot or when user is done dragging (selecting) time slots.
Dialog title should be "Reservation" and it should have a close button on the right side
Dialog body should have the following information:

- Name -> it should have the text of "Padel court #1"
- Date -> the selected date from the timeslots component
- Start Time -> the time in first selected slot
- End Time ->the time in the last selected slot
- Duration -> end time - start time, display it in minutes
- Payment -> dropdown with just one option for now -> On site
- Amount -> Should be automatically calculated based on the duration -> 10 euro per 30 minutes
  The dialog footer should have just one button to the right and it should be called "Reserve". No click action needed for now.
  The dialog should close if user clicks on the close button in the header or anywhere out of the dialog
