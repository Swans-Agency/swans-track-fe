import CalendarIcon from '@/components/Navbar/Icons/CalendarIcon';
import { Select } from 'antd';
import dayjs from 'dayjs';
import React from 'react';


export default function EventModal({ selectedEvent, handleDeleteEvent, setIsModalOpenNew, setSelectedEvent }) {

    const addToGoogleCalendar = () => {
        const title = encodeURIComponent(selectedEvent?.title)
        const description = encodeURIComponent(selectedEvent?.discription)
        const location = encodeURIComponent(selectedEvent?.location)
        const startTime = dayjs(selectedEvent?.start).format('YYYYMMDDTHHmmss[Z]')
        const endTime = dayjs(selectedEvent?.end).format('YYYYMMDDTHHmmss[Z]')
        let url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${description}&location=${location}&sf=true&output=xml`
        window.open(url, '_blank')
    }

    const addToOutlookCalendar = () => {
        const title = encodeURIComponent(selectedEvent?.title)
        const description = encodeURIComponent(selectedEvent?.discription)
        const location = encodeURIComponent(selectedEvent?.location)
        let url = `https://outlook.live.com/owa/?path=/calendar/action/compose&rru=addevent&startdt=${selectedEvent?.start}&enddt=${selectedEvent?.end}&subject=${title}&body=${description}&location=${location}`
        window.open(url, '_blank')
    }

    const addToYahooCalendar = () => {
        const title = encodeURIComponent(selectedEvent?.title)
        const description = encodeURIComponent(selectedEvent?.discription)
        const location = encodeURIComponent(selectedEvent?.location)
        const startTime = dayjs(selectedEvent?.start).format('YYYYMMDDTHHmmss[Z]')
        const endTime = dayjs(selectedEvent?.end).format('YYYYMMDDTHHmmss[Z]')
        let url = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${title}&st=${startTime}&et=${endTime}&desc=${description}&in_loc=${location}`
        window.open(url, '_blank')
    }

    const addToAppleCalendar = () => {
        const title = selectedEvent?.title;
        const description = selectedEvent?.description;
        const location = selectedEvent?.location;
        const startTime = dayjs(selectedEvent?.start).format('YYYYMMDDTHHmmss[Z]')
        const endTime = dayjs(selectedEvent?.end).format('YYYYMMDDTHHmmss[Z]')

        const url = `data:text/calendar;charset=utf-8,BEGIN:VCALENDAR
                    VERSION:2.0
                    BEGIN:VEVENT
                    SUMMARY:${title}
                    DESCRIPTION:${description}
                    LOCATION:${location}
                    DTSTART:${startTime}
                    DTEND:${endTime}
                    END:VEVENT
                    END:VCALENDAR`;

        const blob = new Blob([url], { type: 'text/calendar' });
        const data = URL.createObjectURL(blob);

        window.open(data, '_blank');
    };

    const addToCalendar = (value) => {
        switch (value) {
            case 'google':
                addToGoogleCalendar()
                break;
            case 'outlook':
                addToOutlookCalendar()
                break;
            case 'yahoo':
                addToYahooCalendar()
                break;
            case 'apple':
                addToAppleCalendar()
                break;
            default:
                break;
        }
    }


    return (
        <div>
            <div className='flex gap-2 justify-start'>
                <span className="font-semibold">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </span>
                {dayjs(selectedEvent?.start)?.format('dddd, MMMM D - HH:mm')} - {dayjs(selectedEvent?.end)?.format('dddd, MMMM D - HH:mm')}
            </div>
            {selectedEvent?.location && <div className='flex gap-2 justify-start'>
                <span className="">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>

                </span>
                {(selectedEvent?.location)}
            </div>}

            <Select
                mode='single'
                className="w-full my-2 text-center text-white"
                size='large'
                allowClear
                placeholder={<div className='flex justify-center items-center gap-x-3 text-white'><CalendarIcon />Add to calendar</div>}
                onChange={(e) => addToCalendar(e)}
            >
                <Select.Option value={"google"} >
                    <div className="flex justify-center items-center gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                            <rect width="22" height="22" x="13" y="13" fill="#fff"></rect><polygon fill="#1e88e5" points="25.68,20.92 26.688,22.36 28.272,21.208 28.272,29.56 30,29.56 30,18.616 28.56,18.616"></polygon><path fill="#1e88e5" d="M22.943,23.745c0.625-0.574,1.013-1.37,1.013-2.249c0-1.747-1.533-3.168-3.417-3.168 c-1.602,0-2.972,1.009-3.33,2.453l1.657,0.421c0.165-0.664,0.868-1.146,1.673-1.146c0.942,0,1.709,0.646,1.709,1.44 c0,0.794-0.767,1.44-1.709,1.44h-0.997v1.728h0.997c1.081,0,1.993,0.751,1.993,1.64c0,0.904-0.866,1.64-1.931,1.64 c-0.962,0-1.784-0.61-1.914-1.418L17,26.802c0.262,1.636,1.81,2.87,3.6,2.87c2.007,0,3.64-1.511,3.64-3.368 C24.24,25.281,23.736,24.363,22.943,23.745z"></path><polygon fill="#fbc02d" points="34,42 14,42 13,38 14,34 34,34 35,38"></polygon><polygon fill="#4caf50" points="38,35 42,34 42,14 38,13 34,14 34,34"></polygon><path fill="#1e88e5" d="M34,14l1-4l-1-4H9C7.343,6,6,7.343,6,9v25l4,1l4-1V14H34z"></path><polygon fill="#e53935" points="34,34 34,42 42,34"></polygon><path fill="#1565c0" d="M39,6h-5v8h8V9C42,7.343,40.657,6,39,6z"></path><path fill="#1565c0" d="M9,42h5v-8H6v5C6,40.657,7.343,42,9,42z"></path>
                        </svg>
                    <p>Google</p>
                    </div>
                </Select.Option>
                <Select.Option value="outlook">
                    <div className="flex justify-center items-center gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                            <path fill="#1976d2" d="M28,13h14.533C43.343,13,44,13.657,44,14.467v19.066C44,34.343,43.343,35,42.533,35H28V13z"></path><rect width="14" height="15.542" x="28" y="17.958" fill="#fff"></rect><polygon fill="#1976d2" points="27,44 4,39.5 4,8.5 27,4"></polygon><path fill="#fff" d="M15.25,16.5c-3.176,0-5.75,3.358-5.75,7.5s2.574,7.5,5.75,7.5S21,28.142,21,24	S18.426,16.5,15.25,16.5z M15,28.5c-1.657,0-3-2.015-3-4.5s1.343-4.5,3-4.5s3,2.015,3,4.5S16.657,28.5,15,28.5z"></path><rect width="2.7" height="2.9" x="28.047" y="29.737" fill="#1976d2"></rect><rect width="2.7" height="2.9" x="31.448" y="29.737" fill="#1976d2"></rect><rect width="2.7" height="2.9" x="34.849" y="29.737" fill="#1976d2"></rect><rect width="2.7" height="2.9" x="28.047" y="26.159" fill="#1976d2"></rect><rect width="2.7" height="2.9" x="31.448" y="26.159" fill="#1976d2"></rect><rect width="2.7" height="2.9" x="34.849" y="26.159" fill="#1976d2"></rect><rect width="2.7" height="2.9" x="38.25" y="26.159" fill="#1976d2"></rect><rect width="2.7" height="2.9" x="28.047" y="22.706" fill="#1976d2"></rect><rect width="2.7" height="2.9" x="31.448" y="22.706" fill="#1976d2"></rect><rect width="2.7" height="2.9" x="34.849" y="22.706" fill="#1976d2"></rect><rect width="2.7" height="2.9" x="38.25" y="22.706" fill="#1976d2"></rect><rect width="2.7" height="2.9" x="31.448" y="19.112" fill="#1976d2"></rect><rect width="2.7" height="2.9" x="34.849" y="19.112" fill="#1976d2"></rect><rect width="2.7" height="2.9" x="38.25" y="19.112" fill="#1976d2"></rect>
                        </svg>
                        <p>Outlook</p>
                    </div>
                    </Select.Option>
                <Select.Option value="yahoo">
                    <div className="flex justify-center items-center gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48">
                            <path fill="#8a4581" d="M12.429,14.27c1.241,4.365,2.371,8.037,4.174,12.201c1.445-3.853,3.646-8.113,4.495-12.683 c2.89,0.161,5.94-0.161,8.669,0.161c-5.311,9.534-8.323,19.467-12.522,29.54c-2.64-0.352-5.845-0.339-8.509-0.321 c1.551-2.069,3.987-6.873,4.014-7.224c0.038-0.511-5.998-12.415-7.78-17.621c-0.489-1.43-1.049-2.768-1.049-4.534 C6.971,13.307,9.54,13.468,12.429,14.27z"></path><path fill="#8a4581" d="M27.14,29.313c-1.231,1.123-1.858,2.935-1.39,4.534c0.138,0.472,0.365,0.917,0.665,1.307 c0.184,0.239,0.395,0.456,0.623,0.653c1.42,1.229,3.55,1.593,5.276,0.854c1.726-0.739,2.942-2.568,2.902-4.445 C35.123,27.872,30.026,26.681,27.14,29.313z"></path><path fill="#8a4581" d="M37.033,25.659c2.603-6.48,5.318-12.916,8.144-19.302c-1.796-0.297-3.642-0.291-5.436,0.018 c-0.709,0.122-1.503,0.275-2.095-0.133c-0.849,0.029-1.397,0.887-1.765,1.653c-2.052,4.271-3.371,8.858-5.04,13.283 c-0.468,1.241-1.481,3.314-0.156,4.392C31.277,26.052,36.814,26.204,37.033,25.659z"></path><path fill="#1d1d1b" d="M17.56,44.036l-0.38-0.051c-2.67-0.356-6.006-0.336-8.439-0.317l-1.008,0.007l0.605-0.807 c1.448-1.932,3.618-6.196,3.897-6.939c-0.166-0.491-1.093-2.46-2.071-4.539c-1.93-4.1-4.574-9.715-5.667-12.906L4.31,17.948 c-0.438-1.245-0.89-2.532-0.89-4.16v-0.427l0.422-0.066c3.103-0.491,5.711-0.342,8.721,0.494l0.271,0.075l0.077,0.27 c1.209,4.25,2.23,7.514,3.673,11.008c0.291-0.728,0.601-1.467,0.922-2.235c1.23-2.943,2.503-5.987,3.102-9.209l0.081-0.432 l0.439,0.024c1.222,0.067,2.5,0.048,3.736,0.028c1.659-0.025,3.374-0.053,4.964,0.135l0.742,0.087l-0.363,0.652 c-3.613,6.486-6.109,13.032-8.752,19.963c-1.187,3.113-2.414,6.332-3.746,9.526L17.56,44.036z M10.493,42.66 c2.044,0,4.392,0.043,6.437,0.286c1.27-3.065,2.448-6.155,3.588-9.146c2.566-6.729,4.994-13.097,8.444-19.425 c-1.3-0.1-2.66-0.079-4.085-0.056c-1.109,0.018-2.252,0.034-3.371-0.009c-0.646,3.165-1.882,6.121-3.079,8.983 c-0.488,1.168-0.95,2.271-1.356,3.355l-0.435,1.16l-0.492-1.137c-1.694-3.913-2.803-7.382-4.119-11.991 c-2.61-0.693-4.92-0.833-7.594-0.461c0.07,1.259,0.436,2.302,0.821,3.399l0.189,0.543c1.074,3.139,3.705,8.725,5.625,12.804 c2.042,4.338,2.202,4.735,2.181,5.016c-0.039,0.515-2.073,4.431-3.552,6.682C9.957,42.661,10.222,42.66,10.493,42.66z"></path><path fill="#1d1d1b" d="M30.408,37.542c-1.331,0-2.672-0.47-3.697-1.358c-0.264-0.228-0.497-0.472-0.692-0.727 c-0.339-0.439-0.591-0.935-0.749-1.47c-0.504-1.722,0.112-3.749,1.533-5.044c1.646-1.502,4.085-1.938,6.072-1.087 c1.762,0.755,2.797,2.341,2.841,4.349c0.044,2.067-1.273,4.089-3.205,4.915C31.848,37.404,31.129,37.542,30.408,37.542z M30.733,28.423c-1.171,0-2.355,0.438-3.256,1.259l0,0c-1.145,1.043-1.646,2.661-1.247,4.023c0.121,0.41,0.322,0.805,0.582,1.142 c0.155,0.202,0.341,0.397,0.554,0.581c1.297,1.124,3.206,1.433,4.752,0.772c1.566-0.67,2.635-2.305,2.599-3.975 c-0.034-1.599-0.849-2.857-2.235-3.452C31.929,28.538,31.333,28.423,30.733,28.423z"></path><path fill="#1d1d1b" d="M34.458,26.5c-1.689,0-3.635-0.174-4.087-0.542c-1.477-1.201-0.677-3.227-0.148-4.568l0.151-0.388 c0.542-1.436,1.046-2.889,1.551-4.342c1.037-2.986,2.109-6.074,3.506-8.981c0.39-0.812,1.043-1.897,2.198-1.937l0.165-0.006 l0.136,0.093c0.407,0.281,1.047,0.17,1.666,0.063c1.919-0.332,3.804-0.339,5.664-0.03l0.637,0.105l-0.261,0.59 c-2.812,6.356-5.55,12.845-8.137,19.286l0,0c-0.122,0.302-0.442,0.417-0.673,0.476C36.368,26.439,35.458,26.5,34.458,26.5z M37.533,6.759c-0.413,0.089-0.807,0.534-1.201,1.354c-1.372,2.855-2.435,5.916-3.463,8.875c-0.507,1.462-1.015,2.923-1.56,4.367 l-0.157,0.403c-0.559,1.416-0.991,2.743-0.151,3.425c0.585,0.332,4.794,0.448,5.619,0.162c2.494-6.207,5.128-12.456,7.833-18.587 c-1.542-0.191-3.094-0.154-4.627,0.111C39.084,6.997,38.243,7.142,37.533,6.759z"></path>
                        </svg>
                        <p>Yahoo</p>
                    </div>
                </Select.Option>
                <Select.Option value="apple">
                    <div className="flex justify-center items-center gap-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                            <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
                        </svg>
                        <p>Apple</p>
                    </div>

                </Select.Option>
            </Select>

            {selectedEvent?.discription &&
                <div className='flex gap-2 justify-start'>
                    <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>

                    </span>
                    <div
                        // className="border rounded-lg p-2 hover:cursor-pointer hover:border-blue-400"
                        dangerouslySetInnerHTML={{ __html: selectedEvent?.discription }}
                    />
                </div>
            }


            <div className="flex gap-x-2 justify-end  mt-3">
                <button className="bg-red-600 text-white px-4 py-2 hover:shadow-lg rounded" onClick={() => handleDeleteEvent(selectedEvent?.id)}>Delete</button>
                <button className="bg-blue-900 dark:bg-[#282828] text-white px-4 py-2 hover:shadow-lg rounded" onClick={() => setIsModalOpenNew(true)}>Edit</button>
            </div>
        </div>
    );
};