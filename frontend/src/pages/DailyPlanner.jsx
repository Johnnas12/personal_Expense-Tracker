// DailyPlanner.jsx
import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import axios from 'axios';
import '../customCss/DailyPlanner.css';
import EventModal from '../components/Modal';


const DailyPlanner = () => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/events/myEvents', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    // handling saving the data to the database
    const handleSave = async (newEvent) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/events/addEvents', newEvent, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEvents([...events, response.data]);
        } catch (error) {
            console.error('Error adding event:', error);
            console.log(newEvent);
        }
    };

    // Handle adding new events
    const handleDateClick = async (info) => {
        setSelectedDate(info.dateStr);
        setIsModalOpen(true);
    };

    // Handle marking events as done
    const handleEventClick = async (clickInfo) => {
        console.log(clickInfo)
        try {
            const eventId = clickInfo.event.extendedProps._id;
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/events/${eventId}/mark-done`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Update the event list with the modified event
            setEvents(events.map(event => 
                event._id === eventId ? { ...event, completed: response.data.completed } : event
            ));
        } catch (error) {
            console.error('Error marking event as done:', error);
        }
    };

    return (
        <div className="planner-container">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                }}
                events={events.map(event => ({
                    ...event,
                    classNames: event.completed ? 'event-completed' : '', 

                    
                    backgroundColor: event.backgroundColor,
                    borderColor: event.backgroundColor,
                }))}
                dateClick={handleDateClick}
                eventClick={handleEventClick} 
                editable={true}
                selectable={true}
                displayEventTime={false}
            />
             <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                selectedDate={selectedDate}
            />
        </div>
    );
};

export default DailyPlanner;