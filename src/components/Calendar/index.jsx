import React , { useState, useRef } from "react";
import { format, isValid, parse } from 'date-fns';
import FocusTrap from 'focus-trap-react';
import { DayPicker } from 'react-day-picker';
import { usePopper } from 'react-popper';
import 'react-day-picker/dist/style.css';
import './index.css'
import { Controller } from 'react-hook-form';
import CalendarIcon from "@mui/icons-material/CalendarToday";

const Calendar = ({control, name, label, type, placeholder, errors, register, handleSelect, dateValue}) => {
  const [selected, setSelected] = useState();
  const [inputValue, setInputValue] = useState("");
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const initialDays = [];
  const [days, setDays] = useState(initialDays);

  const popperRef = useRef(null);
  const buttonRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);

  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start"
  })

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  }

  const handleInputChange = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, "y-MM-dd", new Date());
    if (isValid(date)) {
      setSelected(date);
    } else {
      setSelected(undefined);
    }
  }

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  }

  const handleDaySelect = date => {
    setSelected(date)
    if (date) {
      setInputValue(format(date, "y-MM-dd"));
      handleSelect(date);
    } else {
      setInputValue("");
    }
    closePopper();
  }


    const css = `

    .my-selected:not([disabled]) { 
        font-weight: bold;
        color: white;
        border: solid #AF1582;
        background-color: #AF1582;
        border-radius: 0px;
    }
    .my-selected:hover:not([disabled]) { 
        color: white;
        border-radius: 0px;
    }

    .my-today { 
        font-weight: bold;
        font-size: 140%; 
        color: #AF1582;
    }
    `;

    if (type === 'calendar-input') {
    return (
      <div>
      <label>{label}</label>
      <div ref={popperRef} className="flex my-4 w-full focus:outline-none focus:ring-0 focus:border-primaryMain focus:shadow-md focus:shadow-primaryMain/15 py-4 px-4 border-solid border-2 rounded mt-2">
        <input
          type="text"
          placeholder={format(new Date(), "y-MM-dd")}
          value={inputValue}
          onChange={handleInputChange}
          className="w-full"
        />
        <button
          ref={buttonRef}
          type="button"
          aria-label="Pick a date"
          onClick={handleButtonClick}
        >
          <span role="img" aria-label="calendar icon">
            <CalendarIcon />
          </span>
        </button>
      </div>
      {isPopperOpen && (
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            fallbackFocus: buttonRef.current
          }}
        >
          <div
            tabIndex={-1}
            style={popper.styles.popper}
            className="dialog-sheet w-[574px]"
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
            aria-label="DayPicker calendar"
          >
          <div className="border border-primaryMain flex justify-center mt-2 bg-white">
          <style>{css}</style>
            <DayPicker
              showOutsideDays
              initialFocus={isPopperOpen}
              mode="single"
              defaultMonth={selected}
              selected={selected}
              onSelect={handleDaySelect}
              modifiersClassNames={{
                selected: 'my-selected',
                today: 'my-today'
              }}
              styles={{
                    head: { color: '#AF1582' },
              }}
            /> 
          </div>
          </div>
        </FocusTrap>
      )}
    </div>
    )
  }

  else if (type === 'calendar-view') {
    return(
      <div className="relative mb-5 flex flex-col ">
          <label>{label}</label>
          <div className="border border-primaryMain flex justify-center mt-2">
          <style>{css}</style>
          <Controller
          name={name}
          control={control}
          defaultValue={dateValue}
          render={({ field }) => (
            <DayPicker
              showOutsideDays
              initialFocus={isPopperOpen}
              mode="multiple"
              selected={dateValue}
              modifiersClassNames={{
                selected: 'my-selected',
                today: 'my-today'
              }}
              styles={{
                head: { color: '#AF1582' },
              }}
            />
          )}
        />
          </div>
        </div>
    )
  }

  return (
    <div className="relative mb-5 flex flex-col ">
          <label>{label}</label>
          <div className="border border-primaryMain flex justify-center mt-2">
          <style>{css}</style>
          <Controller
          name={name}
          control={control}
          defaultValue={initialDays}
          render={({ field }) => (
            <DayPicker
              showOutsideDays
              initialFocus={isPopperOpen}
              mode="multiple"
              min={1}
              selected={field.value}
              onSelect={(selectedDays) => {
                field.onChange(selectedDays);
                setDays(selectedDays);
              }}
              modifiersClassNames={{
                selected: 'my-selected',
                today: 'my-today'
              }}
              styles={{
                head: { color: '#AF1582' },
              }}
            />
          )}
        />
          </div>
        </div>
  );
};

export default Calendar;