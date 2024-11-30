import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateEvent from "./createEvent";
import { API_URL } from "../../../axios"; // Update the path if necessary

const EventList = ({ facultyID }) => {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState("list"); // Default view is list
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [year, setYear] = useState("");
    const [section, setSection] = useState("");

    // Fetch year and section for the coordinator
    useEffect(() => {
        axios
            .get(`${API_URL}/api/yearandsectionofcoordinator?facultyID=${facultyID}`)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    const { AssignedYear, AssignedSection } = response.data[0]; // Access first element
                    setYear(AssignedYear);
                    setSection(AssignedSection);
                } else {
                    console.error("No data returned for year and section");
                }
            })
            .catch((error) => console.error("Error fetching year and section:", error));
    }, [facultyID]);

    // Fetch events from the API on component mount
    useEffect(() => {
        axios
            .get(`${API_URL}/api/showeventsofcoordinator?facultyID=${facultyID}`) // Replace with your actual API endpoint
            .then((response) => {
                setEvents(response.data); // Populate events from the API response
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    }, [facultyID]);

    // Handle switching to the create event form
    const handleCreateEvent = () => {
        setView("create"); // Switch to create event view
    };

    // Handle selecting an event
    const handleSelectEvent = (eventId) => {
        const event = events.find((e) => e.EventID === eventId);
        setSelectedEvent(event);
    };

    return (
        <div>
            <h2>Events</h2>
            {view === "list" && (
                <>
                    <button onClick={handleCreateEvent}>+ Create Event</button>

                    {/* Dropdown for selecting an event */}
                    <div>
                        <label>Select Event:</label>
                        <select
                            value={selectedEvent ? selectedEvent.EventID : ""}
                            onChange={(e) => handleSelectEvent(parseInt(e.target.value))}
                        >
                            <option value="" disabled>
                                Select an event
                            </option>
                            {events.map((event) => (
                                <option key={event.EventID} value={event.EventID}>
                                    {`${event.EventName} - Section: ${event.Section}, Year: ${event.YearOfStudy} Date:${new Date(event.EventDate).toLocaleDateString()}`}
                                </option>
                            ))}
                        </select>

                    </div>

                    {/* Show details for selected event */}
                    {selectedEvent && (
                        <div style={{ marginTop: "20px" }}>
                            <h3>Event Details</h3>
                            <p><strong>Event Name:</strong> {selectedEvent.EventName}</p>
                            <p><strong>Section:</strong> {selectedEvent.Section}</p>
                            <p><strong>Year of Study:</strong> {selectedEvent.YearOfStudy}</p>
                            <p><strong>Date:</strong> {new Date(selectedEvent.EventDate).toLocaleDateString()}</p>
                        </div>
                    )}
                </>
            )}

            {view === "create" && (
                <CreateEvent
                    facultyID={facultyID}
                    setView={setView}
                    setEvents={setEvents}
                    year={year}
                    section={section}
                />
            )}
        </div>
    );
};

export default EventList;
