import moment from 'moment';
import React from 'react';


export default function EventModalContent({ selectedItem, handleCancel, handleDeleteEvent, copyText }) {
  return (
      <div className='flex flex-col'>
          <h1 className='text-lg font-medium'>{selectedItem?.summary}</h1>
          <p className='text-md font-light'>
              {moment(selectedItem?.start?.dateTime).format("dddd")} {moment(selectedItem?.start?.dateTime).format('MMMM Do, YYYY')}
          </p>
          <p className='text-md font-light'>
              {moment(selectedItem?.start?.dateTime).format("HH:mm")} - {moment(selectedItem?.end?.dateTime).format('HH:mm')}
          </p>
          {selectedItem?.hangoutLink &&
              <div className='text-md font-light flex items-center gap-x-1 py-2'>
                  <img src={selectedItem?.conferenceData?.conferenceSolution?.iconUri} className='w-5 h-5 inline-block mr-2' title="google meet icon" />
                  <a
                      href={selectedItem?.hangoutLink}
                      target='_blank'
                      className='bg-mainBackground  hover:bg-foreignBackground text-white hover:text-white rounded py-[0.4rem] px-3'
                  >
                      Join with Google Meet
                  </a>
                  <a
                      id="meetingLink"
                      className='bg-mainBackground  hover:bg-foreignBackground text-white hover:text-white rounded py-[0.4rem] px-3'
                      onClick={() => copyText(selectedItem?.hangoutLink)}
                  >
                      Copy link
                  </a>
              </div>
          }
          <div className='mt-2 w-full flex justify-end gap-x-2'>
              <button
                  className={`flex gap-x-2 bg-mainBackground  hover:bg-foreignBackground text-white rounded py-[0.4rem] px-3`}
                  onClick={handleCancel}
              >
                  Cancel
              </button>
              <button
                  className={`flex gap-x-2 bg-red-500  hover:bg-red-400 text-white rounded py-[0.4rem] px-3`}
                  onClick={() => handleDeleteEvent(selectedItem?.id)}
              >
                  Delete
              </button>
          </div>
      </div>
  );
};